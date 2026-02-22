"use client";

import { useState, useRef } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { siteConfig } from "@/content/content";
import {
    Send,
    Mail,
    Github,
    Linkedin,
    Twitter,
    CheckCircle,
    AlertCircle,
    Copy,
    Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [copied, setCopied] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Honeypot check
        if (formData.get("website")) return;

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !message) return;

        setFormState("submitting");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setFormState("success");
                formRef.current?.reset();
                setTimeout(() => setFormState("idle"), 5000);
            } else {
                setFormState("error");
                setTimeout(() => setFormState("idle"), 4000);
            }
        } catch {
            setFormState("error");
            setTimeout(() => setFormState("idle"), 4000);
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(siteConfig.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <SectionWrapper id="contact" dark>
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Info */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Mail size={18} className="text-accent" />
                        <span className="text-sm font-medium text-accent uppercase tracking-wider">
                            Contact
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-warm-50 mb-4">
                        Let&apos;s build something intelligent.
                    </h2>
                    <p className="text-warm-400 mb-8 max-w-md">
                        Whether you have a project in mind, want to collaborate, or just want to
                        say hi — I&apos;d love to hear from you.
                    </p>

                    {/* Email Copy */}
                    <div className="mb-8">
                        <p className="text-xs text-warm-500 uppercase tracking-wider mb-2">
                            Email
                        </p>
                        <button
                            onClick={copyEmail}
                            className="group flex items-center gap-2 text-warm-200 hover:text-accent transition-colors"
                        >
                            <span className="text-sm font-medium">{siteConfig.email}</span>
                            {copied ? (
                                <Check size={14} className="text-accent" />
                            ) : (
                                <Copy
                                    size={14}
                                    className="text-warm-500 group-hover:text-accent transition-colors"
                                />
                            )}
                        </button>
                    </div>

                    {/* Social Links */}
                    <div>
                        <p className="text-xs text-warm-500 uppercase tracking-wider mb-3">
                            Connect
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={siteConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="p-3 rounded-xl bg-warm-800 text-warm-400 hover:text-accent hover:bg-warm-700 transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-3 rounded-xl bg-warm-800 text-warm-400 hover:text-accent hover:bg-warm-700 transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            {siteConfig.social.twitter && (
                                <a
                                    href={siteConfig.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    className="p-3 rounded-xl bg-warm-800 text-warm-400 hover:text-accent hover:bg-warm-700 transition-colors"
                                >
                                    <Twitter size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="rounded-2xl bg-warm-800/50 border border-warm-700/30 backdrop-blur-sm p-6 sm:p-8 space-y-5"
                    >
                        {/* Honeypot (anti-spam) */}
                        <input
                            type="text"
                            name="website"
                            className="hidden"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-warm-300 mb-1.5"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-2.5 bg-warm-900/50 border border-warm-700 rounded-lg text-warm-100 text-sm placeholder:text-warm-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-warm-300 mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-2.5 bg-warm-900/50 border border-warm-700 rounded-lg text-warm-100 text-sm placeholder:text-warm-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-warm-300 mb-1.5"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 bg-warm-900/50 border border-warm-700 rounded-lg text-warm-100 text-sm placeholder:text-warm-600 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={formState === "submitting"}
                            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent text-warm-950 font-medium text-sm rounded-lg hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {formState === "submitting" ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-warm-950/30 border-t-warm-950 rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={14} />
                                    Send Message
                                </>
                            )}
                        </button>

                        {/* Status Messages */}
                        <AnimatePresence>
                            {formState === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2 text-sm text-green-400"
                                >
                                    <CheckCircle size={16} />
                                    Message sent! I&apos;ll get back to you soon.
                                </motion.div>
                            )}
                            {formState === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-2 text-sm text-red-400"
                                >
                                    <AlertCircle size={16} />
                                    Something went wrong. Please try again.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </SectionWrapper>
    );
}
