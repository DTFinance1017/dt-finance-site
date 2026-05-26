import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DorSection } from "@/components/DorSection";
import { AntesDepois } from "@/components/AntesDepois";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <DorSection />
      <AntesDepois />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
