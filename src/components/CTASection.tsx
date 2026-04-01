"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTASection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
    const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);

    return (
        <section
            ref={containerRef}
            className="relative z-10 bg-silva-green text-silva-cream py-40 overflow-hidden min-h-[80vh] flex items-center justify-center w-full"
        >
            {/* Particles */}
            <Particles />

            <motion.div
                style={{ y, scale }}
                className="relative z-20 text-center flex flex-col items-center"
            >
                <h2 className="text-6xl md:text-8xl font-light tracking-tighter uppercase leading-none drop-shadow-2xl">
                    Taste <br />
                    <span className="text-silva-beige italic">The Grove</span>
                </h2>

                <p className="mt-8 text-xl font-light opacity-80 max-w-md text-silva-cream">
                    Nikmati kemurnian bahan-bahan alami. Perjalanan Anda menuju kemewahan organik dimulai di sini.
                </p>

                {/* ✅ BUTTON CLICKABLE */}
                <MagneticButton
                    onClick={() =>
                        window.open("https://s.id/silva_grove", "_blank")
                    }
                >
                    <span className="relative z-10 font-bold uppercase tracking-widest text-sm">
                        Shop Now
                    </span>
                    <div className="absolute inset-0 bg-silva-beige rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center z-0" />
                </MagneticButton>
            </motion.div>
        </section>
    );
}

const MagneticButton = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();

        if (!rect) return;

        const x = clientX - (rect.left + rect.width / 2);
        const y = clientY - (rect.top + rect.height / 2);

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x * 0.3,
                y: position.y * 0.3,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className="z-50 cursor-pointer group relative mt-16 px-12 py-5 border border-silva-beige/30 text-silva-beige flex items-center justify-center rounded-full overflow-hidden hover:text-silva-green transition-colors duration-500"
        >
            {children}
        </motion.div>
    );
};

const Particles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-silva-beige rounded-full"
                    initial={{
                        x:
                            Math.random() *
                            (typeof window !== "undefined"
                                ? window.innerWidth
                                : 1000),
                        y:
                            Math.random() *
                            (typeof window !== "undefined"
                                ? window.innerHeight
                                : 1000),
                    }}
                    animate={{
                        y: [null, Math.random() * -200 - 100],
                        x: [null, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};