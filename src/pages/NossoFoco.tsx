import { Navbar } from "@/components/Navbar";
import { Foco } from "@/components/Foco";
import { GanhosPraticos } from "@/components/GanhosPraticos";
import { CasoIlustrativo } from "@/components/CasoIlustrativo";
import { ContextualCTA } from "@/components/ContextualCTA";
import { Footer } from "@/components/Footer";

export default function NossoFoco() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 lg:pt-[72px]">
        <Foco />
        <GanhosPraticos />
        <CasoIlustrativo />
        <ContextualCTA
          title="Sua empresa está no nosso foco. Vamos conversar?"
          subtitle="Agende um diagnóstico gratuito e veja como podemos transformar sua gestão financeira."
        />
        <Footer />
      </div>
    </div>
  );
}
