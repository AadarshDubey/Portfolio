"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFramePath } from "@/lib/utils";
import { heroConfig } from "@/content/content";

interface UseFrameSequenceReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    loadedCount: number;
    totalCount: number;
    isReady: boolean;
    currentFrame: number;
    scrollProgress: number;
}

export function useFrameSequence(): UseFrameSequenceReturn {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const animFrameRef = useRef<number>(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const { frameCount, frameIndexPad } = heroConfig;
    const totalCount = frameCount;

    const drawFrame = useCallback(
        (frameIndex: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const img = imagesRef.current[frameIndex];
            if (!canvas || !ctx || !img || !img.complete) return;

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        },
        []
    );

    // Load images with priority strategy
    useEffect(() => {
        const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
        imagesRef.current = images;
        let loaded = 0;

        const loadImage = (index: number): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    images[index] = img;
                    loaded++;
                    setLoadedCount(loaded);
                    if (index === 0) {
                        drawFrame(0);
                    }
                    resolve();
                };
                img.onerror = () => {
                    resolve();
                };
                img.src = getFramePath(index + 1, frameIndexPad);
            });
        };

        // Strategy: Load frame 1 immediately, then next 20, then rest
        const loadSequentially = async () => {
            // Phase 1: First frame immediately
            await loadImage(0);

            // Phase 2: Next 20 frames
            const phase2: Promise<void>[] = [];
            for (let i = 1; i <= Math.min(20, frameCount - 1); i++) {
                phase2.push(loadImage(i));
            }
            await Promise.all(phase2);

            // Phase 3: Remaining frames in batches of 10
            for (let batch = 21; batch < frameCount; batch += 10) {
                const batchPromises: Promise<void>[] = [];
                for (let i = batch; i < Math.min(batch + 10, frameCount); i++) {
                    batchPromises.push(loadImage(i));
                }
                // Use requestIdleCallback if available, otherwise setTimeout
                await new Promise<void>((resolve) => {
                    if ("requestIdleCallback" in window) {
                        window.requestIdleCallback(async () => {
                            await Promise.all(batchPromises);
                            resolve();
                        });
                    } else {
                        setTimeout(async () => {
                            await Promise.all(batchPromises);
                            resolve();
                        }, 0);
                    }
                });
            }
        };

        loadSequentially();

        return () => {
            imagesRef.current = [];
        };
    }, [frameCount, frameIndexPad, drawFrame]);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const scrollHeight = container.scrollHeight - window.innerHeight;
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);

            setScrollProgress(progress);

            const frameIndex = Math.min(
                Math.floor(progress * (frameCount - 1)),
                frameCount - 1
            );

            if (frameIndex >= 0 && frameIndex !== currentFrame) {
                setCurrentFrame(frameIndex);
                animFrameRef.current = requestAnimationFrame(() => {
                    drawFrame(frameIndex);
                });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, [frameCount, currentFrame, drawFrame]);

    const isReady = loadedCount >= 1;

    return {
        canvasRef,
        containerRef,
        loadedCount,
        totalCount,
        isReady,
        currentFrame,
        scrollProgress,
    };
}
