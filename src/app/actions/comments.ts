"use server"

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 1. Daftar kata kasar 
const BANNED_WORDS = [
    "anjing", "babi", "bangsat", "kontol", "memek", "asuh", "pukimak",
    "slot", "gacor", "judi", "porn", "titit", "peli", "peler",
    "bacot", "sialan", "tolol", "goblok", "idiot", "bego", "setan",
    "pantek", "itil", "ngewe", "jablay", "lonte", "homo", "bencong",
    "perek", "bejat", "brengsek", "tai", "tempik", "anj", "anjay", "asu"
];

export async function submitComment(formData: FormData) {
    const name = (formData.get("name") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();
    const botTrap = formData.get("website");

    // SECURITY CHECK 1: Honeypot
    if (botTrap && botTrap.toString().length > 0) return { error: "Bot detected!" };

    // SECURITY CHECK 2: Validasi Kosong
    if (!name || !message) return { error: "Nama dan pesan jangan dikosongin ya!" };

    // SECURITY CHECK 3: Anti-XSS (Hapus tag HTML)
    const cleanName = name.replace(/[<>]/g, "");
    const cleanMessage = message.replace(/[<>]/g, "");

    // SECURITY CHECK 4: Filter Kata Kasar yang Lebih Akurat
    const combinedInput = (cleanName + " " + cleanMessage).toLowerCase();

    // Cek apakah ada kata di input yang cocok dengan daftar BANNED_WORDS
    const isToxic = BANNED_WORDS.some(word => {
        // Regex ini memastikan kita mencari "kata utuh" agar tidak salah blokir
        // misal: "bacot" kena, tapi "bacotan" juga kena.
        const regex = new RegExp(`\\b${word}\\b|${word}`, "i");
        return regex.test(combinedInput);
    });

    if (isToxic) {
        return { error: "Waduh, bahasanya dijaga ya! SilvaGrove itu tempat yang manis." };
    }

    // SECURITY CHECK 5: Panjang Karakter
    if (name.length > 50 || message.length > 300) return { error: "Input terlalu panjang!" };

    try {
        const { error } = await supabase
            .from('comments')
            .insert([{ name: cleanName, message: cleanMessage }]);

        if (error) throw error;

        revalidatePath("/");
        return { success: true };
    } catch (err) {
        return { error: "Gagal mengirim komentar. Coba lagi nanti." };
    }
}