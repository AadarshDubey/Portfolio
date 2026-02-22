"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: string;
    suffix?: string;
    duration?: number;
}

export default function AnimatedCounter({
    value,
    suffix = "",
    duration = 2000,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const numericValue = parseInt(value, 10);

    useEffect(() => {
        if (!isInView || isNaN(numericValue)) return;

        let start = 0;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * numericValue);
            setCount(start);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, numericValue, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {isInView ? count : 0}
            {suffix}
        </span>
    );
}
