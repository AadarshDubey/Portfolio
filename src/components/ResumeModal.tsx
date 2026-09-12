"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Minus, X } from "lucide-react";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    driveUrl?: string;
    name?: string;
}

/**
 * Converts a Google Drive sharing URL to an embeddable preview URL.
 * e.g. "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
 *    → "https://drive.google.com/file/d/FILE_ID/preview"
 */
function getDrivePreviewUrl(driveUrl?: string): string | null {
    if (!driveUrl) return null;
    const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match) return null;
    return `https://drive.google.com/file/d/${match[1]}/preview`;
}

export default function ResumeModal({
    isOpen,
    onClose,
    pdfUrl,
    driveUrl,
    name = "Aadarsh Dubey",
}: ResumeModalProps) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount
    useEffect(() => {
        const checkMobile = () => {
            const mobile =
                window.innerWidth < 768 ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                );
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Keyboard ESC & body scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Delay iframe render to prevent flash
        const timer = setTimeout(() => setShowPdf(true), 250);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = prev;
            setShowPdf(false);
        };
    }, [isOpen, onClose]);

    // On mobile, use Google Drive preview (renders natively on Android/iOS).
    // On desktop, use the fast local PDF.
    const drivePreview = getDrivePreviewUrl(driveUrl);
    const iframeSrc = isMobile && drivePreview
        ? drivePreview
        : `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-xl cursor-pointer"
                    />

                    {/* macOS-style Glass Window */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.4,
                            y: 40,
                            borderRadius: "24px",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            borderRadius: isMaximized ? "0px" : "16px",
                            transition: {
                                type: "spring",
                                damping: 32,
                                stiffness: 350,
                                mass: 0.6,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.5,
                            y: 30,
                            transition: {
                                duration: 0.18,
                                ease: "easeIn",
                            },
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative z-10 flex flex-col overflow-hidden transition-[border-radius] duration-300 ${
                            isMaximized
                                ? "w-screen h-screen rounded-none"
                                : "w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl h-[92vh] sm:h-[88vh] rounded-2xl"
                        }`}
                        style={{
                            transformOrigin: "bottom center",
                            background: "linear-gradient(180deg, rgba(38,38,42,0.98) 0%, rgba(24,24,27,0.99) 100%)",
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 25px 80px -10px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1) inset",
                        }}
                    >
                        {/* ─── Title Bar (macOS glass style) ─── */}
                        <div
                            className="shrink-0 flex items-center justify-between px-4 h-12 sm:h-11 select-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(55,55,60,0.95) 0%, rgba(44,44,48,0.95) 100%)",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            {/* Traffic Lights */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onClose}
                                    className="group w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all relative cursor-pointer"
                                    aria-label="Close"
                                >
                                    <X
                                        size={8}
                                        className="absolute inset-0 m-auto text-[#4a0002] opacity-0 group-hover:opacity-100 transition-opacity"
                                        strokeWidth={3}
                                    />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="group w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all relative cursor-pointer"
                                    aria-label="Minimize"
                                >
                                    <Minus
                                        size={8}
                                        className="absolute inset-0 m-auto text-[#5a3d00] opacity-0 group-hover:opacity-100 transition-opacity"
                                        strokeWidth={3}
                                    />
                                </button>
                                <button
                                    onClick={() => setIsMaximized((v) => !v)}
                                    className="group w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all relative cursor-pointer"
                                    aria-label="Maximize"
                                >
                                    <svg
                                        viewBox="0 0 8 8"
                                        className="absolute inset-0 m-auto w-2 h-2 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity"
                                        fill="currentColor"
                                    >
                                        <path d="M1 1h2.5v1H2v1.5H1V1zM4.5 7H7V4.5H6V6H4.5v1z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Centered Window Title */}
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <span className="text-[13px] text-zinc-400 font-medium tracking-tight">
                                    {name}
                                </span>
                                <span className="text-[11px] text-zinc-500 hidden sm:inline">
                                    — Resume.pdf
                                </span>
                            </div>

                            {/* Right-side action buttons */}
                            <div className="flex items-center gap-1">
                                <a
                                    href={pdfUrl}
                                    download="Aadarsh_Dubey_Resume.pdf"
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
                                    title="Download PDF"
                                >
                                    <Download size={12} className="text-accent" />
                                    <span className="hidden sm:inline">Download</span>
                                </a>
                                <a
                                    href={driveUrl || pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                                    title="Open in new tab"
                                >
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>

                        {/* ─── PDF Content Area ─── */}
                        <div className="relative flex-1 w-full bg-[#1a1a1d] overflow-hidden">
                            {/* Loading spinner while iframe mounts */}
                            {!showPdf && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                                        <span className="text-xs text-zinc-500">Loading document…</span>
                                    </div>
                                </div>
                            )}

                            {showPdf && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full"
                                >
                                    <iframe
                                        src={iframeSrc}
                                        title={`${name} Resume`}
                                        className="w-full h-full border-0"
                                        style={{ background: "#fff" }}
                                        allow="autoplay"
                                    />
                                </motion.div>
                            )}

                            {/* Mobile bottom bar — persistent download/open on small screens */}
                            <div className="sm:hidden absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-auto">
                                <a
                                    href={pdfUrl}
                                    download="Aadarsh_Dubey_Resume.pdf"
                                    className="flex items-center gap-1.5 px-4 py-2 bg-accent text-[#0a0a0a] rounded-full text-xs font-semibold"
                                >
                                    <Download size={14} />
                                    Download PDF
                                </a>
                                <a
                                    href={driveUrl || pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white rounded-full text-xs font-medium backdrop-blur-sm"
                                >
                                    <ExternalLink size={13} />
                                    Open
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
