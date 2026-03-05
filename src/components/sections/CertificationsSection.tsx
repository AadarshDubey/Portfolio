"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { timelineItems } from "@/content/content";
import {
    Award,
    Trophy,
    Code2,
    PenTool,
    Mic,
    Star,
    ExternalLink,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
    award: <Award size={20} />,
    trophy: <Trophy size={20} />,
    code: <Code2 size={20} />,
    "pen-tool": <PenTool size={20} />,
    mic: <Mic size={20} />,
    star: <Star size={20} />,
};

export default function CertificationsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const springY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const cometHeight = useTransform(springY, [0, 1], ["0%", "100%"]);

    return (
        <SectionWrapper id="certifications">
            {/* Section Header */}
            <div className="mb-16 flex flex-col items-center text-center">
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                    WHAT HAVE I DONE SO FAR
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mt-2 flex flex-wrap justify-center gap-x-3 overflow-hidden">
                    <motion.span
                        initial={{ opacity: 0, x: -120 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        My
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: 120 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        Certifications/Experience
                    </motion.span>
                </h2>
            </div>

            {/* Timeline */}
            <div className="relative" ref={containerRef}>
                {/* Center Vertical Line */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-warm-300/30">
                    {/* The Comet Trail */}
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-accent to-accent"
                        style={{ height: cometHeight }}
                    >
                        {/* Glow at the tip */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[30px] rounded-full bg-accent text-accent shadow-[0_0_15px_5px_currentColor]" />
                    </motion.div>
                </div>

                <div className="space-y-12 sm:space-y-16">
                    {timelineItems.map((item, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="relative"
                            >
                                {/* ── Mobile Layout (stacked left) ── */}
                                <div className="flex sm:hidden items-start gap-5 pl-10">
                                    {/* Timeline dot (mobile) */}
                                    <div className="absolute left-1.5 top-0 z-10 w-6 h-6 rounded-full bg-warm-50 border-2 border-accent flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                                    </div>

                                    <div className="flex-1">
                                        {/* Date */}
                                        <span className="text-xs font-medium text-warm-400 mb-2 block">
                                            {item.date}
                                            {item.issuer && ` · ${item.issuer}`}
                                        </span>

                                        {/* Card */}
                                        <div className="rounded-xl bg-warm-800 border border-warm-700 p-5 shadow-lg">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent shrink-0">
                                                    {iconMap[item.icon] || <Star size={16} />}
                                                </div>
                                                <h3 className="text-sm font-bold text-warm-50 leading-snug">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            {item.bullets && item.bullets.length > 0 && (
                                                <ul className="space-y-1.5 mt-2">
                                                    {item.bullets.map((bullet, j) => (
                                                        <li
                                                            key={j}
                                                            className="text-xs text-warm-300 flex items-start gap-2"
                                                        >
                                                            <span className="text-accent mt-0.5 shrink-0">•</span>
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-accent hover:text-accent-light transition-colors"
                                                >
                                                    <ExternalLink size={12} />
                                                    View
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ── Desktop Layout (alternating) ── */}
                                <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6 items-center">
                                    {/* Left Content Area */}
                                    <div className={isLeft ? "pr-4" : ""}>
                                        {isLeft ? (
                                            <div className="rounded-xl bg-warm-800 border border-warm-700 p-6 shadow-lg ml-auto max-w-md hover:border-accent/40 transition-colors duration-300">
                                                <h3 className="text-base font-bold text-warm-50 mb-3">
                                                    {item.title}
                                                </h3>
                                                {item.bullets && item.bullets.length > 0 && (
                                                    <ul className="space-y-2">
                                                        {item.bullets.map((bullet, j) => (
                                                            <li
                                                                key={j}
                                                                className="text-sm text-warm-300 flex items-start gap-2"
                                                            >
                                                                <span className="text-accent mt-0.5 shrink-0">•</span>
                                                                {bullet}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-accent hover:text-accent-light transition-colors"
                                                    >
                                                        <ExternalLink size={12} />
                                                        View Credential
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-right pr-2">
                                                <span className="text-sm font-medium text-warm-500">
                                                    {item.date}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Center Circle Node */}
                                    <div className="relative flex flex-col items-center">
                                        <div className="z-10 w-10 h-10 rounded-full bg-warm-50 border-[3px] border-warm-300 flex items-center justify-center text-accent shadow-md">
                                            {iconMap[item.icon] || <Star size={18} />}
                                        </div>
                                    </div>

                                    {/* Right Content Area */}
                                    <div className={!isLeft ? "pl-4" : ""}>
                                        {!isLeft ? (
                                            <div className="rounded-xl bg-warm-800 border border-warm-700 p-6 shadow-lg mr-auto max-w-md hover:border-accent/40 transition-colors duration-300">
                                                <h3 className="text-base font-bold text-warm-50 mb-3">
                                                    {item.title}
                                                </h3>
                                                {item.bullets && item.bullets.length > 0 && (
                                                    <ul className="space-y-2">
                                                        {item.bullets.map((bullet, j) => (
                                                            <li
                                                                key={j}
                                                                className="text-sm text-warm-300 flex items-start gap-2"
                                                            >
                                                                <span className="text-accent mt-0.5 shrink-0">•</span>
                                                                {bullet}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-accent hover:text-accent-light transition-colors"
                                                    >
                                                        <ExternalLink size={12} />
                                                        View Credential
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="pl-2">
                                                <span className="text-sm font-medium text-warm-500">
                                                    {item.date}
                                                </span>
                                                {item.issuer && (
                                                    <span className="text-xs text-warm-400 block mt-0.5">
                                                        {item.issuer}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}

