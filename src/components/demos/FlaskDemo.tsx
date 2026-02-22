"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Route, Server, FileJson } from "lucide-react";

export function FlaskDemo() {
    const [activeRoute, setActiveRoute] = useState<string | null>(null);

    // Auto cycle through routes
    useEffect(() => {
        const routes = ["/api/users", "/api/posts", "/health"];
        let count = 0;

        const interval = setInterval(() => {
            setActiveRoute(routes[count % routes.length]);
            count++;

            // Clear route after request simulation finishes
            setTimeout(() => {
                setActiveRoute(null);
            }, 1500);

        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const routes = [
        { path: "/api/users", method: "GET", color: "text-blue-500", bg: "bg-blue-50" },
        { path: "/api/posts", method: "POST", color: "text-green-500", bg: "bg-green-50" },
        { path: "/health", method: "GET", color: "text-teal-500", bg: "bg-teal-50" },
    ];

    return (
        <div className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group">
            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                    <Coffee size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-accent group-hover:text-slate-700 transition-colors">Flask</h3>
                    <p className="text-sm text-warm-500 font-medium">WSGI Web Framework</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mb-4">

                <div className="w-full max-w-[280px] flex gap-4">

                    {/* Router / App.py */}
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2 relative">
                        <div className="flex items-center gap-1.5 mb-2 border-b border-slate-200 pb-2">
                            <Server size={14} className="text-slate-400" />
                            <span className="text-[10px] font-mono font-bold text-slate-500">app.py</span>
                        </div>

                        {routes.map((route) => {
                            const isActive = activeRoute === route.path;
                            return (
                                <div
                                    key={route.path}
                                    className={`relative p-2 rounded-lg border text-xs font-mono transition-all duration-300 ${isActive ? "bg-[#0a0a0a] border-slate-300 shadow-sm" : "bg-transparent border-transparent text-slate-400"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={isActive ? route.color : ""}>{route.path}</span>
                                        {isActive && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold text-white ${route.method === "GET" ? "bg-blue-400" : "bg-green-400"}`}
                                            >
                                                {route.method}
                                            </motion.span>
                                        )}
                                    </div>

                                    {/* Active request ping */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full"
                                                initial={{ scale: 0, opacity: 1 }}
                                                animate={{ scale: [0, 1.5, 2], opacity: [1, 1, 0] }}
                                                transition={{ duration: 1 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Output / JSON Response */}
                    <div className="w-[100px] flex flex-col items-center justify-center gap-3">
                        <Route className="text-slate-300" size={24} />

                        <div className="w-full h-16 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden">
                            {/* Empty State */}
                            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Response</span>

                            {/* Active Data Payload */}
                            <AnimatePresence>
                                {activeRoute && (
                                    <motion.div
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "-100%", opacity: 0 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                        className="absolute inset-0 bg-emerald-50 border-emerald-200 flex items-center justify-center p-2"
                                    >
                                        <FileJson size={20} className="text-emerald-500 shrink-0" />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="ml-1 flex flex-col gap-1"
                                        >
                                            <div className="h-1 w-8 bg-emerald-200 rounded-full" />
                                            <div className="h-1 w-5 bg-emerald-200 rounded-full" />
                                            <div className="h-1 w-6 bg-emerald-200 rounded-full" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute -left-6 -bottom-6 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <Coffee size={180} />
            </div>
        </div>
    );
}


