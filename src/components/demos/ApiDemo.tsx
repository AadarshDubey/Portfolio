"use client";
import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

export function ApiDemo() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [data, setData] = useState<any>(null);

    const fetchData = async () => {
        setStatus("loading");
        // Simulate network delay, then resolve with hardcoded profile
        setTimeout(() => {
            setData({
                name: "Aadarsh Dubey",
                login: "addy",
                avatar_url: "/aady.png",
                public_repos: 18,
            });
            setStatus("success");
        }, 800);
    };

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] shadow-sm flex flex-col p-4 overflow-hidden">

            <div className="flex-1 flex flex-col items-center justify-center w-full">
                {status === "idle" && (
                    <button
                        onClick={fetchData}
                        className="group flex items-center gap-2 px-6 py-3 bg-warm-900 text-white rounded-xl text-sm font-medium hover:bg-warm-800 transition-all hover:shadow-lg active:scale-95 border border-transparent hover:border-warm-700 bg-clip-padding"
                    >
                        <Zap size={18} className="text-accent group-hover:scale-110 transition-transform" />
                        Fetch Profile
                    </button>
                )}

                {status === "loading" && (
                    <div className="flex flex-col items-center gap-4 text-warm-500">
                        <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] shadow-sm border border-warm-100 flex items-center justify-center">
                            <Loader2 className="animate-spin text-accent" size={24} />
                        </div>
                        <span className="text-xs font-mono animate-pulse bg-warm-200/50 px-2 py-1 rounded text-warm-600">await fetch('/api/user')...</span>
                    </div>
                )}

                {status === "error" && (
                    <div className="text-sm font-medium text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                        Failed to fetch data.
                    </div>
                )}

                {status === "success" && data && (
                    <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-2xl border border-neutral-800 shadow-md w-full max-w-[260px] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-500 group relative overflow-hidden">
                        {/* Decorative background accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={data.avatar_url} alt="Avatar" className="w-14 h-14 rounded-full ring-2 ring-accent/20 object-cover relative z-10" crossOrigin="anonymous" />

                        <div className="relative z-10 flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-accent leading-tight truncate">{data.name}</h4>
                            <p className="text-xs text-warm-500 font-mono mt-0.5 truncate">@{data.login}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-accent/10 border border-accent/20 text-accent px-2 py-0.5 rounded-full font-medium inline-block">
                                    {data.public_repos} repos
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-warm-400 z-20">
                <span>fetch()</span>
                <span className="px-2 py-1 rounded bg-[#0a0a0a] border border-neutral-800 font-sans font-medium text-[10px] uppercase tracking-wider text-warm-700 shadow-sm">API</span>
            </div>
        </div>
    );
}


