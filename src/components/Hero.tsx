import { useModal } from "@/context/ModalContext";
import { useLocation } from "wouter";

const stats = [
  { value: "+15 anos",       label: "de experiência no mercado" },
  { value: "R$ 2M – 50M",    label: "faturamento dos clientes" },
  { value: "Método DT 5D's™",  label: "metodologia proprietária" },
];

export function Hero() {
  const { openModal } = useModal();
  const [, navigate]  = useLocation();

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}
    >
      {/* Brilho dourado sutil no topo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 58%)",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 w-full pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-15rem)] justify-center">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 animate-fade-in"
            style={{ borderColor: "rgba(168,137,58,0.45)", color: "#A8893A" }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase">
              Estruturação Empresarial &amp; Inteligência Financeira
            </span>
          </div>

          {/* Título */}
          <h1
            style={{ fontFamily: "'Playfair Display', serif", color: "#1B4158" }}
            className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold leading-[1.1] mb-6 animate-fade-in max-w-4xl"
          >
            Estruturamos empresas para crescer com{" "}
            <span style={{ color: "#A8893A" }}>previsibilidade</span>{" "}
            e geração de valor.
          </h1>

          {/* Subtítulo */}
          <p
            className="text-lg leading-relaxed mb-9 max-w-xl animate-fade-in"
            style={{ color: "rgba(27,65,88,0.70)" }}
          >
            Governança, Processos, Performance e Inteligência Financeira para empresas em crescimento.
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
            <button
              onClick={() => openModal()}
              className="btn-primary px-7 py-4 rounded-lg text-sm font-semibold"
            >
              Agendar Diagnóstico
            </button>
            <button
              onClick={() => { navigate("/metodologia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-outline-blue px-7 py-4 rounded-lg text-sm"
            >
              Conhecer a Metodologia
            </button>
          </div>

          {/* Nota */}
          <p className="mt-5 text-xs animate-fade-in" style={{ color: "rgba(27,65,88,0.42)" }}>
            Sem compromisso · Diagnóstico gratuito · Retorno em até 24h
          </p>

          {/* Stats — distribuídos e centralizados */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-14 mt-14 pt-10 border-t animate-fade-in w-full max-w-2xl"
            style={{ borderColor: "rgba(27,65,88,0.12)" }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <div
                  style={{ fontFamily: "'Playfair Display', serif", color: "#1B4158" }}
                  className="text-xl font-bold leading-tight"
                >
                  {s.value}
                </div>
                <div className="text-[11px] mt-1 leading-snug" style={{ color: "rgba(27,65,88,0.55)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
