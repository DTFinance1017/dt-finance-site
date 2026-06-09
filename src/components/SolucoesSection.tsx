import { useModal } from "@/context/ModalContext";
import {
  Search,
  TrendingUp,
  ShieldCheck,
  Workflow,
  BarChart2,
  Rocket,
} from "lucide-react";

const solucoes = [
  {
    icon: Search,
    title: "Diagnóstico Empresarial",
    description:
      "Mapeamento completo da empresa: financeiro, operacional e estratégico. Identificação de gargalos, riscos e oportunidades de melhoria.",
  },
  {
    icon: TrendingUp,
    title: "CFO as a Service",
    description:
      "Gestão financeira estratégica com presença executiva contínua. DRE gerencial, fluxo de caixa, indicadores e acompanhamento mensal.",
  },
  {
    icon: ShieldCheck,
    title: "Governança Empresarial",
    description:
      "Estruturação da gestão, definição de papéis, responsabilidades e modelo de tomada de decisão alinhado com os objetivos do negócio.",
  },
  {
    icon: Workflow,
    title: "Processos e Eficiência",
    description:
      "Mapeamento, padronização e melhoria dos processos operacionais. Eliminação de retrabalho e construção de operação escalável.",
  },
  {
    icon: BarChart2,
    title: "Indicadores e BI",
    description:
      "Implantação de dashboards executivos, KPIs relevantes e rotina de análise de resultados para decisões baseadas em dados.",
  },
  {
    icon: Rocket,
    title: "Projetos de Transformação",
    description:
      "Projetos estruturados de reestruturação e crescimento, integrando gestão, processos, tecnologia e inteligência financeira.",
  },
];

export function SolucoesSection() {
  const { openModal } = useModal();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow block mb-5">Soluções</span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
            className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-5"
          >
            Como podemos ajudar sua empresa.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#5B6470" }}>
            Soluções integradas de gestão, processos e inteligência financeira para empresas em crescimento.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solucoes.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="service-card rounded-xl p-8 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(13,31,60,0.08)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(201,168,76,0.10)" }}
                >
                  <Icon size={20} style={{ color: "#C9A84C" }} />
                </div>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
                  className="text-lg font-bold mb-3"
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5B6470" }}>
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => openModal()}
            className="btn-primary px-8 py-4 rounded-lg text-sm font-semibold"
          >
            Solicitar uma Conversa
          </button>
        </div>

      </div>
    </section>
  );
}
