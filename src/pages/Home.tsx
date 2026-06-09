import { Navbar }         from "@/components/Navbar";
import { Hero }           from "@/components/Hero";
import { DorSection }     from "@/components/DorSection";
import { SolucoesSection } from "@/components/SolucoesSection";
import { CTAFinal }       from "@/components/CTAFinal";
import { Footer }         from "@/components/Footer";

// Home = hub enxuto: proposta de valor (Hero) -> o problema (Dor) ->
// resumo das soluções (-> /solucoes) -> CTA. Sem aprofundar conteúdo
// que vive nas páginas dedicadas (/sobre, /solucoes, /metodologia).
export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <Hero />
      <DorSection />
      <SolucoesSection />
      <CTAFinal />
      <Footer />
    </div>
  );
}
