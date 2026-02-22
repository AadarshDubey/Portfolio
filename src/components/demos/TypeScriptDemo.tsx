"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function TypeScriptDemo() {
    const [typing, setTyping] = useState<"initial" | "typing" | "error" | "fixing" | "success">("initial");

    useEffect(() => {
        if (typing === "initial") {
            const timer = setTimeout(() => setTyping("typing"), 800);
            return () => clearTimeout(timer);
        }
        if (typing === "typing") {
            const timer = setTimeout(() => setTyping("error"), 1200);
            return () => clearTimeout(timer);
        }
        if (typing === "error") {
            const timer = setTimeout(() => setTyping("fixing"), 2000);
            return () => clearTimeout(timer);
        }
        if (typing === "fixing") {
            const timer = setTimeout(() => setTyping("success"), 800);
            return () => clearTimeout(timer);
        }
        if (typing === "success") {
            const timer = setTimeout(() => setTyping("initial"), 2500);
            return () => clearTimeout(timer);
        }
    }, [typing]);

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#3178c6] text-white flex items-center justify-center shadow-[0_0_15px_rgba(49,120,198,0.3)]">
                    <span className="font-bold font-sans text-xl leading-none">TS</span>
                </div>
                <div>
                    <h3 className="font-bold text-slate-100 group-hover:text-[#3178c6] transition-colors">TypeScript</h3>
                    <p className="text-sm text-slate-400 font-medium">Type Safety</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="w-full bg-[#161b22] rounded-xl border border-slate-700/60 p-5 font-mono text-sm relative overflow-hidden shadow-inner">

                    {/* IDE Header */}
                    <div className="flex gap-1.5 mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
                    </div>

                    <div className="text-slate-300">
                        <span className="text-pink-400">interface</span> <span className="text-emerald-300">User</span> {"{"}<br />
                        &nbsp;&nbsp;id: <span className="text-blue-300">number</span>;<br />
                        &nbsp;&nbsp;name: <span className="text-blue-300">string</span>;<br />
                        {"}"}<br /><br />

                        <span className="text-pink-400">const</span> <span className="text-sky-300">user</span>: <span className="text-emerald-300">User</span> = {"{"}<br />
                        &nbsp;&nbsp;id: <span className="text-orange-300">1</span>,<br />
                        <div className="flex items-end">
                            &nbsp;&nbsp;
                            <span className="relative">
                                name:
                                <AnimatePresence mode="popLayout">
                                    {(typing === "initial" || typing === "typing") && (
                                        <motion.span
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                    {(typing === "error" || typing === "fixing") && (
                                        <motion.span
                                            key="error-state"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-orange-300"
                                        >
                                            {" "}42
                                        </motion.span>
                                    )}
                                    {typing === "success" && (
                                        <motion.span
                                            key="success-state"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-emerald-200"
                                        >
                                            {" "}"Alice"
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Red Squiggly Line */}
                                <AnimatePresence>
                                    {typing === "error" && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute bottom-0 left-12 right-0 h-1 origin-left"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='3'%3E%3Cpath d='M0 2.5 L1.5 0.5 L4.5 2.5 L6 0.5' fill='none' stroke='red' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                                                backgroundRepeat: "repeat-x"
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </span>

                            {/* Blinking Cursor */}
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-1.5 h-4 bg-slate-400 ml-1 mb-0.5"
                                style={{
                                    display: (typing === "error" || typing === "success") ? "none" : "block"
                                }}
                            />
                        </div>
                        {"}"};
                    </div>

                    {/* Hover tooltip for error */}
                    <AnimatePresence>
                        {typing === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-4 right-4 bg-red-950/80 border border-red-900/50 backdrop-blur-md p-2.5 rounded-lg shadow-xl max-w-[200px]"
                            >
                                <div className="flex items-start gap-2">
                                    <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                                    <p className="text-xs text-red-200 leading-tight">
                                        Type 'number' is not assignable to type 'string'.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {typing === "success" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-4 right-4 bg-emerald-950/80 border border-emerald-900/50 backdrop-blur-md p-2 rounded-full shadow-xl"
                            >
                                <CheckCircle2 size={18} className="text-emerald-400" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute -right-12 -top-12 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="text-[200px] font-bold font-sans">TS</span>
            </div>
        </div>
    );
}

