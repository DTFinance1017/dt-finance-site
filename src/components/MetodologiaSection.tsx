import { useLocation } from "wouter";

const steps = [
  {
    num: "01",
    title: "Diagnosticar",
    description:
      "Mapeamento completo da empresa: financeiro, operacional, estrutural e estratégico. Identificação dos principais gargalos e oportunidades.",
  },
  {
    num: "02",
    title: "Desenhar",
    description:
      "Estruturação do plano de transformação com prioridades, metas, indicadores e cronograma executivo.",
  },
  {
    num: "03",
    title: "Desenvolver",
    description:
      "Implementação das soluções: processos, governança, indicadores, controles financeiros e ferramentas de gestão.",
  },
  {
    num: "04",
    title: "Dirigir",
    description:
      "Acompanhamento executivo contínuo, reuniões de gestão, monitoramento de KPIs e ajustes de rota em tempo real.",
  },
  {
    num: "05",
    title: "Dimensionar",
    description:
      "Preparação da empresa para o próximo nível de crescimento com estrutura, pessoas, processos e capital alinhados.",
  },
];

export function MetodologiaSection({ showCta = true }: { showCta?: boolean }) {
  const [, navigate] = useLocation();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#F7F4EE" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-16">
          <div>
            <span className="eyebrow block mb-5">Metodologia</span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
              className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2]"
            >
              Método DT 5D™
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed" style={{ color: "#5B6470" }}>
              Metodologia criada para transformar empresas dependentes de pessoas e planilhas em organizações orientadas por dados, processos e performance.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical decorativa */}
          <div
            className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex gap-8 sm:gap-12 pb-10 last:pb-0 group"
              >
                {/* Número / marcador */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300"
                    style={{
                      backgroundColor: "#F7F4EE",
                      borderColor: "rgba(201,168,76,0.4)",
                      color: "#C9A84C",
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="pb-2 pt-1">
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
                    className="text-xl font-bold mb-2"
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#5B6470" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA da seção */}
        {showCta && (
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => { navigate("/metodologia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-primary px-7 py-3.5 rounded-lg text-sm font-semibold"
          >
            Conhecer a Metodologia Completa
          </button>
          <span className="text-sm" style={{ color: "#5B6470" }}>
            Aplicada em empresas de R$ 2M a R$ 50M de faturamento
          </span>
        </div>
        )}

      </div>
    </section>
  );
}
