"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    { quote: "Lebih ringan di perut, nyaman dinikmati kapan saja." },
    { quote: "Rasa yang seimbang, tidak terlalu manis." },
    { quote: "Tekstur pas, tidak keras dan tidak mudah hancur." },
    { quote: "Pilihan camilan yang lebih mindful untuk gaya hidup sehari-hari." },
    { quote: "Renyah dan gurih, bikin nagih." },
    { quote: "Bahan alami terasa jelas, beda dari yang lain." },
    { quote: "Pas banget buat teman ngopi atau ngeteh." },
    { quote: "Kemasan praktis, mudah dibawa ke mana saja." },
    { quote: "Rasa autentik mangrove yang unik dan enak." },
];

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="relative z-10 bg-silva-green text-silva-beige h-[80vh] flex items-center justify-center overflow-hidden w-full px-6">

            {/* Background large quote mark */}
            <div className="absolute tracking-tighter text-[40vw] leading-none opacity-5 font-serif select-none pointer-events-none -top-1/4 left-0">
                "
            </div>

            <div className="max-w-5xl mx-auto w-full relative h-64 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="text-center absolute w-full"
                    >
                        <p className="text-3xl md:text-5xl font-light leading-tight tracking-tighter text-silva-cream">
                            "{testimonials[index].quote}"
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-2 uppercase tracking-widest text-sm text-silva-brown">
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className="w-12 h-[2px] bg-silva-beige/20 relative overflow-hidden focus:outline-none"
                        aria-label={`Go to testimonial ${i + 1}`}
                    >
                        {i === index && (
                            <motion.div
                                layoutId="active-indicator"
                                className="absolute inset-0 bg-silva-cream"
                                initial={{ originX: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
