import { FadeIn } from "./FadeIn";

const services = [
  {
    icon: "◎",
    title: "CFO as a Service",
    description: "Suporte financeiro estratégico contínuo: reuniões de análise, acompanhamento de resultados e apoio à tomada de decisão — sem o custo e a rigidez de um executivo fixo.",
    entregaveis: ["Reunião executiva mensal", "Análise de resultados", "Suporte a decisões estratégicas"],
  },
  {
    icon: "◉",
    title: "Relatórios Executivos",
    description: "DRE gerencial, relatório de fluxo de caixa, painel de KPIs e alertas de margem — prontos para gestão interna, apresentação a sócios ou negociação com bancos.",
    entregaveis: ["DRE gerencial mensal", "Painel de KPIs", "Alertas automáticos"],
  },
  {
    icon: "⬡",
    title: "Fluxo de Caixa Projetado",
    description: "Projeção detalhada de entradas e saídas para os próximos 30, 60 e 90 dias. Identifique risco de caixa antes que ele apareça — e gerencie capital de giro com segurança.",
    entregaveis: ["Projeção 30/60/90 dias", "Análise de capital de giro", "Pontos de atenção antecipados"],
  },
  {
    icon: "⬟",
    title: "Controladoria Gerencial",
    description: "Plano de contas gerencial estruturado, DRE por produto, unidade ou centro de custo e apuração real de margens — separado e complementar ao relatório do contador.",
    entregaveis: ["Plano de contas gerencial", "DRE por centro de custo", "Margens reais por produto"],
  },
  {
    icon: "◇",
    title: "Inteligência de Dados",
    description: "Consolidação de dados de múltiplas fontes, automação de processos manuais repetitivos e modelos analíticos — para que a gestão pare de depender de planilhas e intuição.",
    entregaveis: ["Consolidação de fontes", "Automação de processos", "Modelos de análise"],
  },
  {
    icon: "◈",
    title: "Apoio no Relacionamento Bancário",
    description: "Assessoria na negociação de linhas de crédito, estruturação de capital de giro e relacionamento com instituições financeiras — com dados organizados que aumentam seu poder de negociação.",
    entregaveis: ["Estruturação de crédito", "Negociação com bancos", "Capital de giro otimizado"],
  },
];

export function Services() {
  return (
    <section id="solucoes" className="py-16 md:py-24 lg:py-32 bg-[#0d0d12] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-5">Soluções</p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            O que entregamos
            <br />
            <span className="gradient-text">e como impacta seu negócio</span>
          </h2>
          <p className="mt-4 text-white/35 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Cada solução tem entregáveis claros, prazo definido e impacto direto na gestão e rentabilidade da sua empresa.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="group h-full p-6 rounded-xl border border-white/6 bg-[#131318] flex flex-col transition-colors duration-200 hover:border-white/12"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-5 bg-white/4 text-white/40">
                  {service.icon}
                </div>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-lg font-semibold text-white/85 mb-3"
                >
                  {service.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">{service.description}</p>

                <div className="border-t border-white/5 pt-4">
                  <div className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mb-2.5">O que você recebe</div>
                  <div className="space-y-1.5">
                    {service.entregaveis.map((e, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full flex-shrink-0 bg-[#c8a84a]/50" />
                        <span className="text-xs text-white/35">{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
