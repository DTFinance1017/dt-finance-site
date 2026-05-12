import { Award, Briefcase, Scale, TrendingUp } from "lucide-react";
import { FadeIn } from "./FadeIn";

const socios = [
  {
    avatar: "CFP",
    gradientFrom: "#1e40af",
    gradientTo: "#0ea5e9",
    accentColor: "#0ea5e9",
    titulo: "Planejador Financeiro especialista em investimentos",
    certificacao: "CFP® — Certified Financial Planner",
    especialidade: "Finanças Corporativas & Inteligência de Dados",
    descricao:
      "Profissional com mais de 15 anos de experiência no mercado financeiro, com foco em gestão financeira, planejamento de investimentos e inteligência comercial. Apoiou empresários e empresas de diferentes setores na estruturação de suas finanças, tornando dados complexos em decisões estratégicas claras para tomadas de decisões.",
    tags: [
      { icon: <TrendingUp size={13} />, label: "Investimentos" },
      { icon: <Briefcase size={13} />, label: "Gestão Financeira" },
      { icon: <Award size={13} />, label: "CFP® — Certified Financial Planner" },
    ],
  },
  {
    avatar: "ADV",
    gradientFrom: "#065f46",
    gradientTo: "#10b981",
    accentColor: "#10b981",
    titulo: "Especialista Jurídico-Empresarial",
    certificacao: "Advogado — OAB",
    especialidade: "Direito Empresarial & Conformidade Societária",
    descricao:
      "Advogado com mais de 15 anos de atuação junto a pequenas, médias e grandes empresas. Combina o rigor jurídico com profundo entendimento do ambiente de negócios, apoiando clientes em estruturação societária, contratos, conformidade e na interface entre obrigações legais e saúde financeira.",
    tags: [
      { icon: <Scale size={13} />, label: "Direito Empresarial" },
      { icon: <Briefcase size={13} />, label: "PME & Grandes Empresas" },
      { icon: <Award size={13} />, label: "OAB" },
    ],
  },
];

export function QuemSomos() {
  return (
    <section id="quem-somos" className="py-16 md:py-24 lg:py-32 bg-[#0d0d12] relative overflow-hidden">

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Desktop: Image left / Text right | Mobile: stack ── */}
        <div className="flex flex-col md:flex-row md:items-stretch md:gap-14 mb-14">

          {/* Photo — larger and more dramatic on desktop */}
          <FadeIn className="md:w-5/12 mb-10 md:mb-0">
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-full min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=90&w=1200&auto=format&fit=crop"
                alt="Sócios DT Finance"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 30%", filter: "brightness(0.38) saturate(0.6)" }}
              />
              {/* Left-to-right fade */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, rgba(13,13,18,0.2) 0%, transparent 60%, rgba(13,13,18,0.7) 100%)" }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(13,13,18,0.9) 100%)" }}
              />
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 p-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 mb-3">
                  <span className="text-xs font-medium text-white/35 uppercase tracking-widest">Nossa Equipe</span>
                </div>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-white text-xl lg:text-2xl font-bold leading-snug"
                >
                  Mais de 15 anos de experiência<br />
                  <span className="gradient-text">ao lado das suas decisões</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Text block */}
          <FadeIn delay={100} className="md:w-7/12 flex flex-col justify-center">
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
            >
              Quem está por trás da{" "}
              <span className="gradient-text">DT Finance</span>
            </h2>
            <p className="text-white/55 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Uma sociedade construída sobre mais de 15 anos de experiência real no mercado financeiro e jurídico — unindo dados, estratégia e segurança para o seu negócio.
            </p>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "CFP® — Certified Financial Planner",
                "OAB — Direito Empresarial",
                "+15 anos de mercado",
                "Finanças + Jurídico + Dados",
              ].map((label, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-white/40"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div
              className="rounded-xl border border-[#f0c040]/15 bg-[#f0c040]/4 p-5"
            >
              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-white/80 text-base leading-relaxed italic"
              >
                "Unimos direito, tecnologia e finanças para entregar algo que o mercado ainda não tinha: um CFO completo, acessível e orientado a dados."
              </p>
              <span className="mt-3 inline-block text-[#f0c040]/55 text-sm font-medium">
                — Fundadores da DT Finance
              </span>
            </div>
          </FadeIn>
        </div>

        {/* ── Founder cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socios.map((socio, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="relative rounded-2xl border border-white/6 bg-[#131318] p-7 lg:p-8 flex flex-col gap-5"
              >

                <div className="flex items-start gap-5">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white/60 font-bold text-sm tracking-wide bg-white/6"
                  >
                    {socio.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold text-lg leading-snug mb-1.5">
                      {socio.titulo}
                    </h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/8 bg-white/4 text-white/40"
                    >
                      {socio.certificacao}
                    </span>
                    <div className="mt-2 text-xs font-medium text-white/30">
                      {socio.especialidade}
                    </div>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed">{socio.descricao}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {socio.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/8 bg-white/4 text-white/40"
                    >
                      <span className="text-white/30">{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
