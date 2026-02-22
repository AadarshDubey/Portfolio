"use client";

import { siteConfig } from "@/content/content";
import { Github, Linkedin, ArrowDown, FileDown } from "lucide-react";
import { motion } from "framer-motion";

const ComputationalBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* Extremely faint, slow-moving grid */}
        <motion.div
            animate={{
                backgroundPosition: ['0px 0px', '64px 64px'],
            }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity
            }}
            className="absolute inset-0 opacity-[0.09]"
            style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: '4rem 4rem'
            }}
        />

        {/* Soft, low-opacity drifting orbs (no sharp lines, no bright cyan) */}
        <motion.div
            animate={{
                x: ['-2%', '2%', '-2%'],
                y: ['-2%', '2%', '-2%'],
            }}
            transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-1/4 left-[20%] w-[40rem] h-[40rem] bg-white rounded-full filter blur-[120px] opacity-[0.04]"
        />
        <motion.div
            animate={{
                x: ['2%', '-2%', '2%'],
                y: ['2%', '-2%', '2%'],
            }}
            transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-1/4 right-[20%] w-[35rem] h-[35rem] bg-warm-200 rounded-full filter blur-[120px] opacity-[0.03]"
        />

        {/* Subtle center pulse representing computational core */}
        <motion.div
            animate={{
                opacity: [0.03, 0.05, 0.03],
                scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
            className="absolute w-[50rem] h-[50rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_50%)] filter blur-[80px]"
        />
    </div>
);

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#050505]"
        >
            <ComputationalBackground />

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
        </section>
    );
}
