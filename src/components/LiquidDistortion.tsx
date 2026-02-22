"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Inline Shaders ──────────────────────────────────────────────────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;      // smoothed mouse position (0‥1)
  uniform vec2  uResolution;
  uniform float uIntensity;  // overall strength multiplier

  varying vec2 vUv;

  // ── helpers ───────────────────────────────────────────────────────────
  // Simple 2D hash → pseudo‑random
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;

    // Aspect‑corrected coordinates for distance calc
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);
    vec2 mouseAspect = vec2(uMouse.x * aspect, uMouse.y);

    float dist = distance(uvAspect, mouseAspect);

    // Soft circular falloff — radius ~0.35
    float influence = smoothstep(0.35, 0.0, dist);

    // Displacement direction: push pixels away from cursor
    vec2 dir = normalize(uvAspect - mouseAspect + 0.0001);

    // Noise‑based organic wobble
    float n1 = noise(uv * 6.0 + uTime * 0.4);
    float n2 = noise(uv * 8.0 - uTime * 0.3);

    // Combine displacement
    vec2 displacement = dir * influence * uIntensity * 0.06;
    displacement += vec2(n1, n2) * influence * uIntensity * 0.012;

    vec2 distortedUv = uv + displacement;

    // ── Render the dark‑tech grid pattern directly in the shader ────
    // Base colour
    vec3 baseColor = vec3(0.02, 0.02, 0.02); // #050505

    // Grid lines
    vec2 gridUv = fract(distortedUv * vec2(aspect, 1.0) * 8.0);
    float lineX = smoothstep(0.0, 0.02, gridUv.x) * smoothstep(1.0, 0.98, gridUv.x);
    float lineY = smoothstep(0.0, 0.02, gridUv.y) * smoothstep(1.0, 0.98, gridUv.y);
    float gridMask = 1.0 - min(lineX, lineY);
    gridMask *= 0.09; // match existing grid opacity

    vec3 gridColor = baseColor + vec3(gridMask * 0.5);

    // Subtle radial vignette
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5));
    gridColor *= 0.9 + 0.1 * vignette;

    // Faint warm glow near cursor
    float cursorGlow = influence * uIntensity * 0.08;
    gridColor += vec3(0.18, 0.80, 0.77) * cursorGlow * 0.35; // accent‑tinted

    gl_FragColor = vec4(gridColor, 1.0);
  }
`;

// ── Component ──────────────────────────────────────────────────────────────

export default function LiquidDistortion() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ── Three.js setup ──────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.Camera(); // identity – we use clip‑space geometry

        const uniforms = {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
            uIntensity: { value: 0 },  // starts at 0, lerps toward 1 on move
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
        scene.add(new THREE.Mesh(geometry, material));

        // ── Mouse tracking ──────────────────────────────────────────────
        const rawMouse = { x: 0.5, y: 0.5 };
        const smoothMouse = { x: 0.5, y: 0.5 };
        let targetIntensity = 0;
        let mouseTimeout: ReturnType<typeof setTimeout> | null = null;

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            rawMouse.x = (e.clientX - rect.left) / rect.width;
            rawMouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // flip Y for GL
            targetIntensity = 1;

            // Fade out after mouse stops
            if (mouseTimeout) clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => { targetIntensity = 0; }, 800);
        };

        container.addEventListener("mousemove", onMouseMove);

        // ── Resize ──────────────────────────────────────────────────────
        const onResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            uniforms.uResolution.value.set(w, h);
        };

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        // ── Render loop ─────────────────────────────────────────────────
        const clock = new THREE.Clock();
        let rafId: number;

        const tick = () => {
            rafId = requestAnimationFrame(tick);

            const dt = clock.getDelta();
            uniforms.uTime.value += dt;

            // Lerp mouse
            const lerpFactor = 1 - Math.pow(0.05, dt); // ≈ 0.05 per frame at 60 fps
            smoothMouse.x += (rawMouse.x - smoothMouse.x) * lerpFactor;
            smoothMouse.y += (rawMouse.y - smoothMouse.y) * lerpFactor;
            uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);

            // Lerp intensity
            uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * lerpFactor;

            renderer.render(scene, camera);
        };

        tick();

        // ── Cleanup ─────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId);
            container.removeEventListener("mousemove", onMouseMove);
            resizeObserver.disconnect();
            if (mouseTimeout) clearTimeout(mouseTimeout);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (renderer.domElement.parentElement) {
                renderer.domElement.parentElement.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-[1] pointer-events-auto"
            style={{ isolation: "isolate" }}
        />
    );
}
