"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
    id: string;
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export default function SectionWrapper({
    id,
    children,
    className = "",
    dark = false,
}: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id={id}
            ref={ref}
            className={`section-padding relative w-full ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {children}
            </motion.div>
        </section>
    );
}

