import { useModal } from "@/context/ModalContext";
import { FadeIn } from "./FadeIn";

interface Props {
  title: string;
  subtitle: string;
}

export function ContextualCTA({ title, subtitle }: Props) {
  const { openModal } = useModal();

  return (
    <section
      className="py-20 md:py-24 relative"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(27,65,88,0.06)",
      }}
    >
      <FadeIn className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-6">
          PRÓXIMO PASSO
        </div>

        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-3xl sm:text-4xl font-bold text-[#1B4158] mb-4 max-w-2xl mx-auto leading-tight"
        >
          {title}
        </h2>

        <p className="text-[#1B4158]/75 text-base sm:text-lg font-light max-w-md mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        <button
          onClick={() => openModal()}
          className="btn-gold px-10 py-4 rounded-xl text-sm font-bold tracking-wide"
        >
          Agendar diagnóstico gratuito →
        </button>

        <p className="mt-4 text-xs text-[#1B4158]/27">Sem compromisso · Diagnóstico gratuito</p>
      </FadeIn>
    </section>
  );
}
