import { FadeIn } from "./FadeIn";
import { ShieldCheck, Route, UserCheck, Building2 } from "lucide-react";

const diferenciais = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Dupla expertise: finanças e direito",
    description:
      "Planejamento financeiro certificado (CFP®) somado à visão jurídica empresarial (OAB). Suas finanças e a estrutura do negócio tratadas de forma integrada.",
  },
  {
    icon: <Route size={20} />,
    title: "Método próprio, não improviso",
    description:
      "A metodologia DOIA conduz da bagunça à clareza: Diagnóstico, Organização, Implementação e Acompanhamento — com entregável claro em cada etapa.",
  },
  {
    icon: <UserCheck size={20} />,
    title: "Presença executiva contínua",
    description:
      "Não é um relatório solto por mês. É um CFO acompanhando seus números, alertando desvios antes que virem problema e participando das decisões ao seu lado.",
  },
  {
    icon: <Building2 size={20} />,
    title: "Sob medida para PMEs",
    description:
      "Análise financeira de nível corporativo por uma fração do custo de um CFO em tempo integral — no tamanho e no ritmo da sua empresa.",
  },
];

export function Diferenciais() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#f5f7f9" }}>
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

        <FadeIn className="text-center mb-12 md:mb-14">
          <div className="text-xs font-semibold text-[#1B4158]/55 uppercase tracking-widest mb-5">
            Por que a DT Finance
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4158] mb-4"
          >
            Não vendemos relatório.<br className="hidden sm:block" /> Entregamos um CFO.
          </h2>
          <p className="text-[#1B4158]/72 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Método, credenciais e presença real — para a sua empresa decidir com base em dados, não no feeling.
          </p>
        </FadeIn>

        {/* Grid mobile-first: 1 coluna no celular, 2 no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {diferenciais.map((d, i) => (
            <FadeIn key={i} delay={i * 60} className="h-full">
              <div
                className="card-lift h-full rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(27,65,88,0.10)",
                  boxShadow: "0 4px 24px rgba(27,65,88,0.06)",
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-[#1B4158]/5 text-[#B5891A]">
                  {d.icon}
                </div>
                <h3 className="text-base font-semibold text-[#1B4158] mb-2 leading-snug">
                  {d.title}
                </h3>
                <p className="text-sm text-[#1B4158]/72 leading-relaxed">
                  {d.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Credenciais reais (selos CFP® e OAB) */}
        <FadeIn delay={120} className="text-center mt-12 md:mt-14">
          <p className="text-xs uppercase tracking-widest text-[#1B4158]/55 mb-6 font-medium">
            Credenciais que sustentam o trabalho
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <div className="flex items-center gap-3">
              <img src="/selo-cfp.png" alt="CFP® — Certified Financial Planner" className="h-12 w-auto object-contain" />
              <div className="text-left">
                <div className="text-sm font-semibold text-[#1B4158]">Planejamento Financeiro</div>
                <div className="text-xs text-[#1B4158]/72">Certificação CFP®</div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#1B4158]/12" />
            <div className="flex items-center gap-3">
              <img src="/selo-oab.png" alt="OAB — Direito Empresarial" className="h-12 w-auto object-contain" />
              <div className="text-left">
                <div className="text-sm font-semibold text-[#1B4158]">Direito Empresarial</div>
                <div className="text-xs text-[#1B4158]/72">Inscrição na OAB</div>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
