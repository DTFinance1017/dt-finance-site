import { Navbar } from "@/components/Navbar";
import { QuemSomos as QuemSomosSection } from "@/components/QuemSomos";
import { ContextualCTA } from "@/components/ContextualCTA";
import { Footer } from "@/components/Footer";

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 lg:pt-[72px]">
        <QuemSomosSection />
        <ContextualCTA
          title="Conheça nosso time pessoalmente."
          subtitle="Agende uma conversa sem compromisso e veja como podemos trabalhar juntos."
        />
        <Footer />
      </div>
    </div>
  );
}
