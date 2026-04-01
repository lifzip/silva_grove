"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

const words = "Dibuat dari buah mangrove lindur pilihan, 100% organik, dan bebas gluten. Seperti pohon mangrove yang kokoh, cookies ini lahir dari keberlanjutan, dinikmati dengan hati.".split(" ");

export default function TextReveal() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"],
    });

    return (
        <section
            ref={containerRef}
            id="story"
            className="relative z-10 -mt-[100vh] min-h-[150vh] bg-silva-green flex items-center justify-center p-6 md:p-24"
        >
            <div className="max-w-6xl mx-auto w-full flex flex-wrap gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4">
                {words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + (1 / words.length);
                    return (
                        <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
                    );
                })}
            </div>
        </section>
    );
}

const Word = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
    const characters = word.split("");
    const amount = range[1] - range[0];
    const step = amount / word.length;

    return (
        <span className="relative flex text-5xl md:text-8xl font-light text-silva-cream/20 uppercase tracking-tighter">
            {characters.map((char, i) => {
                const start = range[0] + (i * step);
                const end = range[0] + ((i + 1) * step);
                return <Char key={i} char={char} progress={progress} range={[start, end]} />;
            })}
        </span>
    );
};

const Char = ({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative whitespace-pre">
            <span className="absolute opacity-0">{char}</span>
            <motion.span style={{ opacity }} className="text-silva-cream">
                {char}
            </motion.span>
        </span>
    );
};
