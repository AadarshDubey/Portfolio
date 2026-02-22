"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { experiences } from "@/content/content";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperienceSection() {
    if (experiences.length === 0) return null;

    return (
        <SectionWrapper id="experience">
            <div className="mb-12 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <Briefcase size={18} className="text-accent" />
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">
                        Career
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Experience
                </h2>
            </div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-warm-800 hidden sm:block" />

                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative sm:pl-12"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-warm-50 hidden sm:block" />

                            <div className="rounded-xl border border-warm-800 bg-[#0a0a0a] p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {exp.role}
                                        </h3>
                                        <p className="text-sm text-warm-400">{exp.organization}</p>
                                    </div>
                                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full w-fit">
                                        {exp.startDate} — {exp.endDate}
                                    </span>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {exp.bullets.map((bullet, j) => (
                                        <li
                                            key={j}
                                            className="text-sm text-warm-300 flex items-start gap-2"
                                        >
                                            <span className="text-accent mt-1 shrink-0">▸</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5">
                                    {exp.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 text-xs bg-warm-900/40 border border-warm-800/50 text-warm-300 rounded-full"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

