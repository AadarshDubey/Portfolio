"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/content/content";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

const funnyQuotes = [
    "Dark mode developers are judging you right now.",
    "Switching CSS variables from --dark-soul to --holy-sunlight.",
    "Rendering in 10,000 lumens per second.",
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    // Cursor glow tracking
    const navRef = useRef<HTMLDivElement>(null);
    const glowX = useMotionValue(-200);
    const glowY = useMotionValue(-200);
    const springX = useSpring(glowX, { stiffness: 300, damping: 30 });
    const springY = useSpring(glowY, { stiffness: 300, damping: 30 });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll handler — shrink effect
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // IntersectionObserver for active section
    useEffect(() => {
        const sections = navLinks.map((l) => l.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -60% 0px" }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // Cursor glow mouse tracking
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        glowX.set(e.clientX - rect.left);
        glowY.set(e.clientY - rect.top);
    };
    const handleMouseLeave = () => {
        glowX.set(-200);
        glowY.set(-200);
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            toast(funnyQuotes[quoteIndex], { icon: "☀️", duration: 3000 });
            setQuoteIndex((prev) => (prev + 1) % funnyQuotes.length);
        } else {
            setTheme("dark");
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[90] flex justify-center pointer-events-none">
            <motion.nav
                animate={{
                    // Scroll shrink: nav gets narrower + loses top margin on scroll
                    paddingTop: isScrolled ? "10px" : "18px",
                    paddingLeft: isScrolled ? "12px" : "20px",
                    paddingRight: isScrolled ? "12px" : "20px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <a
                        href="#home"
                        className="font-bold text-lg tracking-tight text-orange-500 dark:text-white hover:text-orange-600 dark:hover:text-warm-200 transition-colors w-[180px] shrink-0"
                    >
                        {siteConfig.name}
                    </a>

                    {/* ── FLOATING GLASS CAPSULE NAV ── */}
                    <div
                        ref={navRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="hidden md:flex relative items-center gap-0.5 rounded-full px-2 py-2 overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            boxShadow:
                                "0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                    >
                        {/* Cursor glow blob */}
                        <motion.div
                            className="pointer-events-none absolute rounded-full"
                            style={{
                                width: 120,
                                height: 120,
                                x: springX,
                                y: springY,
                                translateX: "-50%",
                                translateY: "-50%",
                                background:
                                    "radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)",
                                filter: "blur(8px)",
                                zIndex: 0,
                            }}
                        />

                        {/* Nav items */}
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-1.5 text-sm font-medium rounded-full select-none"
                                    style={{ zIndex: 1 }}
                                >
                                    {/* Sliding indicator pill */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="glass-pill"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(251,146,60,0.25) 0%, rgba(249,115,22,0.15) 100%)",
                                                border: "1px solid rgba(251,146,60,0.3)",
                                                boxShadow:
                                                    "0 0 12px rgba(251,146,60,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                                                zIndex: -1,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 35,
                                                mass: 0.8,
                                            }}
                                        />
                                    )}
                                    <span
                                        className={`relative transition-colors duration-200 ${isActive
                                            ? "text-orange-500 dark:text-orange-400 font-semibold"
                                            : "text-neutral-500 dark:text-neutral-400 hover:text-orange-500 dark:hover:text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center justify-end w-[180px] gap-2">
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-orange-400 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors hidden md:block"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        )}

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden p-2 text-orange-500 dark:text-warm-300 hover:text-orange-600 dark:hover:text-warm-50"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 right-0 md:hidden pointer-events-auto"
                        style={{
                            background: "rgba(5,5,5,0.95)",
                            backdropFilter: "blur(20px)",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                        }}
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${activeSection === link.href.slice(1)
                                        ? "bg-orange-500/15 text-orange-400 font-semibold border border-orange-500/20"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-2 mt-2 border-t border-white/10">
                                {mounted && (
                                    <button
                                        onClick={() => {
                                            toggleTheme();
                                            setMobileOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white w-full"
                                    >
                                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                        <span>Toggle Theme</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
