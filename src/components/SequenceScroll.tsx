"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 240;

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [loadedImages, setLoadedImages] = useState(0);
    const [isPreloaded, setIsPreloaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Scroll mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        // For demonstration, we handle cases where images might not actually exist yet gracefully
        // by proceeding if they err.
        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/silvagrove-frame-${paddedIndex}.jpg`;

            const handleLoad = () => {
                loadedCount++;
                setLoadedImages(loadedCount);
                if (loadedCount === FRAME_COUNT) setIsPreloaded(true);
            };

            const handleError = () => {
                // Even if missing placeholder image, count as loaded so preloader doesn't hang infinitely
                loadedCount++;
                setLoadedImages(loadedCount);
                if (loadedCount === FRAME_COUNT) setIsPreloaded(true);
            };

            img.onload = handleLoad;
            img.onerror = handleError;
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    // Canvas drawing loop
    useEffect(() => {
        if (!isPreloaded) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            // Get exact integer frame map
            const currentIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(frameIndex.get()) - 1));
            const image = imagesRef.current[currentIndex];

            if (image && image.complete && image.naturalWidth > 0) {
                // High DPI scaling (retina display handling)
                const dpr = window.devicePixelRatio || 1;
                // Get display size (css pixels)
                const displayWidth = window.innerWidth;
                const displayHeight = window.innerHeight;

                // Set actual size in memory (scaled to account for extra pixel density)
                canvas.width = displayWidth * dpr;
                canvas.height = displayHeight * dpr;

                // Normalize coordinate system to use css pixels
                // This prevents the image from rendering tiny in corner if only canvas.width was scaled
                ctx.scale(dpr, dpr);

                // Object-cover behavior mathematical approach
                const imgAspect = image.naturalWidth / image.naturalHeight;
                const canvasAspect = displayWidth / displayHeight;

                let renderWidth = displayWidth;
                let renderHeight = displayHeight;
                let offsetX = 0;
                let offsetY = 0;

                if (imgAspect > canvasAspect) {
                    renderWidth = displayHeight * imgAspect;
                    offsetX = (displayWidth - renderWidth) / 2;
                } else {
                    renderHeight = displayWidth / imgAspect;
                    offsetY = (displayHeight - renderHeight) / 2;
                }

                // Explicitly pass image smoothing preferences for HD 
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";

                // We draw in CSS pixels width/height because we already ctx.scale(dpr, dpr)
                ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
            } else {
                // Fallback drawing if image missing
                const dpr = window.devicePixelRatio || 1;
                const displayWidth = window.innerWidth;
                const displayHeight = window.innerHeight;

                canvas.width = displayWidth * dpr;
                canvas.height = displayHeight * dpr;
                ctx.scale(dpr, dpr);

                ctx.fillStyle = "#0F2E24";
                ctx.fillRect(0, 0, displayWidth, displayHeight);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPreloaded, frameIndex]);

    // Handle window resize scaling on canvas (redundant but nice constraint)
    useEffect(() => {
        const handleResize = () => {
            // Force an update to frameIndex so render triggers natively on resize
            // Though our RAF loop handles this anyway.
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Text overlay opacities and translates
    const opacity0 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [1, 1, 0, 0]);
    const y0 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    const opacity30 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y30 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [50, 0, -50]);

    const opacity60 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const y60 = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [50, 0, -50]);

    const opacity90 = useTransform(scrollYProgress, [0.8, 0.9, 0.95, 1], [0, 1, 1, 1]);
    const y90 = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[400vh] bg-silva-green">

            {/* Loading Screen */}
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-silva-green text-silva-cream"
                animate={{ opacity: isPreloaded ? 0 : 1, pointerEvents: isPreloaded ? "none" : "auto" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }} />
                <div className="flex flex-col items-center gap-4">
                    <div className="text-xl tracking-[0.2em] uppercase opacity-70">Loading Experience</div>
                    <div className="text-6xl font-light">{Math.round((loadedImages / FRAME_COUNT) * 100)}%</div>
                    <div className="w-48 h-[1px] bg-silva-cream/20 relative mt-4">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-silva-cream"
                            animate={{ width: `${(loadedImages / FRAME_COUNT) * 100}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Sticky Canvas */}
            <div className="sticky top-0 w-full h-screen overflow-hidden text-silva-beige">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />

                {/* Shadow overlays for blending edges */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-silva-green/50 via-transparent to-silva-green/50" />

                {/* 0% Text Block */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-6"
                    style={{ opacity: opacity0, y: y0 }}
                >
                    <h1 className="text-6xl md:text-9xl font-light tracking-tighter uppercase leading-none drop-shadow-2xl text-silva-cream">
                        SilvaGrove
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl font-light tracking-widest uppercase opacity-90 text-silva-beige drop-shadow-md">
                        Healthy Cookies, Yummy Approved
                    </p>
                </motion.div>

                {/* 30% Text Block */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-start justify-center text-left pointer-events-none p-10 md:p-24"
                    style={{ opacity: opacity30, y: y30 }}
                >
                    <h2 className="text-5xl md:text-8xl font-light max-w-4xl tracking-tighter uppercase leading-tight drop-shadow-xl text-silva-cream">
                        Terbuat dari Tepung<br /><span className="italic text-silva-beige">Buah Mangrove</span>
                    </h2>
                </motion.div>

                {/* 60% Text Block */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-end justify-center text-right pointer-events-none p-10 md:p-24"
                    style={{ opacity: opacity60, y: y60 }}
                >
                    <h2 className="text-5xl md:text-8xl font-light max-w-4xl tracking-tighter uppercase leading-tight drop-shadow-xl text-silva-cream">
                        Gluten-free<br /><span className="text-silva-beige italic">Healthy Cookies</span>
                    </h2>
                </motion.div>

                {/* 90% Text Block (CTA) */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-auto p-6"
                    style={{ opacity: opacity90, y: y90 }}
                >
                </motion.div>

            </div>
        </div>
    );
}
