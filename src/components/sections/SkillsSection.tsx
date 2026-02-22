"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { Cpu, Sparkles, Code, Brain } from "lucide-react";
import { currentlyExploring } from "@/content/content";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Map of components using dynamic imports for performance improvement
const demoComponents: Record<string, React.ComponentType<any>> = {
    WebDev: dynamic(() => import("@/components/demos/WebDevDemo").then(mod => mod.WebDevDemo), { ssr: false }),
    Api: dynamic(() => import("@/components/demos/ApiDemo").then(mod => mod.ApiDemo), { ssr: false }),
    React: dynamic(() => import("@/components/demos/ReactDemo").then(mod => mod.ReactDemo), { ssr: false }),
    NextJs: dynamic(() => import("@/components/demos/NextJsDemo").then(mod => mod.NextJsDemo), { ssr: false }),
    TypeScript: dynamic(() => import("@/components/demos/TypeScriptDemo").then(mod => mod.TypeScriptDemo), { ssr: false }),
    ThreeJs: dynamic(() => import("@/components/demos/ThreeJsDemo").then(mod => mod.ThreeJsDemo), { ssr: false }),
    Agent: dynamic(() => import("@/components/demos/AgentDemo").then(mod => mod.AgentDemo), { ssr: false }),
    Rag: dynamic(() => import("@/components/demos/RagDemo").then(mod => mod.RagDemo), { ssr: false }),
    Prompt: dynamic(() => import("@/components/demos/PromptDemo").then(mod => mod.PromptDemo), { ssr: false }),
    Database: dynamic(() => import("@/components/demos/DatabaseDemo").then(mod => mod.DatabaseDemo), { ssr: false }),
    OpenAI: dynamic(() => import("@/components/demos/OpenAIDemo").then(mod => mod.OpenAIDemo), { ssr: false }),
    Gemini: dynamic(() => import("@/components/demos/GeminiDemo").then(mod => mod.GeminiDemo), { ssr: false }),
    Redis: dynamic(() => import("@/components/demos/RedisDemo").then(mod => mod.RedisDemo), { ssr: false }),
    FastApi: dynamic(() => import("@/components/demos/FastApiDemo").then(mod => mod.FastApiDemo), { ssr: false }),
    Flask: dynamic(() => import("@/components/demos/FlaskDemo").then(mod => mod.FlaskDemo), { ssr: false }),
};

const skillCategories = [
    {
        title: "Core & Frontend",
        icon: <Code size={16} className="text-warm-400" />,
        skills: [
            { id: "React", label: "React Ecosystem" },
            { id: "NextJs", label: "Next.js Framework" },
            { id: "TypeScript", label: "TypeScript" },
            { id: "WebDev", label: "Web Development" },
            { id: "Api", label: "API Integration" },
            { id: "ThreeJs", label: "3D & Animations" },
        ]
    },
    {
        title: "GenAI & Data Stack",
        icon: <Brain size={16} className="text-indigo-400" />,
        skills: [
            { id: "Agent", label: "AI Agents" },
            { id: "Rag", label: "RAG Systems" },
            { id: "Prompt", label: "Prompt Engineering" },
            { id: "Database", label: "Database Architecture" },
            { id: "OpenAI", label: "OpenAI Models" },
            { id: "Gemini", label: "Gemini API" },
            { id: "Redis", label: "Caching Systems" },
            { id: "FastApi", label: "FastAPI Backend" },
            { id: "Flask", label: "Flask APIs" },
        ]
    }
];

export default function SkillsSection() {
    const [activeSkill, setActiveSkill] = useState("React");

    const ActiveComponent = demoComponents[activeSkill];

    return (
        <SectionWrapper id="skills" className="relative">
            <div className="mb-12 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-3 justify-center">
                    <Cpu size={18} className="text-accent" />
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">
                        Technical Expertise
                    </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Skill in Action
                </h2>
                <p className="mt-4 mb-2 text-warm-300 max-w-2xl text-[17px] leading-relaxed mx-auto">
                    A glimpse into my technical toolkit through interactive mini-demos.
                    Experience everything from fluid frontend interactions to complex GenAI architectures.
                </p>
                <p className="text-sm text-warm-500 italic">
                    Interactive demos. Built with performance in mind.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
                {/* Left Side: Skills List */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {skillCategories.map((category, catIdx) => (
                        <div key={category.title} className="flex flex-col">
                            <div className="flex items-center gap-2 mb-4 pl-1 border-b border-warm-800/30 pb-2">
                                {category.icon}
                                <h3 className="text-sm font-semibold text-warm-200 tracking-wider uppercase">
                                    {category.title}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {category.skills.map((skill) => {
                                    const isActive = activeSkill === skill.id;
                                    return (
                                        <button
                                            key={skill.id}
                                            onClick={() => setActiveSkill(skill.id)}
                                            className={`
                                                relative flex items-center justify-between text-left px-4 py-3 rounded-lg transition-all duration-200 group
                                                ${isActive
                                                    ? "bg-accent/10 text-accent border border-accent/20 font-medium"
                                                    : "bg-transparent text-warm-400 hover:bg-warm-900/30 hover:text-warm-200 border border-transparent"}
                                            `}
                                        >
                                            <span className="relative z-10">{skill.label}</span>
                                            {isActive ? (
                                                <Sparkles size={14} className="text-accent relative z-10" />
                                            ) : (
                                                <div className="w-1.5 h-1.5 rounded-full bg-warm-700 group-hover:bg-warm-500 transition-colors" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Side: Live Demo Window */}
                <div className="lg:col-span-8">
                    <div className="sticky top-24 bg-[#050505] border border-warm-800/50 rounded-2xl overflow-hidden shadow-2xl relative h-[500px] flex flex-col group">
                        {/* Fake Mac window header */}
                        <div className="h-10 bg-[#0a0a0a] border-b border-warm-800/50 flex items-center px-4 shrink-0">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div className="mx-auto text-xs font-medium text-warm-500 flex items-center gap-2 bg-warm-900/30 px-3 py-1 rounded-md">
                                <Code size={12} />
                                ~/{skillCategories.find(c => c.skills.some(s => s.id === activeSkill))?.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/{activeSkill.toLowerCase()}-demo.tsx
                            </div>
                            <div className="w-14"></div> {/* Spacer for centering */}
                        </div>

                        {/* Component Playground Area */}
                        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] relative w-full h-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none z-0" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSkill}
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="w-full h-full flex items-center justify-center relative z-10"
                                >
                                    {ActiveComponent ? <ActiveComponent /> : null}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Currently Exploring */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-16 flex flex-wrap items-center justify-center gap-2 text-sm text-warm-400 bg-warm-900/20 px-6 py-4 rounded-full border border-warm-800/30 w-fit mx-auto"
            >
                <Sparkles size={16} className="text-accent shrink-0" />
                <span className="font-semibold text-warm-200">Currently exploring:</span>
                <span className="text-warm-300">{currentlyExploring}</span>
            </motion.div>
        </SectionWrapper>
    );
}

