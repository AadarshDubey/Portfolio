"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Braces } from "lucide-react";

export function PromptDemo() {
    const [isTyping, setIsTyping] = useState(true);
    const [typedCode, setTypedCode] = useState("");
    const fullCode = `const prompt = \`
  Extract user data from string:
  "Hi, I'm Alex, 28 from NY."
  Respond ONLY with valid JSON
  matching the schema.
\`;
// await ai.generate(prompt);`;

    useEffect(() => {
        let currentString = "";
        let i = 0;

        const typeLoop = () => {
            if (i < fullCode.length) {
                currentString += fullCode.charAt(i);
                setTypedCode(currentString);
                i++;
                setTimeout(typeLoop, Math.random() * 30 + 10);
            } else {
                setIsTyping(false);
                setTimeout(() => {
                    setIsTyping(true);
                    setTypedCode("");
                    i = 0;
                    typeLoop();
                }, 4000);
            }
        };

        const timeout = setTimeout(typeLoop, 500);
        return () => clearTimeout(timeout);
    }, [fullCode]);

    return (
        <div className="relative w-full h-56 md:h-64 rounded-2xl border border-neutral-800 bg-[#050505] border-stone-800 shadow-sm flex flex-col p-4 overflow-hidden">

            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full relative z-10 pt-2 pb-6">

                {/* Editor / Input */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 px-1">
                        <Code2 size={12} className="text-stone-400" />
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wide">extract.ts</span>
                    </div>
                    <div className="flex-1 bg-stone-950/50 rounded-lg border border-stone-800 p-3 overflow-hidden shadow-inner">
                        <pre className="text-[10px] sm:text-[11px] font-mono leading-relaxed text-emerald-400/90 whitespace-pre-wrap">
                            <span className="text-fuchsia-400">const</span> <span className="text-blue-400">prompt</span> = <span className="text-amber-300/80">{typedCode.split('`')[1] ? `\`${typedCode.split('`')[1]}` : typedCode}</span>
                            {typedCode.split('`').length > 1 && typedCode.includes('//') ? <span className="text-stone-500 block mt-2">{fullCode.split('//')[1]}</span> : null}
                            <span className="animate-pulse inline-block w-1.5 h-3.5 bg-emerald-400/80 ml-0.5 align-middle" />
                        </pre>
                    </div>
                </div>

                {/* Output structured JSON */}
                <div className="flex-1 flex flex-col hide-on-mobile sm:flex">
                    <div className="flex items-center gap-2 mb-2 px-1 justify-end">
                        <Braces size={12} className="text-stone-400" />
                        <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wide">result.json</span>
                    </div>
                    <motion.div
                        animate={{ opacity: !isTyping ? 1 : 0, scale: !isTyping ? 1 : 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1 bg-[#0a0a0a]/5 backdrop-blur-sm rounded-lg border border-stone-800 p-3 overflow-hidden shadow-inner"
                    >
                        <pre className="text-[10px] sm:text-[11px] font-mono leading-relaxed text-stone-300">
                            {`{
  "user": {
    "name": "Alex",
    "age": 28,
    "location": "NY"
  }
}`}
                        </pre>
                    </motion.div>
                </div>

            </div>

            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-xs font-mono text-stone-500 z-20">
                <span>zod.object()</span>
                <span className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-stone-800 border border-stone-700 font-sans font-medium text-[10px] uppercase tracking-wider text-stone-300 shadow-sm">Prompting</span>
                    <span className="hidden sm:inline px-2 py-1 rounded bg-stone-800 border border-stone-700 font-sans font-medium text-[10px] uppercase tracking-wider text-stone-300 shadow-sm">TypeScript</span>
                </span>
            </div>
        </div>
    );
}


