export default function Footer() {
    return (
        <footer className="relative bg-silva-green pt-24 pb-12 px-6 md:px-12 w-full text-silva-cream overflow-hidden">
            {/* Soft gradient background overlap */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 border-b border-silva-beige/10 pb-16">

                <div className="flex flex-col max-w-xs">
                    <h2 className="text-3xl font-light uppercase tracking-tighter mb-6 text-silva-beige">SilvaGrove</h2>
                    <p className="opacity-70 font-light leading-relaxed">
                        Cookies organik bebas gluten terbaik, terinspirasi oleh kekuatan alami pohon mangrove.
                    </p>
                </div>

                <div className="flex gap-16 md:gap-32 w-full md:w-auto">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-medium uppercase tracking-widest text-silva-brown mb-2 text-sm">Social</h4>

                        {/* GANTI LINK DI BAWAH INI DENGAN URL ASLI KAMU */}
                        <a
                            href="https://www.instagram.com/silva_grove"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-silva-beige hover:translate-x-1 transition-transform opacity-70 hover:opacity-100"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://www.tiktok.com/@silva_grove"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-silva-beige hover:translate-x-1 transition-transform opacity-70 hover:opacity-100"
                        >
                            TikTok
                        </a>

                        <a
                            href="https://shopee.co.id/silvagrove"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-silva-beige hover:translate-x-1 transition-transform opacity-70 hover:opacity-100"
                        >
                            Shopee
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-sm opacity-50 font-light">
                <p>© {new Date().getFullYear()} SilvaGrove. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-silva-beige">Privacy Policy</a>
                    <a href="#" className="hover:text-silva-beige">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}