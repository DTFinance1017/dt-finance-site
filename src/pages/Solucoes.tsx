import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { ForWhom } from "@/components/ForWhom";
import { ChecklistDownload } from "@/components/ChecklistDownload";
import { ContextualCTA } from "@/components/ContextualCTA";
import { Footer } from "@/components/Footer";

export default function Solucoes() {
  return (
    <div className="min-h-screen bg-[#0d0d12]">
      <Navbar />
      <div className="pt-16 lg:pt-[72px]">
        <Services />
        <ForWhom />
        <ChecklistDownload />
        <ContextualCTA
          title="Descubra qual solução faz sentido para o seu momento."
          subtitle="Cada empresa tem um estágio diferente. Vamos entender o seu e montar o plano certo."
        />
        <Footer />
      </div>
    </div>
  );
}
