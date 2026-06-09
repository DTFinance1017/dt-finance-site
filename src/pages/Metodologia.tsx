import { Navbar } from "@/components/Navbar";
import { MetodologiaSection } from "@/components/MetodologiaSection";
import { ContextualCTA } from "@/components/ContextualCTA";
import { Footer } from "@/components/Footer";

export default function Metodologia() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 lg:pt-[72px]">
        <MetodologiaSection showCta={false} />
        <ContextualCTA
          title="Veja como aplicamos essa metodologia na sua empresa."
          subtitle="Do diagnóstico ao acompanhamento contínuo — com método, dados e presença real."
        />
        <Footer />
      </div>
    </div>
  );
}
