import { FadeIn } from "./FadeIn";
import { DollarSign, Calendar, Search, ShieldCheck, BarChart3 } from "lucide-react";

const featured = {
  icon: <DollarSign size={26} />,
  title: "Clareza sobre o lucro real",
  description:
    "Você saberá exatamente quanto sobra do seu faturamento depois de pagar tudo — com margem por produto, serviço ou unidade de negócio. Chega de confundir faturamento com lucro.",
  color: "#10b981",
  glow: "rgba(16,185,129,0.14)",
};

const ganhos = [
  {
    icon: <Calendar size={20} />,
    title: "Controle de caixa com visão de futuro",
    description: "Projeção de 30, 60 e 90 dias à frente. Saber o que vem te permite planejar — em vez de reagir quando já é tarde.",
    color: "#3b82f6",
  },
  {
    icon: <Search size={20} />,
    title: "Identificação de gargalos",
    description: "Descubra onde o dinheiro é consumido sem retorno — despesas desnecessárias, inadimplência oculta, custos fora de controle.",
    color: "#0d9488",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Redução de riscos financeiros",
    description: "Alertas antes que o problema apareça. Concentração de cliente, queda de margem, pressão de caixa — você sabe antes.",
    color: "#0ea5e9",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Decisões baseadas em dados reais",
    description: "Contratar, investir, expandir ou recuar — cada decisão apoiada em números concretos, não em sensação.",
    color: "#d97706",
  },
];

export function GanhosPraticos() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">

        {/* Section header */}
        <FadeIn className="max-w-2xl mb-12 lg:mb-14">
          <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-4">
            O QUE VOCÊ GANHA NA PRÁTICA
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4158]"
          >
            Resultado concreto,
            <br />
            <span className="gradient-text">não promessa vaga</span>
          </h2>
          <p className="mt-4 text-[#1B4158]/78 text-base lg:text-lg max-w-lg">
            Tudo o que entregamos tem nome, data e impacto mensurável na operação da sua empresa.
          </p>
        </FadeIn>

        {/* Desktop: Featured left + 2×2 right | Mobile: stack */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* Featured card */}
          <FadeIn className="md:w-2/5">
            <div
              className="h-full p-7 lg:p-9 rounded-2xl border flex flex-col"
              style={{
                borderColor: "rgba(27,65,88,0.08)",
                background: "#f5f7f9",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 bg-[#1B4158]/4 text-[#1B4158]/72"
              >
                {featured.icon}
              </div>

              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-xl lg:text-2xl font-bold text-[#1B4158] mb-4"
              >
                {featured.title}
              </h3>

              <p className="text-[#1B4158]/82 leading-relaxed mb-8 flex-1">
                {featured.description}
              </p>

            </div>
          </FadeIn>

          {/* 2×2 grid */}
          <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ganhos.map((g, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div
                  className="p-6 rounded-2xl border h-full cursor-default"
                  style={{
                    borderColor: "rgba(27,65,88,0.08)",
                    background: "#f5f7f9",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-[#1B4158]/4 text-[#1B4158]/72"
                  >
                    {g.icon}
                  </div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-base font-semibold text-[#1B4158] mb-2.5"
                  >
                    {g.title}
                  </h3>
                  <p className="text-sm text-[#1B4158]/78 leading-relaxed">{g.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
