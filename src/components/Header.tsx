"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/content/content";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    "Rendering in 10,000 lumens per second."
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
            toast(funnyQuotes[quoteIndex], {
                icon: '☀️',
                duration: 3000,
            });
            // Loop quote index
            setQuoteIndex((prev) => (prev + 1) % funnyQuotes.length);
        } else {
            setTheme("dark");
        }
    };

    // IntersectionObserver for active section
    useEffect(() => {
        const sections = navLinks.map((l) => l.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 will-change-transform transform-gpu ${isScrolled
                ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md shadow-sm border-b border-orange-200/50 dark:border-warm-800/50"
                : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo / Name */}
                <a
                    href="#home"
                    className="font-bold text-lg tracking-tight text-orange-500 dark:text-white hover:text-orange-600 dark:hover:text-warm-200 transition-colors w-[200px]"
                >
                    {siteConfig.name}
                </a>

                {/* Desktop Nav - Centered Pill */}
                <div className="hidden md:flex items-center gap-1 bg-orange-50/80 dark:bg-black/40 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-orange-200/50 dark:border-white/5">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === link.href.slice(1)
                                ? "bg-orange-500/10 dark:bg-white/10 text-orange-600 dark:text-white"
                                : "text-orange-400 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side - Theme Toggle & Mobile Menu */}
                <div className="flex items-center justify-end w-[200px]">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-orange-400 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white transition-colors hidden md:block"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-orange-500 dark:text-warm-300 hover:text-orange-600 dark:hover:text-warm-50"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-orange-200/50 dark:border-white/10 shadow-lg"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${activeSection === link.href.slice(1)
                                        ? "bg-orange-500/10 dark:bg-white/10 text-orange-600 dark:text-white font-medium"
                                        : "text-orange-400 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white"
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
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-orange-400 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-white w-full"
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

