"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Zap, RefreshCw, Server } from "lucide-react";

export function RedisDemo() {
    const [requestState, setRequestState] = useState<"idle" | "requesting_cache" | "cache_miss" | "fetching_db" | "cache_hit" | "returning">("idle");
    const [cacheKey, setCacheKey] = useState<string | null>(null);
    const [stats, setStats] = useState({ hits: 0, misses: 0 });

    const simulateRequest = () => {
        if (requestState !== "idle") return;

        // 50% chance of a cache hit if we already fetched, otherwise always miss first time
        const isHit = cacheKey !== null && Math.random() > 0.3;

        setRequestState("requesting_cache");

        setTimeout(() => {
            if (isHit) {
                // CACHE HIT
                setRequestState("cache_hit");
                setStats(s => ({ ...s, hits: s.hits + 1 }));
                setTimeout(() => setRequestState("returning"), 300); // Super fast
            } else {
                // CACHE MISS
                setRequestState("cache_miss");
                setStats(s => ({ ...s, misses: s.misses + 1 }));

                setTimeout(() => {
                    setRequestState("fetching_db");
                    // Slow DB fetch
                    setTimeout(() => {
                        setCacheKey("user_data_xyz"); // Cache it
                        setRequestState("returning");
                    }, 1500);
                }, 400);
            }
        }, 300);
    };

    // Return back to idle
    if (requestState === "returning") {
        setTimeout(() => setRequestState("idle"), 1000);
    }

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center justify-between mb-4 relative z-10 p-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shadow-sm">
                        <Database size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-accent group-hover:text-red-500 transition-colors">Redis</h3>
                        <p className="text-sm text-warm-500 font-medium">In-Memory Cache</p>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider">HITS / MISSES</div>
                    <div className="text-lg font-mono font-bold">
                        <span className="text-green-500">{stats.hits}</span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-orange-500">{stats.misses}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-2">

                <div className="w-full flex justify-between items-center relative h-32 mt-4">

                    {/* Client Side Node */}
                    <div className="flex flex-col items-center gap-2 relative z-20">
                        <motion.button
                            onClick={simulateRequest}
                            disabled={requestState !== "idle"}
                            className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors z-20"
                            whileTap={{ scale: 0.9 }}
                        >
                            <RefreshCw size={18} className={requestState !== "idle" && requestState !== "returning" ? "animate-spin" : ""} />
                        </motion.button>
                        <span className="text-xs font-bold text-slate-500">CLIENT</span>
                    </div>

                    {/* REDIS NODE (Middle) */}
                    <div className="flex flex-col items-center gap-2 relative z-20">
                        <motion.div
                            className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-colors duration-300 ${requestState === "cache_hit" ? "bg-red-50 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]" :
                                cacheKey ? "bg-[#0a0a0a] border-red-200 text-red-400" : "bg-[#0a0a0a] border-slate-200 text-slate-300"
                                }`}
                            animate={{ scale: requestState === "cache_hit" ? [1, 1.1, 1] : 1 }}
                        >
                            <Zap size={24} className={requestState === "cache_hit" ? "drop-shadow-lg" : ""} />
                        </motion.div>
                        <span className="text-xs font-bold text-red-500">REDIS</span>

                        {/* Status Label */}
                        <AnimatePresence>
                            {requestState === "cache_miss" && (
                                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-6 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap">CACHE MISS</motion.span>
                            )}
                            {requestState === "cache_hit" && (
                                <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -bottom-6 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">~1ms HIT</motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* DB NODE (Right) */}
                    <div className="flex flex-col items-center gap-2 relative z-20">
                        <motion.div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${requestState === "fetching_db" ? "bg-blue-50 border-2 border-blue-400 text-blue-500" : "bg-[#0a0a0a] border-2 border-slate-200 text-slate-400"
                                }`}
                            animate={{
                                scale: requestState === "fetching_db" ? [1, 1.05, 1] : 1,
                                boxShadow: requestState === "fetching_db" ? "0 0 15px rgba(59, 130, 246, 0.4)" : "none"
                            }}
                            transition={{ repeat: requestState === "fetching_db" ? Infinity : 0, duration: 1 }}
                        >
                            <Server size={20} />
                        </motion.div>
                        <span className="text-xs font-bold text-slate-500">SQL DB</span>
                        <AnimatePresence>
                            {requestState === "fetching_db" && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -bottom-6 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">~150ms</motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CONNECTIONS (Animated Pipes) */}
                    {/* Client to Redis */}
                    <div className="absolute top-6 left-6 right-1/2 -z-10 h-0.5 bg-slate-100 overflow-hidden">
                        {(requestState === "requesting_cache" || requestState === "cache_hit" || requestState === "cache_miss") && (
                            <motion.div
                                className="h-full w-12 bg-red-400 rounded-full blur-[1px]"
                                initial={{ x: -20 }}
                                animate={{ x: 200 }}
                                transition={{ duration: 0.4 }}
                            />
                        )}
                        {requestState === "returning" && cacheKey !== null && stats.hits > 0 && stats.hits > stats.misses - 1 && (
                            <motion.div
                                className="h-full w-24 bg-green-400 rounded-full blur-[1px] shadow-[0_0_8px_rgba(74,222,128,0.8)]"
                                initial={{ x: 200 }}
                                animate={{ x: -20 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </div>

                    {/* Redis to DB (Only active on miss) */}
                    <div className="absolute top-6 left-1/2 right-6 -z-10 h-0.5 bg-slate-100 overflow-hidden">
                        {requestState === "fetching_db" && (
                            <motion.div
                                className="h-full w-8 bg-blue-400 rounded-full blur-[1px]"
                                initial={{ x: -10 }}
                                animate={{ x: 150 }}
                                transition={{ duration: 0.6 }}
                            />
                        )}
                        {requestState === "returning" && cacheKey !== null && stats.misses > stats.hits && (
                            <motion.div
                                className="h-full w-[100%] bg-blue-400 rounded-full blur-[1px]"
                                initial={{ x: 200 }}
                                animate={{ x: -150 }}
                                transition={{ duration: 1 }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute -left-6 -bottom-6 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Database size={160} />
            </div>
        </div>
    );
}


