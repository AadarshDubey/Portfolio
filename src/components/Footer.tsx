import { siteConfig } from "@/content/content";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer className="bg-warm-900 text-warm-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-warm-50 font-semibold text-lg mb-2">
                            {siteConfig.name.split(" ")[0]}
                            <span className="text-accent">.</span>
                        </h3>
                        <p className="text-sm text-warm-400 max-w-xs">
                            {siteConfig.title} — Building production-grade AI solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-warm-50 font-medium text-sm mb-3 uppercase tracking-wider">
                            Navigation
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-warm-400 hover:text-accent transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-warm-50 font-medium text-sm mb-3 uppercase tracking-wider">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            <a
                                href={siteConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="p-2 rounded-lg bg-warm-800 hover:bg-warm-700 text-warm-400 hover:text-accent transition-colors"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 rounded-lg bg-warm-800 hover:bg-warm-700 text-warm-400 hover:text-accent transition-colors"
                            >
                                <Linkedin size={18} />
                            </a>
                            {siteConfig.social.twitter && (
                                <a
                                    href={siteConfig.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    className="p-2 rounded-lg bg-warm-800 hover:bg-warm-700 text-warm-400 hover:text-accent transition-colors"
                                >
                                    <Twitter size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-warm-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-warm-500">
                    <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart size={14} className="text-accent" /> by {siteConfig.name}
                    </p>
                </div>
            </div>
        </footer>
    );
}
