"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, CheckCircle2 } from "lucide-react";

const sampleResponse = "Here is a quick overview of OpenAI's capabilities. It excels at natural language understanding, reasoning, and complex generation tasks.";

export function OpenAIDemo() {
    const [state, setState] = useState<"idle" | "typing_user" | "waiting" | "streaming" | "done">("idle");
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    const startChat = () => {
        if (state !== "idle") return;
        setState("typing_user");
        setDisplayedText("");
        setCharIndex(0);

        setTimeout(() => setState("waiting"), 1000);
    };

    // Streaming effect
    useEffect(() => {
        if (state === "streaming") {
            if (charIndex < sampleResponse.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => prev + sampleResponse[charIndex]);
                    setCharIndex(prev => prev + 1);
                }, 30); // 30ms per char
                return () => clearTimeout(timer);
            } else {
                setState("done");
            }
        }
    }, [state, charIndex]);

    useEffect(() => {
        if (state === "waiting") {
            const timer = setTimeout(() => setState("streaming"), 600);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                    <Bot size={22} />
                </div>
                <div>
                    <h3 className="font-bold text-accent group-hover:text-emerald-600 transition-colors">OpenAI</h3>
                    <p className="text-sm text-warm-500 font-medium">LLMs & Streaming</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col relative z-10 w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">

                {/* Chat window */}
                <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">

                    {/* User Message */}
                    <AnimatePresence>
                        {(state !== "idle") && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex gap-2 items-end self-end max-w-[85%]"
                            >
                                <div className="bg-emerald-500 text-white p-2 rounded-2xl rounded-br-sm text-xs shadow-sm">
                                    {state === "typing_user" ? (
                                        <div className="flex gap-1 h-4 items-center px-1">
                                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-[#0a0a0a]/70 rounded-full" />
                                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#0a0a0a]/70 rounded-full" />
                                            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#0a0a0a]/70 rounded-full" />
                                        </div>
                                    ) : (
                                        "Explain OpenAI briefly."
                                    )}
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                    <User size={12} className="text-slate-500" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Message */}
                    <AnimatePresence>
                        {(state === "waiting" || state === "streaming" || state === "done") && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="flex gap-2 items-start max-w-[90%]"
                            >
                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                                    <Bot size={12} className="text-emerald-600" />
                                </div>
                                <div className="bg-[#0a0a0a] border border-slate-200 text-slate-700 p-2.5 rounded-2xl rounded-tl-sm text-xs shadow-sm leading-relaxed min-h-[36px]">
                                    {state === "waiting" ? (
                                        <div className="flex gap-1 h-4 items-center px-1">
                                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                        </div>
                                    ) : (
                                        <span>
                                            {displayedText}
                                            {state === "streaming" && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                    className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 align-middle"
                                                />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input action */}
                <div className="p-2 bg-[#0a0a0a] border-t border-slate-200">
                    <button
                        onClick={startChat}
                        disabled={state !== "idle" && state !== "done"}
                        className="w-full h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg flex items-center justify-between px-3 text-xs font-medium transition-colors disabled:opacity-50 group/btn"
                    >
                        <span>{state === "done" ? "Restart Chat" : "Send Prompt"}</span>
                        {state === "done" ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Send size={12} className="group-hover/btn:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>

            <div className="absolute -right-4 -bottom-4 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Bot size={140} />
            </div>
        </div>
    );
}


