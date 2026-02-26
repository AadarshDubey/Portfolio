"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Database, Bot, Sparkles } from "lucide-react";

export function RagDemo() {
    const [step, setStep] = useState<"idle" | "searching" | "retrieving" | "generating" | "done">("idle");
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (step !== "idle" && step !== "done") return;
        setQuery("What are the latest GenAI trends?");
        setStep("searching");

        setTimeout(() => setStep("retrieving"), 1200);
        setTimeout(() => setStep("generating"), 2500);
        setTimeout(() => setStep("done"), 4500);
    };

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] from-indigo-50/30 to-purple-50/30 flex flex-col p-4 overflow-hidden shadow-sm group cursor-pointer" onClick={handleSearch}>

            <div className="flex-1 flex flex-col w-full max-w-[280px] mx-auto relative mt-2">

                {/* Search Bar */}
                <motion.div
                    layout
                    className={`w-full bg-[#0a0a0a] rounded-full border shadow-sm flex items-center px-4 py-2.5 transition-colors ${step === "idle" ? "border-neutral-800 group-hover:border-indigo-300" : "border-indigo-200"}`}
                >
                    <Search size={16} className={step === "idle" ? "text-warm-400" : "text-indigo-500"} />
                    <span className={`ml-3 text-sm font-medium ${query ? "text-warm-800" : "text-warm-400"}`}>
                        {query || "Ask AI a question..."}
                    </span>
                    {step === "idle" && <span className="ml-auto text-[10px] font-mono bg-warm-100 text-warm-500 px-2 py-0.5 rounded-md hidden sm:block">Click to run</span>}
                </motion.div>

                <div className="flex-1 mt-4 relative">
                    {/* Pipeline Visualization */}
                    <AnimatePresence>
                        {step !== "idle" && (
                            <div className="absolute inset-0 flex flex-col">

                                {/* Vector DB Step */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${step === "searching" || step === "retrieving" ? "bg-indigo-100 border-indigo-200 text-indigo-600" : "bg-warm-100 border-neutral-800 text-warm-400"}`}>
                                        <Database size={14} className={step === "searching" ? "animate-pulse" : ""} />
                                    </div>
                                    <div className="flex-1 mt-1.5">
                                        <div className="text-xs font-semibold text-warm-700">Vector Database</div>
                                        <div className="text-[10px] font-mono text-warm-500 mt-1 h-4">
                                            {step === "searching" && <span className="animate-pulse">Searching embeddings...</span>}
                                            {(step === "retrieving" || step === "generating" || step === "done") && <span className="text-emerald-600">Retrieved 3 context docs</span>}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Connecting Line */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 16 }}
                                    transition={{ delay: 1 }}
                                    className="w-px bg-indigo-200 ml-4 my-1"
                                />

                                {/* LLM Generation Step */}
                                {(step === "retrieving" || step === "generating" || step === "done") && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${step === "generating" ? "bg-purple-100 border-purple-200 text-purple-600" : step === "done" ? "bg-warm-100 border-neutral-800 text-warm-400" : "bg-warm-50 border-warm-100 text-warm-300"}`}>
                                            <Bot size={14} className={step === "generating" ? "animate-pulse" : ""} />
                                        </div>
                                        <div className="flex-1 bg-[#0a0a0a] p-3 rounded-xl border border-neutral-800 shadow-sm mt-0.5">
                                            {step === "generating" && (
                                                <div className="flex gap-1 items-center h-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                                                </div>
                                            )}
                                            {step === "done" && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] leading-relaxed font-medium text-warm-800">
                                                    <Sparkles size={10} className="inline mr-1 text-purple-500 -mt-0.5" />
                                                    Multi-modal agents and real-time reasoning models are leading...
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-indigo-400 z-20">
                <span>context.py</span>
                <span className="px-2 py-1 rounded bg-indigo-50/80 border border-indigo-100 font-sans font-medium text-[10px] uppercase tracking-wider text-indigo-700">RAG</span>
            </div>
        </div>
    );
}


