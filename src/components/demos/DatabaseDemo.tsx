"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TableProperties } from "lucide-react";

export function DatabaseDemo() {
    const [stage, setStage] = useState<"querying" | "results">("querying");

    useEffect(() => {
        const flow = () => {
            setStage("querying");
            setTimeout(() => setStage("results"), 2500);
        };

        flow();
        const interval = setInterval(flow, 5500);
        return () => clearInterval(interval);
    }, []);

    const rows = [
        { id: 1, name: "Project Alpha", status: "Active" },
        { id: 2, name: "Beta Release", status: "Done" },
        { id: 3, name: "DB Migration", status: "Pending" },
    ];

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] border border-transparent shadow-sm flex flex-col p-4 overflow-hidden">

            {/* Grid background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <div className="flex-1 flex flex-col w-full max-w-[280px] mx-auto relative mt-2 z-10">

                {/* Query Input */}
                <div className="bg-slate-900 rounded-lg p-3 shadow-md border border-slate-800 w-full mb-4">
                    <div className="flex gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] font-mono leading-relaxed">
                        <span className="text-sky-400 font-semibold">SELECT</span> <span className="text-white">*</span> <span className="text-sky-400 font-semibold">FROM</span> <span className="text-cyan-200">projects</span><br />
                        <span className="text-sky-400 font-semibold">WHERE</span> <span className="text-white">status</span> = <span className="text-amber-300">'Active'</span>;
                        {stage === "querying" && <span className="animate-pulse w-1.5 h-3 ml-1 bg-[#0a0a0a] inline-block align-middle" />}
                    </div>
                </div>

                {/* Results Table Visualization */}
                <div className="flex-1 relative">
                    <AnimatePresence>
                        {stage === "results" && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-sky-100 shadow-sm overflow-hidden flex flex-col"
                            >
                                <div className="bg-sky-50 px-3 py-2 border-b border-sky-100 flex items-center gap-2">
                                    <TableProperties size={12} className="text-sky-600" />
                                    <span className="text-[10px] font-semibold text-sky-800 uppercase tracking-wider">Results (3ms)</span>
                                </div>
                                <div className="flex-1 p-2 flex flex-col gap-1.5">
                                    {rows.map((row, i) => (
                                        <motion.div
                                            key={row.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (i * 0.1) }}
                                            className="flex items-center justify-between px-2 py-1.5 rounded-md bg-slate-50 text-[10px] font-mono border border-slate-100"
                                        >
                                            <span className="text-slate-500 w-4">{row.id}</span>
                                            <span className="text-slate-700 flex-1 ml-2 font-sans font-medium">{row.name}</span>
                                            <span className={`px-1.5 py-0.5 rounded-sm ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : row.status === 'Done' ? 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-700'}`}>
                                                {row.status}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-sky-600 z-20">
                <span>pool.query()</span>
                <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-sky-200 font-sans font-medium text-[10px] uppercase tracking-wider text-sky-700 shadow-sm">PostgreSQL</span>
            </div>
        </div>
    );
}


