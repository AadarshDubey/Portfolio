"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Box } from "lucide-react";

export function ThreeJsDemo() {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for 3D rotation parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
    const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }

    return (
        <div
            className="relative overflow-hidden w-full h-[320px] rounded-2xl bg-[#050505] border border-transparent shadow-sm flex flex-col p-6 group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }} // Needed for 3D transforms
        >
            <div className="flex items-center gap-3 mb-6 relative z-10 pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm relative overflow-hidden">
                    <Box size={20} className="relative z-10" />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    />
                </div>
                <div>
                    <h3 className="font-bold text-accent group-hover:text-slate-800 transition-colors">Three.js</h3>
                    <p className="text-sm text-warm-500 font-medium">3D Graphics & WebGL</p>
                </div>
            </div>

            {/* Interactive 3D Canvas Area */}
            <div className="flex-1 flex items-center justify-center relative z-10 w-full pointer-events-none">

                <motion.div
                    className="relative w-32 h-32"
                    style={{
                        rotateX: isHovered ? rotateX : 15,
                        rotateY: isHovered ? rotateY : -15,
                        transformStyle: "preserve-3d"
                    }}
                    animate={{
                        rotateY: isHovered ? undefined : [-15, 345],
                    }}
                    transition={{
                        rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                    }}
                >
                    {/* Cube Faces */}
                    {/* Front */}
                    <div className="absolute inset-0 bg-[#0a0a0a] border-2 border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] flex items-center justify-center backface-hidden" style={{ transform: "translateZ(64px)" }}>
                        <span className="font-bold text-slate-300 font-mono text-2xl">Z</span>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 bg-slate-100 border-2 border-slate-800" style={{ transform: "translateZ(-64px) rotateY(180deg)" }} />
                    {/* Right */}
                    <div className="absolute inset-0 bg-slate-50 border-2 border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] flex items-center justify-center" style={{ transform: "translateX(64px) rotateY(90deg)" }}>
                        <span className="font-bold text-slate-300 font-mono text-xl">X</span>
                    </div>
                    {/* Left */}
                    <div className="absolute inset-0 bg-slate-200 border-2 border-slate-800" style={{ transform: "translateX(-64px) rotateY(-90deg)" }} />
                    {/* Top */}
                    <div className="absolute inset-0 bg-[#0a0a0a] border-2 border-slate-800 flex items-center justify-center" style={{ transform: "translateY(-64px) rotateX(90deg)" }}>
                        <span className="font-bold text-slate-300 font-mono text-xl">Y</span>
                    </div>
                    {/* Bottom */}
                    <div className="absolute inset-0 bg-slate-300 border-2 border-slate-800 shadow-2xl" style={{ transform: "translateY(64px) rotateX(-90deg)" }} />
                </motion.div>

                {/* Hint Text */}
                <motion.div
                    className="absolute bottom-4 font-mono text-xs font-bold text-slate-400 tracking-widest uppercase transition-opacity"
                    animate={{ opacity: isHovered ? 1 : 0.4 }}
                >
                    {isHovered ? "Parallax Active" : "Hover to intercept"}
                </motion.div>

            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        </div>
    );
}


