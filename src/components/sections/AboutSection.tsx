"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { about } from "@/content/content";
import { User, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <SectionWrapper id="about" className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left: About Text */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <User size={18} className="text-accent" />
                        <span className="text-sm font-medium text-accent uppercase tracking-wider">
                            About Me
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-6">
                        The Story
                    </h2>
                    <p className="text-warm-300 leading-relaxed mb-6">
                        {about.summary}
                    </p>

                    <h3 className="text-lg font-semibold text-accent mb-3">
                        What I Value
                    </h3>
                    <ul className="space-y-3 mb-8">
                        {about.values.map((value, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="flex items-start gap-3 text-sm text-warm-300"
                            >
                                <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
                                {value}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Right: How I Work */}
                <div>
                    <div className="rounded-2xl border border-warm-800 bg-[#0a0a0a] p-6 sm:p-8">
                        <h3 className="text-lg font-semibold text-accent mb-6">
                            How I Work
                        </h3>
                        <div className="space-y-4">
                            {about.workflow.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-accent">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <span className="text-sm text-warm-300 font-medium">
                                        {step}
                                    </span>
                                    {i < about.workflow.length - 1 && (
                                        <ArrowRight size={14} className="text-warm-300 shrink-0 hidden sm:block" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Contact CTA */}
                    <div className="mt-6 rounded-2xl bg-[#0a0a0a] border border-warm-800 text-warm-50 p-6">
                        <p className="font-semibold mb-2">Interested in working together?</p>
                        <p className="text-sm text-warm-400 mb-4">
                            I&apos;m always open to discussing new projects and opportunities.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-warm-950 text-sm font-medium rounded-lg hover:bg-accent-light transition-colors"
                        >
                            Get In Touch
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

