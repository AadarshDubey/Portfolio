"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, Paintbrush, FileCode2 } from "lucide-react";

export function WebDevDemo() {
    const [phase, setPhase] = useState<"html" | "css" | "js" | "done">("html");

    useEffect(() => {
        if (phase === "html") {
            const timer = setTimeout(() => setPhase("css"), 2000);
            return () => clearTimeout(timer);
        }
        if (phase === "css") {
            const timer = setTimeout(() => setPhase("js"), 2000);
            return () => clearTimeout(timer);
        }
        if (phase === "js") {
            const timer = setTimeout(() => setPhase("done"), 1500);
            return () => clearTimeout(timer);
        }
        if (phase === "done") {
            const timer = setTimeout(() => setPhase("html"), 3000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                    <FileCode2 size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-accent group-hover:text-orange-500 transition-colors">Web Dev</h3>
                    <p className="text-sm text-warm-500 font-medium">HTML, CSS, JS</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">

                {/* Browser Window Simulation */}
                <div className="w-full max-w-[280px] h-[160px] bg-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col relative transition-all duration-500">

                    {/* Browser Toolbar */}
                    <div className="bg-slate-200/50 px-3 py-2 flex items-center gap-2 border-b border-slate-200">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <div className="flex-1 ml-2 h-4 bg-[#0a0a0a] rounded-sm border border-slate-200" />
                    </div>

                    {/* Browser Content Area */}
                    <div className="p-4 flex-1 relative bg-[#0a0a0a]">

                        {/* Phase 1: HTML (Bare wireframes, exposed tags) */}
                        <AnimatePresence>
                            {(phase === "html" || phase === "css" || phase === "js" || phase === "done") && (
                                <motion.div className="w-full space-y-3">
                                    {/* Header / Nav */}
                                    <motion.div
                                        className="w-full flex justify-between items-center"
                                        animate={{
                                            border: phase === "html" ? "2px dashed #cbd5e1" : "none",
                                            padding: phase === "html" ? "4px" : "0",
                                        }}
                                    >
                                        <motion.div
                                            className="h-4 w-12 rounded"
                                            animate={{
                                                backgroundColor: phase === "html" ? "#cbd5e1" : "#4f46e5",
                                                opacity: phase === "html" ? 0.5 : 1
                                            }}
                                        />
                                        <div className="flex gap-2">
                                            {[1, 2].map((i) => (
                                                <motion.div key={i}
                                                    className="h-2 w-6 rounded"
                                                    animate={{
                                                        backgroundColor: phase === "html" ? "#e2e8f0" : "#94a3b8",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Main Hero block */}
                                    <motion.div
                                        className="w-full h-16 rounded flex items-center justify-center flex-col gap-2 relative overflow-hidden"
                                        animate={{
                                            border: phase === "html" ? "2px dashed #94a3b8" : "none",
                                            backgroundColor: phase === "html" ? "transparent" : "#f1f5f9",
                                            borderRadius: phase === "html" ? "0" : "8px"
                                        }}
                                    >
                                        {phase === "html" && (
                                            <span className="absolute top-1 left-1 text-[8px] font-mono text-slate-400">&lt;div id="hero"&gt;</span>
                                        )}

                                        <motion.div
                                            className="h-3 w-3/4 rounded-sm"
                                            animate={{
                                                backgroundColor: phase === "html" ? "#94a3b8" : "#334155"
                                            }}
                                        />
                                        <motion.div
                                            className="h-2 w-1/2 rounded-sm"
                                            animate={{
                                                backgroundColor: phase === "html" ? "#cbd5e1" : "#64748b"
                                            }}
                                        />

                                        {/* Button (JS Interactivity) */}
                                        <motion.div
                                            className="mt-1 h-4 w-16 rounded flex items-center justify-center origin-center"
                                            animate={{
                                                backgroundColor: phase === "html" ? "transparent" : phase === "css" ? "#4f46e5" : "#4f46e5",
                                                border: phase === "html" ? "1px solid #94a3b8" : "none",
                                                scale: (phase === "js" || phase === "done") ? [1, 1.1, 1] : 1,
                                                boxShadow: (phase === "js" || phase === "done") ? "0 4px 6px -1px rgba(79, 70, 229, 0.4)" : "none"
                                            }}
                                            transition={{
                                                scale: { repeat: (phase === "js" || phase === "done") ? Infinity : 0, duration: 1.5 }
                                            }}
                                        >
                                            <span className="text-[6px] font-bold text-white tracking-wider">
                                                {phase === "html" ? "BUTTON" : phase === "js" || phase === "done" ? "CLICKABLE" : "STYLED"}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Progress Indicator Track */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 flex">
                        <motion.div
                            className="h-full bg-orange-400"
                            animate={{ width: phase === "html" ? "33%" : phase === "css" ? "66%" : "100%" }}
                        />
                    </div>
                </div>

                {/* Status Badges */}
                <div className="absolute bottom-[-10px] flex gap-2 w-full justify-center">
                    <div className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors flex items-center gap-1 ${phase === "html" ? "bg-orange-100 text-orange-600 shadow-sm border border-orange-200" : "bg-[#0a0a0a] text-slate-300 border border-slate-100"}`}>
                        <LayoutTemplate size={10} /> HTML
                    </div>
                    <div className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors flex items-center gap-1 ${phase === "css" ? "bg-blue-100 text-blue-600 shadow-sm border border-blue-200" : "bg-[#0a0a0a] text-slate-300 border border-slate-100"}`}>
                        <Paintbrush size={10} /> CSS
                    </div>
                    <div className={`px-2 py-1 text-[10px] font-bold rounded-full transition-colors flex items-center gap-1 ${(phase === "js" || phase === "done") ? "bg-yellow-100 text-yellow-600 shadow-sm border border-yellow-200" : "bg-[#0a0a0a] text-slate-300 border border-slate-100"}`}>
                        <FileCode2 size={10} /> JS
                    </div>
                </div>

            </div>

            <div className="absolute -right-6 -bottom-6 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <FileCode2 size={160} />
            </div>
        </div>
    );
}


