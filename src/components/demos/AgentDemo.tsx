"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, BrainCircuit, Wrench, CheckCircle2 } from "lucide-react";

export function AgentDemo() {
    const [activeNode, setActiveNode] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode(current => (current + 1) % 5);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { id: 0, label: "User Req", icon: User, color: "bg-blue-100 text-blue-600 border-blue-200" },
        { id: 1, label: "Router", icon: BrainCircuit, color: "bg-purple-100 text-purple-600 border-purple-200" },
        { id: 2, label: "Tool Use", icon: Wrench, color: "bg-amber-100 text-amber-600 border-amber-200" },
        { id: 3, label: "Evaluator", icon: BrainCircuit, color: "bg-purple-100 text-purple-600 border-purple-200" },
        { id: 4, label: "Response", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
    ];

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] flex flex-col p-4 overflow-hidden shadow-sm">

            <div className="flex-1 flex items-center justify-center w-full relative">

                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <defs>
                        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#e2e8f0" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>
                    </defs>

                    {/* Hardcoded paths for the layout */}
                    <path d="M 40,60 Q 80,60 120,60" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" className="sm:hidden" />

                    {/* Desktop layout lines */}
                    <g className="hidden sm:inline">
                        <path d="M 60,80 Q 120,30 140,80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <path d="M 140,80 Q 200,130 220,80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                        <path d="M 220,80 Q 280,30 300,80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                    </g>
                </svg>

                <div className="relative z-10 w-full max-w-[320px] flex flex-wrap justify-center gap-4 sm:gap-6 preserve-3d">

                    {nodes.map((node, i) => {
                        const Icon = node.icon;
                        const isActive = activeNode === i;
                        const isPast = activeNode > i || (activeNode === 0 && i > 0);

                        return (
                            <div key={node.id} className="flex flex-col items-center relative gap-2">
                                {/* Flow particle animation connecting nodes */}
                                {isActive && i < nodes.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: [0, 1, 0], x: 40 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute top-4 -right-8 sm:-right-10 w-2 h-2 rounded-full bg-slate-400 z-0 hidden sm:block"
                                    />
                                )}

                                <motion.div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border shadow-sm transition-all duration-300 ${isActive ? `${node.color} scale-110 ring-4 ring-black/5` : isPast ? "bg-[#0a0a0a] border-neutral-800 text-warm-800" : "bg-[#0a0a0a] border-warm-100 text-warm-300 grayscale"}`}
                                >
                                    <Icon size={18} className={isActive ? "animate-pulse" : ""} />
                                </motion.div>
                                <span className={`text-[10px] font-semibold transition-colors duration-300 ${isActive ? "text-slate-700" : "text-slate-400"}`}>
                                    {node.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-slate-400 z-20">
                <span>graph.compile()</span>
                <span className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-slate-200 font-sans font-medium text-[10px] uppercase tracking-wider text-slate-600 shadow-sm">Agents</span>
                    <span className="hidden sm:inline px-2 py-1 rounded bg-[#0a0a0a] border border-slate-200 font-sans font-medium text-[10px] uppercase tracking-wider text-slate-600 shadow-sm">LangGraph</span>
                </span>
            </div>
        </div>
    );
}


