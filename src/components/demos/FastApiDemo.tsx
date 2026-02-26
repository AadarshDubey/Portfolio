"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Activity, Users } from "lucide-react";

export function FastApiDemo() {
    const [isBursting, setIsBursting] = useState(false);
    const [requests, setRequests] = useState<number[]>([]);

    const triggerBurst = () => {
        if (isBursting) return;
        setIsBursting(true);

        // Generate 15 simultaneous requests
        const reqs = Array.from({ length: 15 }, (_, i) => i);
        setRequests(reqs);

        // Clear them very quickly (simulating async/await speed)
        setTimeout(() => {
            setRequests([]);
            setIsBursting(false);
        }, 1800);
    };

    // Auto trigger occasionally if idle
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6 && !isBursting) {
                triggerBurst();
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [isBursting]);

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent flex flex-col p-6 group cursor-pointer" onClick={triggerBurst}>
            <div className="flex items-center gap-3 mb-6 relative z-10 pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-[#009688] text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,150,136,0.3)]">
                    <Zap size={20} fill="currentColor" />
                </div>
                <div>
                    <h3 className="font-bold text-white group-hover:text-[#009688] transition-colors">FastAPI</h3>
                    <p className="text-sm text-slate-400 font-medium">Asynchronous Python</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10 w-full pointer-events-none">

                <div className="flex justify-between items-center mb-8 px-2 max-w-[280px] w-full mx-auto">
                    {/* Users / Incoming */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 relative">
                            <Users size={20} />
                            <AnimatePresence>
                                {isBursting && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 1 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 border-2 border-slate-400 rounded-full"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Clients</span>
                    </div>

                    {/* Server Node */}
                    <div className="flex flex-col items-center gap-2">
                        <motion.div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 z-10 transition-colors ${isBursting ? "bg-[#009688] border-[#80cbc4] text-white shadow-[0_0_30px_rgba(0,150,136,0.5)]" : "bg-slate-800 border-slate-700 text-slate-400"
                                }`}
                            animate={{ scale: isBursting ? [1, 1.1, 1.05] : 1 }}
                        >
                            <Activity className={isBursting ? "animate-pulse" : ""} size={24} />
                        </motion.div>
                        <span className="text-[10px] uppercase font-bold text-[#009688]">ASGI Server</span>
                    </div>
                </div>

                {/* Animated Connectors/Requests */}
                <div className="absolute top-1/2 left-12 right-20 h-16 -translate-y-[4rem] pointer-events-none">
                    <AnimatePresence>
                        {requests.map((id) => {
                            // Stagger start times slightly for burst effect
                            const delay = Math.random() * 0.3;
                            const yOffset = (Math.random() - 0.5) * 40; // Spread vertically

                            return (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, x: 0, y: yOffset, scale: 0 }}
                                    animate={{ opacity: [0, 1, 1, 0], x: "180%", scale: [0.5, 1, 0.5] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay, ease: "easeOut" }}
                                    className="absolute left-8 top-1/2 w-4 h-1.5 bg-[#4db6ac] rounded-full shadow-[0_0_10px_rgba(77,182,172,0.8)]"
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Hint */}
                <div className="absolute bottom-0 w-full text-center">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        {isBursting ? "Handling 100k+ Req/Sec" : "Click to burst traffic"}
                    </span>
                </div>
            </div>

            <div className="absolute -left-8 -bottom-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Zap size={180} />
            </div>
        </div>
    );
}

