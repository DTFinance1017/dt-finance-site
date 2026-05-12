import { FadeIn } from "./FadeIn";
import { Building2, TrendingUp, Users, Rocket } from "lucide-react";

const profiles = [
  {
    icon: <Building2 size={22} />,
    title: "PMEs em crescimento",
    description: "Empresas com faturamento entre R$ 3M e R$ 80M que crescem mais rápido do que conseguem organizar. O negócio avança; o controle financeiro fica para trás — até virar um problema real.",
    color: "#3b82f6",
    tag: "Perfil mais comum",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Pré-investimento ou captação",
    description: "Empresas que precisam apresentar dados financeiros confiáveis para investidores, bancos ou processos societários. A desorganização financeira custa oportunidades e credibilidade.",
    color: "#10b981",
    tag: null,
  },
  {
    icon: <Users size={22} />,
    title: "Holdings e grupos com múltiplas unidades",
    description: "Grupos empresariais e redes com CNPJs distintos que precisam consolidar resultados em uma visão gerencial única — com comparativos, margens e alertas por unidade.",
    color: "#f0c040",
    tag: null,
  },
  {
    icon: <Rocket size={22} />,
    title: "Startups e scale-ups em escala",
    description: "Em fase de crescimento acelerado, precisam de estrutura financeira e visão de CFO sem o custo e rigidez de um executivo sênior fixo. Agilidade e método em cada fase.",
    color: "#0d9488",
    tag: null,
  },
];

export function ForWhom() {
  return (
    <section id="para-quem" className="py-16 md:py-24 lg:py-32 bg-[#0d0d12] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn className="text-center mb-14">
          <div className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">
            PARA QUEM É
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Se a empresa cresce mas o
            <br />
            <span className="gradient-text">controle não acompanha</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            Estágios diferentes, problema em comum: falta de clareza financeira para decidir com segurança e escalar com consistência.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {profiles.map((p, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className="relative flex gap-5 p-6 rounded-2xl border border-white/6 bg-[#131318] cursor-default"
              >
                {p.tag && (
                  <div
                    className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-full font-medium"
                    style={{ background: `${p.color}18`, color: p.color }}
                  >
                    {p.tag}
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/4 text-white/40">
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{p.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
