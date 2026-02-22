"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) setIsVisible(true);

            // Detect if hovering over a clickable element
            const target = e.target as HTMLElement;
            const clickable =
                target.closest("a, button, [role='button'], input, textarea, select, label, [data-clickable]") ||
                window.getComputedStyle(target).cursor === "pointer";
            setIsPointer(!!clickable);
        },
        [cursorX, cursorY, isVisible]
    );

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Only enable on devices with fine pointer (not touch)
        const hasPointer = window.matchMedia("(pointer: fine)").matches;
        if (!hasPointer) return;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        // Add cursor-none class to body
        document.body.classList.add("custom-cursor-active");

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.body.classList.remove("custom-cursor-active");
        };
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

    // Don't render on touch devices
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
        return null;
    }

    return (
        <>
            {/* Inner Dot */}
            <motion.div
                className="custom-cursor-dot"
                style={{
                    left: cursorX,
                    top: cursorY,
                    opacity: isVisible ? 1 : 0,
                    scale: isPointer ? 0.5 : 1,
                }}
                transition={{ scale: { duration: 0.15 } }}
            />

            {/* Outer Ring */}
            <motion.div
                className="custom-cursor-ring"
                style={{
                    left: ringX,
                    top: ringY,
                    opacity: isVisible ? 1 : 0,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{ scale: { duration: 0.2 } }}
            />
        </>
    );
}
