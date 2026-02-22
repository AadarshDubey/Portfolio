"use client";

import { siteConfig } from "@/content/content";
import { Github, Linkedin, ArrowDown, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LiquidDistortion = dynamic(() => import("@/components/LiquidDistortion"), {
    ssr: false,
});

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#050505]"
        >
            {/* Three.js liquid distortion background */}
            <LiquidDistortion />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                            {siteConfig.name.split(" ")[0].toUpperCase()}{" "}
                            <span className="text-accent">
                                {siteConfig.name.split(" ").slice(1).join(" ").toUpperCase()}
                            </span>
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-warm-200 font-medium">
                            {siteConfig.title}
                        </p>
                    </div>

                    <p className="text-base sm:text-lg text-warm-300 max-w-2xl mx-auto leading-relaxed">
                        {siteConfig.tagline}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4 pt-6">
                        <a
                            href="#projects"
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm-950 font-medium text-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(78,205,196,0.2)] hover:-translate-y-0.5"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
                            </span>
                            {/* Subtle gradient shift overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
                        </a>

                        <a
                            href={siteConfig.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a]/50 backdrop-blur-sm text-white font-medium text-sm rounded-lg border border-white/10 hover:bg-[#111111] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-white/20 hover:-translate-y-0.5"
                        >
                            <FileDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
                            Resume
                        </a>

                        <div className="flex items-center gap-3">
                            <a
                                href={siteConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="group p-3 rounded-lg bg-[#0a0a0a]/50 border border-white/10 text-white hover:bg-[#111111] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-white/20 hover:-translate-y-0.5"
                            >
                                <Github size={20} className="transition-transform duration-300 group-hover:scale-110" />
                            </a>
                            <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="group p-3 rounded-lg bg-[#0a0a0a]/50 border border-white/10 text-white hover:bg-[#111111] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-white/20 hover:-translate-y-0.5"
                            >
                                <Linkedin size={20} className="transition-transform duration-300 group-hover:scale-110" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Define shimmer animation for the View Projects button */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />

            {/* Bottom gradient fade: hero → black */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: '200px',
                    background: 'linear-gradient(to bottom, transparent, #050505)',
                }}
            />
        </section>
    );
}
