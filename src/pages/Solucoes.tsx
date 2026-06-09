import { Navbar }          from "@/components/Navbar";
import { SolucoesSection } from "@/components/SolucoesSection";
import { Segmentos }       from "@/components/Segmentos";
import { ForWhom }         from "@/components/ForWhom";
import { ContextualCTA }   from "@/components/ContextualCTA";
import { Footer }          from "@/components/Footer";

// /solucoes — as 6 soluções detalhadas + segmentos atendidos + para quem é.
export default function Solucoes() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <div className="pt-[68px] lg:pt-[76px]">
        <SolucoesSection />
        <Segmentos />
        <ForWhom />
        <ContextualCTA
          title="Descubra qual solução faz sentido para o seu momento."
          subtitle="Cada empresa tem um estágio diferente. Vamos entender o seu e montar o plano certo."
        />
        <Footer />
      </div>
    </div>
  );
}
