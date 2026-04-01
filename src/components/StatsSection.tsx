"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { submitComment } from "@/app/actions/comments";

export default function StatsSection() {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setComments(data);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim() || isLoading) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", userName);
        formData.append("message", newComment);
        formData.append("website", "");

        const result = await submitComment(formData);

        if (result.success) {
            await fetchComments();
            setNewComment("");
            setUserName("");
        } else {
            alert(result.error);
        }
        setIsLoading(false);
    };

    return (
        <section className="relative z-10 bg-silva-beige text-silva-green py-24 px-6 md:px-16 w-full overflow-hidden border-y border-silva-green/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* 1. KIRI: JUDUL (DIBUAT RATA ATAS SEMPURNA) */}
                <div className="md:col-span-3">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="pt-0" // Memastikan tidak ada padding atas
                    >
                        <h2 className="text-5xl md:text-6xl font-light tracking-tighter leading-[1.1] uppercase">
                            Apa Kata <br /> <span className="italic">Mereka?</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-silva-green mt-6 opacity-40" />
                        <p className="text-xs uppercase tracking-[0.3em] mt-6 opacity-60 leading-relaxed">
                            Suara dari para penikmat <br /> kebaikan alam SilvaGrove.
                        </p>
                    </motion.div>
                </div>

                {/* 2. TENGAH: FORM INPUT */}
                <div className="md:col-span-4 bg-silva-green/5 p-8 border border-silva-green/5 rounded-sm shadow-sm">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] mb-6 font-bold opacity-80 text-center">Tulis Pengalamanmu</h3>
                    <form onSubmit={handleSend} className="flex flex-col gap-5">
                        <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        <input
                            type="text"
                            placeholder="Nama kamu"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-transparent border-b border-silva-green/20 py-2 outline-none text-sm focus:border-silva-green transition-all placeholder:text-silva-green/30"
                            disabled={isLoading}
                            maxLength={50}
                        />
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ceritakan rasa kukis kami..."
                            className="w-full bg-transparent border-b border-silva-green/20 py-2 outline-none resize-none h-24 text-sm focus:border-silva-green transition-all placeholder:text-silva-green/30"
                            disabled={isLoading}
                            maxLength={300}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mt-2 w-full py-3 bg-silva-green text-silva-beige text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? "Mengirim..." : "Kirim Komentar"}
                        </button>
                    </form>
                </div>

                {/* 3. KANAN: DISPLAY KOMENTAR */}
                <div className="md:col-span-5 flex flex-col gap-6">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Komentar Terbaru</h3>
                    <div className="h-[350px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-silva-green/20 scrollbar-track-transparent">
                        <AnimatePresence initial={false}>
                            {comments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="border-b border-silva-green/5 pb-4"
                                >
                                    <p className="text-sm md:text-base font-light leading-relaxed italic text-silva-green/90">
                                        "{comment.message}"
                                    </p>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-[10px] uppercase tracking-widest font-bold">— {comment.name}</span>
                                        <span className="text-[9px] opacity-40 italic">
                                            {new Date(comment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {comments.length === 0 && !isLoading && (
                            <p className="text-xs opacity-40 italic text-center py-10">Belum ada komentar.</p>
                        )}
                    </div>
                    <div className="h-10 w-full bg-gradient-to-t from-silva-beige to-transparent -mt-10 pointer-events-none sticky bottom-0" />
                </div>

            </div>
        </section>
    );
}