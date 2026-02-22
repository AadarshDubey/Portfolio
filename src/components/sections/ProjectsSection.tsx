"use client";

import { useState } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { projects, type Project } from "@/content/content";
import {
    ExternalLink,
    Github,
    FileText,
    X,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.35, // More pronounced delay between cards
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 100, scale: 0.9 }, // Higher Y for "coming from bottom"
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 70, // Slightly softer spring for smoother pop
                damping: 12,
                mass: 1
            },
        },
    };


    return (
        <SectionWrapper id="projects">
            {/* Global Blur Backdrop for Spotlight Effect */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-warm-900/10 backdrop-blur-sm pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Section Header */}
            <div className="mb-12 relative z-50 flex flex-col items-center text-center">
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                    MY PROJECTS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mt-2">
                    Projects.
                </h2>
                <p className="mt-4 text-warm-600 max-w-2xl leading-relaxed mx-auto">
                    Here are some highlights from my project portfolio. For a comprehensive view of my work,
                    please visit my GitHub profile, where you will find additional projects, code samples, and
                    collaborations that showcase my skills and expertise.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Triggers when cards are more visible
                className="relative z-50 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            >
                {featured.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={cardVariants}
                        onClick={() => setSelectedProject(project)}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        className={`group cursor-pointer rounded-2xl bg-[#050505] border border-transparent overflow-hidden transition-all duration-500 relative ${hoveredProject === project.id
                            ? "scale-[1.03] border-cyan-200 shadow-[0_0_20px_rgba(165,243,252,0.3)] z-[60]"
                            : hoveredProject
                                ? "opacity-40 scale-[0.98] z-30 pointer-events-none"
                                : "hover:border-cyan-200/50 hover:shadow-xl hover:shadow-cyan-200/10 z-30"
                            }`}
                    >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden bg-[#050505]">
                            {project.thumbnail ? (
                                <Image
                                    src={project.thumbnail}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-warm-800 to-warm-900 flex items-center justify-center">
                                    <span className="text-warm-700 font-bold text-4xl opacity-20">
                                        {project.title.charAt(0)}
                                    </span>
                                </div>
                            )}

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-warm-900/90 via-warm-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                            {/* GitHub icon overlay */}
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-[#050505]/50 text-white hover:bg-accent hover:text-warm-950 transition-all duration-200 backdrop-blur-md border border-white/10"
                                    aria-label={`View ${project.title} on GitHub`}
                                >
                                    <Github size={18} />
                                </a>
                            )}
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-warm-50 group-hover:text-accent transition-colors">
                                {project.title}
                            </h3>
                            <p className="mt-3 text-sm text-warm-300 leading-relaxed line-clamp-5">
                                {project.description}
                            </p>

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-warm-800">
                                {project.stack.slice(0, 4).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs font-medium text-accent"
                                    >
                                        #{tech.toLowerCase().replace(/\s+/g, '')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* More Projects */}
            {others.length > 0 && (
                <div className="relative z-50">
                    <h3 className="text-2xl font-bold text-accent mb-6">More Projects</h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {others.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onClick={() => setSelectedProject(project)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className={`group rounded-xl bg-[#050505] border border-transparent p-5 cursor-pointer transition-all duration-500 relative ${hoveredProject === project.id
                                    ? "scale-[1.03] border-cyan-200 shadow-[0_0_20px_rgba(165,243,252,0.3)] z-[60]"
                                    : hoveredProject
                                        ? "opacity-40 scale-[0.98] z-30 pointer-events-none"
                                        : "hover:border-cyan-200/50 hover:shadow-[0_0_15px_rgba(165,243,252,0.1)] z-30"
                                    }`}
                            >
                                <h4 className="font-semibold text-warm-50 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h4>
                                <p className="mt-1 text-xs font-medium text-accent">
                                    {project.outcome}
                                </p>
                                <p className="mt-2 text-sm text-warm-300 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium text-accent"
                                        >
                                            #{tag.toLowerCase()}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-4 pt-3 border-t border-warm-800">
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-warm-400 hover:text-accent transition-colors"
                                        >
                                            <Github size={13} /> Code
                                        </a>
                                    )}
                                    {project.links.live && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-warm-400 hover:text-accent transition-colors"
                                        >
                                            <ExternalLink size={13} /> Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#050505]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#050505] border border-warm-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#050505]/10 hover:bg-[#050505]/20 text-white transition-colors backdrop-blur-sm"
                                aria-label="Close dialog"
                            >
                                <X size={20} />
                            </button>

                            {/* Hero Image in Modal */}
                            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#050505]">
                                {selectedProject.thumbnail ? (
                                    <Image
                                        src={selectedProject.thumbnail}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-warm-800 to-warm-900" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                            {selectedProject.title}
                                        </h3>
                                        <p className="text-lg font-medium text-accent/90">
                                            {selectedProject.outcome}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Links Validation */}
                                <div className="flex gap-3">
                                    {selectedProject.links.github && (
                                        <a
                                            href={selectedProject.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-6 py-3 bg-warm-900 text-white text-sm font-semibold rounded-xl hover:bg-warm-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Github size={18} /> View Code
                                        </a>
                                    )}
                                    {selectedProject.links.live && (
                                        <a
                                            href={selectedProject.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm-950 text-sm font-semibold rounded-xl hover:bg-accent-light transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                                    <div className="space-y-6">
                                        {selectedProject.problem && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider mb-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                    The Problem
                                                </h4>
                                                <p className="text-warm-600 leading-relaxed">
                                                    {selectedProject.problem}
                                                </p>
                                            </div>
                                        )}

                                        {selectedProject.solution && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider mb-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    The Solution
                                                </h4>
                                                <p className="text-warm-600 leading-relaxed">
                                                    {selectedProject.solution}
                                                </p>
                                            </div>
                                        )}

                                        {selectedProject.features && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider mb-3">
                                                    <Sparkles size={14} className="text-accent" />
                                                    Key Features
                                                </h4>
                                                <ul className="grid sm:grid-cols-2 gap-3">
                                                    {selectedProject.features.map((f, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-warm-600 flex items-start gap-2 bg-warm-50 p-3 rounded-lg border border-warm-100"
                                                        >
                                                            <span className="text-accent mt-0.5 shrink-0">▸</span>
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                                                Tech Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1.5 bg-warm-100 text-warm-700 text-xs font-semibold rounded-lg border border-neutral-800"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedProject.metrics && (
                                            <div className="bg-accent/5 rounded-2xl p-5 border border-accent/10">
                                                <h4 className="text-sm font-bold text-accent-dark uppercase tracking-wider mb-3">
                                                    Impact
                                                </h4>
                                                <div className="space-y-3">
                                                    {selectedProject.metrics.map((m, i) => (
                                                        <div key={i} className="flex gap-2">
                                                            <span className="font-bold text-accent text-lg leading-none mt-0.5">
                                                                +
                                                            </span>
                                                            <span className="text-sm text-warm-700 font-medium">
                                                                {m}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedProject.lessons && (
                                            <div>
                                                <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">
                                                    Learnings
                                                </h4>
                                                <ul className="space-y-2">
                                                    {selectedProject.lessons.map((l, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-xs text-warm-500 italic flex items-start gap-2"
                                                        >
                                                            <FileText size={12} className="mt-0.5 shrink-0" />
                                                            {l}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}

