"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Image as ImageIcon, Text, Check, Play } from "lucide-react";

export function GeminiDemo() {
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const runInference = () => {
        if (generating) return;
        setGenerating(true);
        setResult(null);

        // Simulate multi-modal generation delay
        setTimeout(() => {
            setGenerating(false);
            setResult("A majestic golden retriever sitting happily in a sunny field of daisies.");
        }, 2500);
    };

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white">Google Gemini</h3>
                    <p className="text-sm text-indigo-300 font-medium">Multimodal AI</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">

                {/* Input Area */}
                <div className="w-full flex gap-3 mb-4">
                    {/* Image Modality */}
                    <div className="flex-1 bg-[#151a26] border border-[#2a3045] rounded-xl p-3 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                        <ImageIcon className="text-indigo-400" size={24} />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">Image Data</span>
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-50" />
                    </div>

                    {/* Plus */}
                    <div className="flex items-center justify-center text-[#2a3045] font-bold text-xl">
                        +
                    </div>

                    {/* Text Modality */}
                    <div className="flex-1 bg-[#151a26] border border-[#2a3045] rounded-xl p-3 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                        <Text className="text-purple-400" size={24} />
                        <span className="text-[10px] uppercase tracking-wider font-bold text-purple-500">Prompt</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50" />
                    </div>
                </div>

                {/* Generate Button / Progress */}
                <div className="w-full flex justify-center mb-4">
                    <motion.button
                        onClick={runInference}
                        disabled={generating || result !== null}
                        className={`px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center gap-2 ${result ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold" :
                            "bg-[#0a0a0a] text-indigo-900 hover:scale-105 active:scale-95"
                            }`}
                        animate={{
                            width: generating ? "100%" : result ? "140px" : "140px",
                            opacity: generating ? 0.8 : 1
                        }}
                    >
                        {generating ? (
                            <div className="flex items-center gap-2 mx-auto">
                                <Sparkles size={14} className="animate-pulse" /> Generating...
                            </div>
                        ) : result ? (
                            <>
                                <Check size={16} /> Complete
                            </>
                        ) : (
                            <>
                                <Play size={14} fill="currentColor" /> Generate
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Output Area (Streaming Simulation) */}
                <div className="w-full h-20 bg-[#121621] border border-[#1e2333] rounded-xl p-3 relative overflow-hidden">
                    <AnimatePresence>
                        {generating && !result && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center px-4"
                            >
                                <motion.div
                                    className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full w-full"
                                    initial={{ scaleX: 0, x: "-100%" }}
                                    animate={{ scaleX: 1, x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </motion.div>
                        )}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-indigo-100 font-medium leading-relaxed italic"
                            >
                                "{result}"
                                <button
                                    onClick={(e) => { e.stopPropagation(); setResult(null); }}
                                    className="block mt-1 text-[10px] text-indigo-400 hover:text-white uppercase tracking-wider not-italic"
                                >
                                    Reset
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-[0.1] pointer-events-none group-hover:scale-110 transition-transform duration-1000 origin-top-right mix-blend-screen">
                <Sparkles size={200} className="text-indigo-500" />
            </div>
        </div>
    );
}


