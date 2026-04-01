import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import TextReveal from "@/components/TextReveal";
import BentoGrid from "@/components/BentoGrid";
import VarianSection from "@/components/VarianSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-silva-green font-sans selection:bg-silva-beige selection:text-silva-green">
      <Navbar />

      {/* Hero Section Canvas Sequence Lock */}
      <SequenceScroll />

      {/* Wrapping the rest in negative margin so they slide cleanly over the locked hero */}
      <TextReveal />
      <BentoGrid />
      <VarianSection />
      <StatsSection />
      <TestimonialSlider />
      <CTASection />
      <Footer />
    </main>
  );
}
