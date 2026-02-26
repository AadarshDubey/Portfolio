"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, MonitorSmartphone, Zap, Loader2 } from "lucide-react";

export function NextJsDemo() {
    const [state, setState] = useState<"idle" | "ssr" | "hydrating" | "interactive">("idle");

    useEffect(() => {
        if (state === "idle") {
            const timer = setTimeout(() => setState("ssr"), 600);
            return () => clearTimeout(timer);
        }
        if (state === "ssr") {
            const timer = setTimeout(() => setState("hydrating"), 1500);
            return () => clearTimeout(timer);
        }
        if (state === "hydrating") {
            const timer = setTimeout(() => setState("interactive"), 1200);
            return () => clearTimeout(timer);
        }
        if (state === "interactive") {
            const timer = setTimeout(() => setState("idle"), 3000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#050505] text-white flex items-center justify-center shadow-sm relative overflow-hidden">
                    <span className="font-bold font-sans text-xl leading-none">N</span>
                    <motion.div
                        className="absolute inset-0 bg-[#0a0a0a]/20"
                        animate={{ x: ["-100%", "100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
                    />
                </div>
                <div>
                    <h3 className="font-bold text-accent group-hover:text-accent transition-colors">Next.js</h3>
                    <p className="text-sm text-warm-500 font-medium">SSR & Hydration</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <div className="w-full max-w-[280px] bg-[#0a0a0a] rounded-xl shadow-sm border border-neutral-800 p-4 relative overflow-hidden">

                    {/* Status Header */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-warm-100">
                        <div className="flex items-center gap-2">
                            {state === "ssr" && <Server size={14} className="text-slate-500" />}
                            {state === "hydrating" && <Loader2 size={14} className="text-accent animate-spin" />}
                            {state === "interactive" && <MonitorSmartphone size={14} className="text-green-500" />}
                            <span className="text-xs font-mono font-medium text-warm-600 uppercase tracking-widest">
                                {state === "idle" ? "REQUEST" : state === "ssr" ? "SERVER RENDER" : state === "hydrating" ? "HYDRATING" : "INTERACTIVE"}
                            </span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                    </div>

                    {/* Page Content Wireframe */}
                    <div className="space-y-3">
                        {/* Hero Block */}
                        <motion.div
                            className="w-full h-12 rounded-lg"
                            initial={{ backgroundColor: "#f3f4f6" }}
                            animate={{
                                backgroundColor: state === "idle" ? "#f3f4f6" : state === "ssr" ? "#e5e7eb" : state === "hydrating" ? "#d1d5db" : "#4ecdc4"
                            }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Interactivity Indicator */}
                        <div className="flex gap-2">
                            <motion.div
                                className="h-6 w-1/3 rounded flex items-center justify-center text-[10px] font-bold text-white overflow-hidden shadow-sm"
                                initial={{ backgroundColor: "#f3f4f6", opacity: 0.5 }}
                                animate={{
                                    backgroundColor: state === "interactive" ? "#1e1915" : "#f3f4f6",
                                    opacity: state === "ssr" || state === "hydrating" ? 1 : state === "interactive" ? 1 : 0.5,
                                    scale: state === "interactive" ? [1, 1.05, 1] : 1
                                }}
                            >
                                {state === "interactive" && "CLICK ME"}
                            </motion.div>
                            <motion.div
                                className="h-6 w-2/3 rounded"
                                initial={{ backgroundColor: "#f3f4f6", opacity: 0.5 }}
                                animate={{
                                    backgroundColor: state === "ssr" || state === "hydrating" || state === "interactive" ? "#e5e7eb" : "#f3f4f6",
                                    opacity: 1
                                }}
                            />
                        </div>

                        {/* Text Lines */}
                        <div className="space-y-1.5 pt-1">
                            <motion.div
                                className="h-2 w-full rounded-full"
                                initial={{ backgroundColor: "#f3f4f6" }}
                                animate={{ backgroundColor: state === "idle" ? "#f3f4f6" : "#e5e7eb" }}
                            />
                            <motion.div
                                className="h-2 w-4/5 rounded-full"
                                initial={{ backgroundColor: "#f3f4f6" }}
                                animate={{ backgroundColor: state === "idle" ? "#f3f4f6" : "#e5e7eb" }}
                            />
                        </div>
                    </div>

                    {/* Overlay for Server rendering sending raw HTML vs React binding JS */}
                    <AnimatePresence>
                        {state === "ssr" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex items-center justify-center z-10"
                            >
                                <span className="px-3 py-1 bg-[#0a0a0a] text-slate-800 text-xs font-mono font-bold rounded-full border border-slate-200 shadow-lg">
                                    HTML
                                </span>
                            </motion.div>
                        )}
                        {state === "hydrating" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none z-10"
                            >
                                <motion.div
                                    className="absolute inset-0 border-2 border-accent/40 rounded-xl"
                                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent">
                                    <Zap size={32} className="animate-pulse drop-shadow-[0_0_8px_rgba(78,205,196,0.5)]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Background minimal decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                    <line x1="12" y1="22" x2="12" y2="15.5"></line>
                    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                    <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                    <line x1="12" y1="2" x2="12" y2="8.5"></line>
                </svg>
            </div>
        </div>
    );
}


