import { Building2, GitBranch, BarChart3, Brain } from "lucide-react";

const pilares = [
  {
    icon: Building2,
    title: "Governança",
    description:
      "Estrutura de decisão, definição de papéis, responsabilidades e gestão estratégica alinhada aos objetivos do negócio.",
  },
  {
    icon: GitBranch,
    title: "Processos",
    description:
      "Mapeamento, padronização e melhoria contínua dos processos operacionais para máxima eficiência e escalabilidade.",
  },
  {
    icon: BarChart3,
    title: "Performance",
    description:
      "Definição e acompanhamento de indicadores, metas e resultados para garantir que a empresa avance na direção certa.",
  },
  {
    icon: Brain,
    title: "Inteligência Financeira",
    description:
      "Controle financeiro, previsibilidade, gestão do fluxo de caixa e geração de valor sustentável para os sócios.",
  },
];

export function Pilares() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow block mb-5">Nossa Abordagem</span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
            className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2]"
          >
            Os pilares da transformação empresarial.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilares.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="service-card rounded-xl p-8 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(13,31,60,0.08)",
                }}
              >
                {/* Número decorativo */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "rgba(201,168,76,0.18)",
                    fontSize: "3rem",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                  className="mb-4 select-none"
                >
                  0{i + 1}
                </div>

                {/* Ícone */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,168,76,0.10)" }}
                >
                  <Icon size={20} style={{ color: "#C9A84C" }} />
                </div>

                <h3
                  style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
                  className="text-lg font-bold mb-3"
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
