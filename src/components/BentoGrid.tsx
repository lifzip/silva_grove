"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const ingredients = [
    {
        title: "Buah Mangrove Lindur",
        description: "Dipetik langsung dari ekosistem mangrove yang terjaga.",
        image: "https://mangrovemagz.com/wp-content/uploads/2017/04/Buah2-1.jpg",
        color: "from-black/80 via-black/20 to-transparent", // Gradient lebih gelap di bawah
        span: "md:col-span-2 md:row-span-2"
    },
    {
        title: "Tepung Buah Lindur",
        description: "100% Bebas gluten dengan tekstur yang unik.",
        image: "https://worldseedsupply.com/wp-content/uploads/1970/01/IMG_12931-1024x768.jpg",
        color: "from-black/80 via-black/20 to-transparent",
        span: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Cookies",
        description: "Hasil panggangan sempurna dengan rasa mewah.",
        image: "/Cookies.jpeg",
        color: "from-black/80 via-black/20 to-transparent",
        span: "md:col-span-1 md:row-span-2"
    },
    {
        title: "Kacang-kacangan",
        description: "Kombinasi tekstur renyah yang seimbang.",
        image: "https://images.ctfassets.net/90pc6zknij8o/59qps9gkBkgwbe6I2BBlHL/5b3b3f098a92e5b3b10e0c2cfd816912/Vegan_Bodybuilding_Diet_-_maksim-shutov-pUa1On18Jno-unsplash.jpg?w=1280&h=841&q=50&fit=fill&f=faces",
        color: "from-black/80 via-black/20 to-transparent",
        span: "md:col-span-1 md:row-span-1"
    },
];

export default function BentoGrid() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            id="ingredients"
            className="relative z-10 w-full bg-silva-green text-silva-cream py-24 px-6 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <h3 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Bahan Utama</h3>
                    <p className="mt-4 text-xl text-silva-beige opacity-80 max-w-xl">
                        Buah lindur dipilih karena secara alami tinggi karbohidrat,
                        kaya antioksidan, gluten-free, dan ramah lingkungan.
                    </p>
                </div>

                <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
                    {ingredients.map((item, idx) => (
                        <BentoCard key={idx} {...item} index={idx} progress={scrollYProgress} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

interface BentoCardProps {
    title: string;
    description: string;
    image: string;
    color: string;
    span: string;
    index: number;
    progress: MotionValue<number>;
}

const BentoCard = ({ title, description, image, color, span, index, progress }: BentoCardProps) => {
    const yOffset = useTransform(progress, [0, 1], [50 * (index % 2 === 0 ? 1 : -1), -50 * (index % 2 === 0 ? 1 : -1)]);

    return (
        <motion.div
            style={{ y: yOffset }}
            whileHover={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-end group cursor-pointer bg-neutral-900 border border-silva-beige/10 ${span}`}
        >
            {/* TAG GAMBAR */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* OVERLAY GRADIENT - Diperkuat supaya teks putih aman */}
            <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-90 transition-opacity duration-700`} />

            <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out text-left">
                <h4 className="text-xl md:text-3xl font-light tracking-tight mb-2 text-white leading-none">
                    {title}
                </h4>
                <p className="text-silva-beige text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light max-w-[250px] leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Buletan (Decorative Parallax Element) sudah dihapus dari sini */}
        </motion.div>
    );
};