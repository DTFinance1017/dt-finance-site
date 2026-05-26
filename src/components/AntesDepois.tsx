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
    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn className="text-center mb-14">
          <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-4">
            A TRANSFORMAÇÃO
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4158]"
          >
            O antes e o depois
            <br />
            de ter clareza financeira
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Antes */}
          <FadeIn>
            <div
              className="rounded-2xl border p-7 h-full"
              style={{ borderColor: "rgba(27,65,88,0.09)", background: "#f5f7f9" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(27,65,88,0.08)" }}>
                  <X size={16} className="text-[#1B4158]/38" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[#1B4158]/60">
                  ANTES — Sem estrutura
                </span>
              </div>
              <div className="space-y-3.5">
                {antes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(27,65,88,0.06)" }}>
                      <X size={11} className="text-[#1B4158]/32" />
                    </div>
                    <p className="text-sm text-[#1B4158]/55 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Depois */}
          <FadeIn delay={120}>
            <div
              className="rounded-2xl border p-7 h-full"
              style={{ borderColor: "rgba(27,65,88,0.13)", background: "#f5f7f9" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(27,65,88,0.10)" }}>
                  <Check size={16} className="text-[#1B4158]/72" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-white/85">
                  DEPOIS — Com DT Finance
                </span>
              </div>
              <div className="space-y-3.5">
                {depois.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(27,65,88,0.09)" }}>
                      <Check size={11} className="text-[#1B4158]/55" />
                    </div>
                    <p className="text-sm text-[#1B4158]/90 leading-relaxed">{item}</p>
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
              style={{ borderColor: "rgba(27,65,88,0.10)", background: "rgba(27,65,88,0.04)" }}
            >
              <span className="text-sm text-[#1B4158]/60">Da desorganização</span>
              <span className="text-[#1B4158]/38 text-lg">→</span>
              <span className="text-sm font-semibold text-[#1B4158]">à visão estratégica</span>
              <span className="text-[#1B4158]/38 text-lg">→</span>
              <span className="text-sm text-[#1B4158]/60">em semanas</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
