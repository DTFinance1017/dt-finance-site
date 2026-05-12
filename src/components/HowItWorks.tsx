import { FadeIn } from "./FadeIn";
import { Search, FolderOpen, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    letter: "D",
    title: "Diagnóstico",
    subtitle: "Identificamos onde o dinheiro está escapando",
    description:
      "Análise profunda de gargalos financeiros, custos invisíveis e falhas de processo. Revelamos o que os números escondem e o que está travando sua margem.",
    tempo: "Até 7 dias",
    entregavel: "Relatório de diagnóstico",
    icon: <Search size={20} />,
  },
  {
    letter: "O",
    title: "Organização",
    subtitle: "Estruturamos a base financeira",
    description:
      "Plano de contas gerencial, categorização de despesas e DRE structurado. Você passa a enxergar a empresa como ela realmente é — sem distorções.",
    tempo: "Semanas 2–3",
    entregavel: "Estrutura financeira operacional",
    icon: <FolderOpen size={20} />,
  },
  {
    letter: "I",
    title: "Implementação",
    subtitle: "Colocamos o plano em prática",
    description:
      "Ferramentas, processos e rotinas financeiras adaptadas à realidade do seu negócio — não teoria. Relatórios mensais, fluxo de caixa projetado e alertas automáticos.",
    tempo: "Semanas 3–6",
    entregavel: "DRE + Fluxo de Caixa ativos",
    icon: <Rocket size={20} />,
  },
  {
    letter: "A",
    title: "Acompanhamento",
    subtitle: "Presença executiva contínua",
    description:
      "Monitoramos indicadores mês a mês, alertamos desvios antes que virem problemas e participamos das decisões estratégicas ao seu lado.",
    tempo: "Mês a mês",
    entregavel: "Reunião + relatório executivo mensal",
    icon: <LineChart size={20} />,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 lg:py-32 bg-[#0d0d12] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-5">Nossa Metodologia</p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            O empresário tem uma{" "}
            <span className="gradient-text">dor.</span>
            <br />
            Nós temos o método.
          </h2>
          <p className="text-white/35 max-w-lg mx-auto text-sm leading-relaxed">
            O Método DOIA transforma a realidade financeira de empresas que crescem sem estrutura — com etapas claras, entregáveis definidos e acompanhamento contínuo.
          </p>
        </FadeIn>

        {/* DOIA acronym */}
        <FadeIn delay={60}>
          <div className="flex items-center justify-center gap-2 mb-14">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/8 bg-white/3">
                  <span
                    style={{ fontFamily: "'Playfair Display', serif", color: "#c8a84a", fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}
                  >
                    {s.letter}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px bg-white/8" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="relative flex flex-col p-6 rounded-xl h-full border border-white/6 bg-[#131318]"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 bg-white/4 text-white/35 flex-shrink-0">
                  {step.icon}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#c8a84a]/70">{step.letter}</span>
                  <span className="text-xs text-white/20">{`0${i + 1}`}</span>
                </div>

                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-lg font-bold text-white/85 mb-1"
                >
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-white/35 mb-3">{step.subtitle}</p>
                <p className="text-sm text-white/35 leading-relaxed flex-1">{step.description}</p>

                <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-white/20 uppercase tracking-widest">Prazo</span>
                    <span className="text-xs font-medium text-white/50">{step.tempo}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-semibold text-white/20 uppercase tracking-widest mt-0.5">Entregável</span>
                    <span className="text-xs text-white/35 leading-tight">{step.entregavel}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <div className="mt-12 text-center">
            <span className="text-xs text-white/25 px-5 py-2.5">
              Do diagnóstico ao acompanhamento — sem deixar você no escuro em nenhuma etapa.
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
