"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { achievements } from "@/content/content";
import {
    Trophy,
    Award,
    Code2,
    PenTool,
    Mic,
    Star,
    ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
    trophy: <Trophy size={18} />,
    award: <Award size={18} />,
    code: <Code2 size={18} />,
    "pen-tool": <PenTool size={18} />,
    mic: <Mic size={18} />,
    star: <Star size={18} />,
};

export default function AchievementsSection() {
    if (achievements.length === 0) return null;
    return (
        <SectionWrapper id="achievements">
            <div className="mb-12 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <Trophy size={18} className="text-accent" />
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">
                        Recognition
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Achievements & Publications
                </h2>
            </div>

            <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-warm-800 hidden sm:block" />

                <div className="space-y-6">
                    {achievements.map((ach, i) => (
                        <motion.div
                            key={ach.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            className="relative sm:pl-12"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-1.5 top-3 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center hidden sm:flex">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-xl border border-warm-800 bg-[#0a0a0a] hover:border-warm-600 hover:shadow-sm transition-all duration-300">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                                    {iconMap[ach.icon] || <Star size={18} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold text-white text-sm">
                                            {ach.title}
                                        </h3>
                                        <span className="text-xs text-warm-400 shrink-0">
                                            {ach.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-warm-300 mt-1">
                                        {ach.description}
                                    </p>
                                    {ach.link && (
                                        <a
                                            href={ach.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-accent hover:text-accent-dark transition-colors"
                                        >
                                            <ExternalLink size={12} />
                                            View
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

