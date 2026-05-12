import { FadeIn } from "./FadeIn";
import { X, Check } from "lucide-react";

const antes = [
  "Lucro real desconhecido — só o que sobra na conta",
  "Caixa gerenciado na reação, não no planejamento",
  "Relatórios confusos ou inexistentes",
  "Decisões baseadas em intuição",
  "Sem visão de onde o dinheiro é consumido",
  "Risco financeiro invisível até virar crise",
];

const depois = [
  "Lucro líquido real apurado todo mês com margem exata",
  "Fluxo de caixa projetado com 30, 60 e 90 dias à frente",
  "Decisões baseadas em indicadores concretos",
  "Visão clara por produto, cliente ou centro de custo",
  "Alertas automáticos antes que o problema apareça",
];

export function AntesDepois() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#0d0d12] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn className="text-center mb-14">
          <div className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">
            A TRANSFORMAÇÃO
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            O antes e o depois
            <br />
            <span className="gradient-text">de ter clareza financeira</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Antes */}
          <FadeIn>
            <div
              className="rounded-2xl border p-7 h-full"
              style={{ borderColor: "rgba(239,68,68,0.15)", background: "#131318" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
                  <X size={16} className="text-red-400" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-red-400">
                  ANTES — Sem estrutura
                </span>
              </div>
              <div className="space-y-3.5">
                {antes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(239,68,68,0.12)" }}>
                      <X size={11} className="text-red-400" />
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Depois */}
          <FadeIn delay={120}>
            <div
              className="rounded-2xl border p-7 h-full"
              style={{ borderColor: "rgba(16,185,129,0.15)", background: "#131318" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)" }}>
                  <Check size={16} className="text-emerald-400" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-emerald-400">
                  DEPOIS — Com DT Finance
                </span>
              </div>
              <div className="space-y-3.5">
                {depois.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(16,185,129,0.12)" }}>
                      <Check size={11} className="text-emerald-400" />
                    </div>
                    <p className="text-sm text-white/75 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Arrow/bridge */}
        <FadeIn delay={250}>
          <div className="mt-8 text-center">
            <div
              className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border"
              style={{ borderColor: "rgba(240,192,64,0.25)", background: "rgba(240,192,64,0.05)" }}
            >
              <span className="text-sm text-white/50">Da desorganização</span>
              <span className="text-[#f0c040] text-lg">→</span>
              <span className="text-sm font-semibold text-white">à visão estratégica</span>
              <span className="text-[#f0c040] text-lg">→</span>
              <span className="text-sm text-white/50">em semanas</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
