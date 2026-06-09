import { Navbar }            from "@/components/Navbar";
import { Hero }              from "@/components/Hero";
import { DorSection }        from "@/components/DorSection";
import { QuemSomosSection }  from "@/components/QuemSomosSection";
import { Pilares }           from "@/components/Pilares";
import { SolucoesSection }   from "@/components/SolucoesSection";
import { Segmentos }         from "@/components/Segmentos";
import { DiferencialSection } from "@/components/DiferencialSection";
import { CTAFinal }          from "@/components/CTAFinal";
import { Footer }            from "@/components/Footer";
import { WhatsAppFloat }     from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <Hero />
      <DorSection />
      <QuemSomosSection />
      <Pilares />
      <SolucoesSection />
      <Segmentos />
      <DiferencialSection />
      <CTAFinal />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
