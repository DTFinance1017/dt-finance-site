import { useState, useEffect, useRef } from "react";
import { FadeIn } from "./FadeIn";

// NOTE: Esses depoimentos são modelos estruturais — substituir pelos dados reais dos clientes antes de publicar
const testimonials = [
  {
    quote:
      "A gente faturava bem mas nunca sobrava dinheiro no fim do mês. Em 90 dias a DT reorganizou nosso fluxo de caixa — hoje temos 3 meses de reserva.",
    name: "Ricardo Almeida",
    role: "Sócio-Diretor",
    company: "Construtora Almeida & Filhos",
    extra: "R$ 4M/ano",
    initials: "RA",
  },
  {
    quote:
      "Antes eu tomava decisão de investimento no feeling. A DT montou um dashboard que me mostra em tempo real se tenho margem pra crescer ou se preciso segurar.",
    name: "Fernanda Costa",
    role: "CEO",
    company: "Rede de Clínicas Bem Estar",
    extra: "3 unidades",
    initials: "FC",
  },
  {
    quote:
      "Tentei contratar um CFO CLT mas o custo era inviável. A DT entrega o mesmo nível de análise por uma fração do valor — e com mais agilidade.",
    name: "Marcos Teixeira",
    role: "Fundador",
    company: "Distribuidora TechParts",
    extra: "40 funcionários",
    initials: "MT",
  },
];

// NOTE: Substituir pelos nomes/logos reais das empresas clientes
const clientLogos = ["Construtora A&F", "Clínicas Bem Estar", "TechParts", "Grupo Valore", "LexisCorp", "OrchestraMS"];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (fading || index === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 280);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 280);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const t = testimonials[active];

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#0d0d12" }}
    >

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <FadeIn className="text-center mb-12">
          <div className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-5">
            RESULTADOS REAIS
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            O que dizem os nossos clientes
          </h2>
          <div className="mx-auto h-px w-12 rounded-full bg-white/10" />
        </FadeIn>

        {/* Card */}
        <div className="max-w-3xl mx-auto mb-10">
          <div
            className="relative rounded-[20px] p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(12px)",
              transition: "opacity 0.28s ease, transform 0.28s ease",
              opacity: fading ? 0 : 1,
              transform: fading ? "translateX(14px)" : "translateX(0)",
            }}
          >
            {/* Decorative quote mark */}
            <div
              className="absolute top-3 left-7 pointer-events-none select-none leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 96,
                color: "rgba(240,192,64,0.18)",
                lineHeight: 1,
              }}
            >
              "
            </div>

            <p
              className="relative text-lg sm:text-xl leading-relaxed mb-8 z-10"
              style={{
                color: "rgba(255,255,255,0.88)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {t.quote}
            </p>

            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm tracking-wide"
                style={{
                  background: "#1e1e28",
                }}
              >
                {t.initials}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-[#f0c040] text-xs font-medium">{t.role}</div>
                <div className="text-white/40 text-xs">
                  {t.company} · {t.extra}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              className="h-2 rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                background:
                  i === active ? "#f0c040" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Client logos */}
        <FadeIn delay={100} className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/28 mb-5 font-medium">
            Empresas que confiam na DT Finance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {clientLogos.map((logo, i) => (
              <span
                key={i}
                className="text-sm font-semibold text-white/28 tracking-wide"
              >
                {logo}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
