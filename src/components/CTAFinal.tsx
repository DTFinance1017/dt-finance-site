import { useModal } from "@/context/ModalContext";

export function CTAFinal() {
  const { openModal } = useModal();

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#0D1F3C" }}
    >
      {/* Ornamento de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Eyebrow */}
        <span className="eyebrow block mb-6">Próximo Passo</span>

        {/* Título */}
        <h2
          style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] mb-6 max-w-3xl mx-auto"
        >
          Sua empresa está preparada para o próximo nível?
        </h2>

        {/* Subtítulo */}
        <p
          className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "#C7D2E2" }}
        >
          Agende um diagnóstico e descubra os principais gargalos e oportunidades de crescimento do seu negócio.
        </p>

        {/* Botão */}
        <button
          onClick={() => openModal()}
          className="btn-primary px-10 py-4 rounded-lg text-base font-semibold"
        >
          Agendar Diagnóstico
        </button>

        {/* Nota */}
        <p className="mt-5 text-xs" style={{ color: "rgba(199,210,226,0.35)" }}>
          Gratuito · Sem compromisso · Retorno em até 24h
        </p>

        {/* Divider decorativo */}
        <div
          className="flex items-center justify-center gap-4 mt-14 pt-14 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="gold-line" />
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(199,210,226,0.35)" }}>
            DT Finance — Estruturação Empresarial &amp; Inteligência Financeira
          </span>
          <span className="gold-line" />
        </div>

      </div>
    </section>
  );
}
