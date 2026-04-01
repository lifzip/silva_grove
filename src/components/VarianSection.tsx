"use client";

import { motion } from "framer-motion";

const variants = [
    {
        name: "Original nuts and dried fruits",
        desc: "Renyahnya aneka kacang dan kesegaran buah kering dalam adonan lindur yang autentik.",
        image: "/Ori.jpeg",
    },
    {
        name: "Chocholate choco",
        desc: "Double chocolate yang melimpah, memberikan rasa cokelat pekat yang mewah di setiap gigitan.",
        image: "/Coklat.jpeg",
    },
    {
        name: "Matcha Cheese",
        desc: "Kombinasi unik teh hijau premium dengan gurihnya keju yang lumer dan bikin ketagihan.",
        image: "/Matcha.jpeg",
    }
];

export default function VarianSection() {
    return (
        <section className="py-24 bg-silva-green text-silva-beige">
            <div className="max-w-6xl mx-auto px-8 md:px-16">

                {/* Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-60 font-bold">The Signature Collection</h3>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">
                            Tiga <span className="italic uppercase">Karakter</span> Rasa
                        </h2>
                    </motion.div>
                </div>

                {/* Grid Varian */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {variants.map((variant, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            {/* Frame Gambar 1:1 */}
                            <div className="relative overflow-hidden rounded-2xl aspect-square mb-6 bg-neutral-900 shadow-xl">
                                <img
                                    src={variant.image}
                                    alt={variant.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay tipis agar gambar terlihat lebih menyatu dengan web */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Penjelasan di Bawah Gambar */}
                            <div className="space-y-3">
                                <h4 className="text-lg md:text-xl font-medium tracking-tight text-white group-hover:text-silva-beige transition-colors duration-300">
                                    {variant.name}
                                </h4>
                                <p className="text-sm opacity-60 leading-relaxed font-light">
                                    {variant.desc}
                                </p>
                                <div className="w-8 h-[1px] bg-white/20 group-hover:w-full transition-all duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto mt-20 text-center text-xs opacity-40 leading-relaxed font-light italic"
                >
                    "Dibuat khusus untuk Anda yang menghargai kebaikan bahan alami dari ekosistem mangrove yang terjaga."
                </motion.p>
            </div>
        </section>
    );
}