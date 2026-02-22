"use client";

import SectionWrapper from "@/components/SectionWrapper";
import AnimatedCounter from "@/components/AnimatedCounter";
import { highlights } from "@/content/content";

export default function HighlightsSection() {
    return (
        <SectionWrapper id="highlights" className="!py-12 sm:!py-16 bg-warm-900 text-warm-50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {highlights.map((stat, i) => (
                    <div
                        key={i}
                        className="text-center p-6 rounded-2xl bg-warm-800/50 border border-warm-700/30 backdrop-blur-sm"
                    >
                        <div className="text-3xl sm:text-4xl font-bold text-accent mb-2">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-sm text-warm-400 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
