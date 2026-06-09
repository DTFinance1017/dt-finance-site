import { useLocation } from "wouter";
import { Search, PenTool, Settings2, Compass, TrendingUp } from "lucide-react";

const NAVY = "#0D1F3C";
const GOLD = "#C9A84C";
const MUTED = "#5B6470";

const steps = [
  {
    num: "01",
    title: "Diagnosticar",
    icon: <Search size={22} />,
    description:
      "Mapeamento completo da empresa — financeiro, operacional, estrutural e estratégico. Identificamos os principais gargalos e oportunidades.",
  },
  {
    num: "02",
    title: "Desenhar",
    icon: <PenTool size={22} />,
    description:
      "Estruturação do plano de transformação com prioridades, metas, indicadores e cronograma executivo.",
  },
  {
    num: "03",
    title: "Desenvolver",
    icon: <Settings2 size={22} />,
    description:
      "Implementação das soluções: processos, governança, indicadores, controles financeiros e ferramentas de gestão.",
  },
  {
    num: "04",
    title: "Dirigir",
    icon: <Compass size={22} />,
    description:
      "Acompanhamento executivo contínuo: reuniões de gestão, monitoramento de KPIs e ajustes de rota em tempo real.",
  },
  {
    num: "05",
    title: "Dimensionar",
    icon: <TrendingUp size={22} />,
    description:
      "Preparação da empresa para o próximo nível de crescimento, com estrutura, pessoas, processos e capital alinhados.",
  },
];

export function MetodologiaSection({ showCta = true }: { showCta?: boolean }) {
  const [, navigate] = useLocation();

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#F7F4EE" }}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="eyebrow block mb-4">Metodologia</span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", color: NAVY }}
            className="text-3xl sm:text-4xl md:text-[46px] font-bold leading-[1.12] mb-5"
          >
            Método DT <span style={{ color: GOLD }}>5D's</span>
            <span style={{ color: GOLD, fontSize: "0.5em", verticalAlign: "super" }}>™</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: MUTED }}>
            Cinco etapas que transformam empresas dependentes de pessoas e planilhas em
            organizações orientadas por dados, processos e performance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* linha vertical conectando os marcadores */}
          <div
            className="absolute left-7 sm:left-8 top-8 bottom-8 w-[2px]"
            style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.6), rgba(201,168,76,0.12))" }}
          />

          <div className="space-y-5 sm:space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-5 sm:gap-7 group">
                {/* marcador */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #13294F, #0D1F3C)",
                      color: GOLD,
                      boxShadow: "0 8px 20px rgba(13,31,60,0.20)",
                      border: "1px solid rgba(201,168,76,0.25)",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* conteúdo em card */}
                <div
                  className="flex-1 min-w-0 rounded-2xl p-5 sm:p-6 transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(13,31,60,0.07)",
                    boxShadow: "0 2px 14px rgba(13,31,60,0.05)",
                  }}
                >
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }} className="text-base font-bold">
                      {step.num}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY }} className="text-lg sm:text-xl font-bold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {showCta && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => { navigate("/metodologia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-primary px-7 py-3.5 rounded-lg text-sm font-semibold"
            >
              Conhecer a Metodologia Completa
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
