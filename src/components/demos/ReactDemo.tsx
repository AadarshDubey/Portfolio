"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function ReactDemo() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] flex flex-col p-4 overflow-hidden shadow-sm">

            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <button
                    onClick={() => setChecked(!checked)}
                    className="group relative w-full max-w-[240px] p-3 md:p-4 rounded-xl bg-[#0a0a0a] shadow-sm border border-neutral-800 flex items-center gap-4 text-left transition-all hover:shadow-md hover:border-warm-300 outline-none active:scale-95 touch-manipulation z-10"
                >
                    <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${checked ? 'bg-accent border-accent text-white scale-110' : 'bg-transparent border-warm-300 text-transparent'}`}>
                        <Check size={14} strokeWidth={3} className={checked ? "scale-100 opacity-100" : "scale-50 opacity-0"} style={{ transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="relative inline-block">
                            <span className={`text-sm md:text-base font-medium transition-colors duration-300 relative z-10 ${checked ? 'text-warm-400' : 'text-accent'}`}>
                                Deploy portfolio
                            </span>
                            <div
                                className="absolute left-0 top-1/2 -translate-y-px h-[1.5px] bg-warm-400 transition-all duration-300 origin-left z-20"
                                style={{ width: checked ? '100%' : '0%', transform: `scaleX(${checked ? 1 : 0})` }}
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {checked && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0, rotate: 45 }}
                                className="absolute -top-2 -right-2 flex h-4 w-4"
                            >
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white"></span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-warm-400 z-0">
                <span>&#60;Component /&#62;</span>
                <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-neutral-800 font-sans font-medium text-[10px] uppercase tracking-wider text-warm-700 shadow-sm">React</span>
            </div>
        </div>
    );
}


