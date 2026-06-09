import { Navbar }            from "@/components/Navbar";
import { QuemSomosSection }  from "@/components/QuemSomosSection";
import { Pilares }           from "@/components/Pilares";
import { QuemSomos as Fundadores } from "@/components/QuemSomos";
import { DiferencialSection } from "@/components/DiferencialSection";
import { ContextualCTA }     from "@/components/ContextualCTA";
import { Footer }            from "@/components/Footer";

// /sobre — Quem somos, pilares, fundadores e diferenciais num só lugar.
export default function Sobre() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <div className="pt-[68px] lg:pt-[76px]">
        <QuemSomosSection />
        <Pilares />
        <Fundadores />
        <DiferencialSection />
        <ContextualCTA
          title="Vamos conversar sobre o próximo nível da sua empresa."
          subtitle="Agende um diagnóstico sem compromisso e veja como podemos trabalhar juntos."
        />
        <Footer />
      </div>
    </div>
  );
}
