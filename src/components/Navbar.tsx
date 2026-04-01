"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navLinks = [
    { title: "Home", href: "/" },
    { title: "Story", href: "#story" },
    { title: "Ingredients", href: "#ingredients" },
    { title: "Varian", href: "#varian" },
];

// Data Sosial Media & Kontak
const socials = [
    { name: "Instagram", href: "https://www.instagram.com/silva_grove" },
    { name: "TikTok", href: "https://www.tiktok.com/@silva_grove" },
    { name: "Shopee", href: "https://shopee.co.id/silvagrove" },
];

const contact = {
    email: "silvagrove.n1@gmail.com",
    phone: "+62 857 3834 5265",
    waLink: "https://wa.me/6285738345265"
};

const menuVariants = {
    initial: { y: "-100%" },
    animate: {
        y: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 },
    },
};

const linkVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.1 * i + 0.3 },
    }),
    exit: (i: number) => ({
        y: "100%",
        opacity: 0,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const, delay: 0.05 * i },
    }),
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk menutup menu saat link diklik
    const handleClose = () => setIsOpen(false);

    return (
        <>
            {/* Navigasi Utama (Bar Atas) */}
            <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-silva-cream mix-blend-difference">
                <div className="text-2xl font-semibold tracking-tighter uppercase select-none cursor-pointer">
                    SilvaGrove
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex flex-col gap-[6px] p-2 focus:outline-none overflow-hidden"
                    aria-label="Toggle menu"
                >
                    <div
                        className={clsx(
                            "h-[2px] w-8 bg-current transition-transform duration-500 ease-in-out",
                            isOpen ? "rotate-45 translate-y-[8px]" : ""
                        )}
                    />
                    <div
                        className={clsx(
                            "h-[2px] w-8 bg-current transition-transform duration-500 ease-in-out",
                            isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                        )}
                    />
                </button>
            </nav>

            {/* Overlay Menu Fullscreen */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 z-40 bg-silva-green text-silva-beige flex flex-col justify-between overflow-hidden"
                    >
                        {/* Soft grain texture overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }} />

                        {/* List Link Navigasi */}
                        <div className="flex-1 flex flex-col justify-center px-10 md:px-24">
                            <ul className="space-y-4 md:space-y-8">
                                {navLinks.map((link, i) => (
                                    <li key={link.title} className="overflow-hidden">
                                        <motion.a
                                            href={link.href}
                                            custom={i}
                                            variants={linkVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            onClick={handleClose}
                                            className="block text-2xl md:text-5xl font-light tracking-tighter uppercase cursor-pointer hover:italic transition-all duration-300 relative group"
                                        >
                                            <span className="relative z-10 inline-block">{link.title}</span>
                                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-silva-beige transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bagian Bawah: Kontak & Sosmed */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 1 } }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}
                            className="px-10 md:px-24 pb-12 flex flex-col md:flex-row justify-between items-end gap-8"
                        >
                            {/* Kontak Langsung */}
                            <div className="flex flex-col gap-2 text-sm md:text-base">
                                <a href={`mailto:${contact.email}`} className="text-silva-cream opacity-70 hover:opacity-100 hover:underline transition-all">
                                    Email: {contact.email}
                                </a>
                                <a href={contact.waLink} target="_blank" rel="noopener noreferrer" className="text-silva-cream opacity-70 hover:opacity-100 hover:underline transition-all">
                                    WhatsApp: {contact.phone}
                                </a>
                            </div>

                            {/* List Sosial Media */}
                            <ul className="flex gap-8 text-sm md:text-base uppercase tracking-widest font-medium">
                                {socials.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-silva-cream transition-colors relative group"
                                        >
                                            {social.name}
                                            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}