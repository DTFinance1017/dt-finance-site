import { FadeIn } from "./FadeIn";
import { Target, TrendingUp, ShieldCheck, Gauge } from "lucide-react";

const pilares = [
  {
    icon: <Gauge size={20} />,
    title: "Previsibilidade",
    description: "Projeção de caixa para 30, 60 e 90 dias. Chega de gerir no escuro — você antecipa problemas antes que apareçam.",
    color: "#7099e8",
    glow: "rgba(112,153,232,0.15)",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Controle",
    description: "Plano de contas gerencial, DRE por centro de custo e rotinas financeiras que funcionam. Clareza total nos números.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Lucratividade",
    description: "Receita não é lucro. Identificamos onde a margem é consumida e mostramos o que mudar para recuperá-la.",
    color: "#f0c040",
    glow: "rgba(240,192,64,0.15)",
  },
  {
    icon: <Target size={20} />,
    title: "Escala Sustentável",
    description: "Crescer sem estrutura financeira quebra empresa. Com dados organizados, cada decisão de expansão é fundamentada.",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.15)",
  },
];

export function Foco() {
  return (
    <section
      id="foco"
      className="py-24 relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">

        <FadeIn className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-5">
            NOSSO FOCO E OBJETIVO
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4158] mb-5 leading-tight"
          >
            Estrutura financeira real.<br />
            <span className="gradient-text">Para crescer com controle,</span><br />
            não por acaso.
          </h2>
          <p className="text-[#1B4158]/65 text-base leading-relaxed max-w-2xl mx-auto">
            A maioria das PMEs cresce sem estrutura financeira proporcional — processos manuais, planilhas dispersas, sem previsibilidade. Ajudamos empresas a mudar isso de forma sistemática: com método, automação e presença executiva contínua.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div
            className="w-full rounded-2xl p-8 sm:p-10 mb-14 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(240,192,64,0.06) 0%, rgba(59,130,246,0.06) 100%)",
              border: "1px solid rgba(240,192,64,0.15)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(240,192,64,0.12)", border: "1px solid rgba(240,192,64,0.25)" }}
              >
                <Target size={24} className="text-[#f0c040]" />
              </div>
              <div>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-xl sm:text-2xl font-bold text-[#1B4158] mb-1"
                >
                  Uma PME organizada financeiramente cresce com intenção — não por sorte.
                </p>
                <p className="text-[#1B4158]/55 text-sm">
                  A DT Finance entrega processos definidos, relatórios executivos e presença estratégica contínua — para que cada decisão de negócio tenha base sólida.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pilares.map((pilar, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="flex flex-col p-6 rounded-2xl h-full"
                style={{
                  background: "#f5f7f9",
                  border: "1px solid rgba(27,65,88,0.08)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-[#1B4158]/4 text-[#1B4158]/50"
                >
                  {pilar.icon}
                </div>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-lg font-bold mb-3 text-[#1B4158]"
                >
                  {pilar.title}
                </h3>
                <p className="text-sm text-[#1B4158]/60 leading-relaxed">{pilar.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
