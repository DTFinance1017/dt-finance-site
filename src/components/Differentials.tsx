import { FadeIn } from "./FadeIn";
import { useState } from "react";
import { ContatoModal } from "./ContatoModal";

const comparisonRows = [
  { label: "Foco",           contab: "Registro histórico e conformidade fiscal",    dt: "Clareza gerencial e suporte à decisão" },
  { label: "Entrega",        contab: "Balanço, DRE contábil, obrigações acessórias", dt: "Dashboard, DRE gerencial, fluxo de caixa, alertas" },
  { label: "Periodicidade",  contab: "Anual ou trimestral",                         dt: "Mensal, com monitoramento contínuo" },
  { label: "Linguagem",      contab: "Técnica, para fisco e auditoria",             dt: "Executiva, para o sócio e a diretoria" },
  { label: "Utilidade",      contab: "Passado: o que aconteceu",                   dt: "Presente e futuro: o que fazer agora" },
  { label: "Substitui o contador?", contab: "—", dt: "Não. Trabalhamos junto com ele." },
];

export function Differentials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="diferenciais" className="py-24 relative overflow-hidden" style={{ background: "#0d0d12" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Intro text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
            <FadeIn>
              <div className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-6">
                DIFERENCIAÇÃO
              </div>
              <h2
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Contabilidade e DT Finance
                <br />
                <span className="gradient-text">não competem — se completam</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-6 text-lg">
                Seu contador registra o passado com precisão. Nós organizamos, interpretamos e direcionamos.
                São funções diferentes — e as duas são indispensáveis.
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                A contabilidade é obrigação legal. A DT Finance é vantagem competitiva.
                Trabalhamos lado a lado com o seu escritório contábil para transformar histórico em estratégia.
              </p>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold px-6 py-3.5 rounded-xl text-sm font-semibold"
              >
                Quero clareza sobre meu negócio →
              </button>
            </FadeIn>

            {/* 3 pillars */}
            <div className="space-y-4">
              {[
                { step: "01", title: "Organiza", desc: "Estrutura os dados financeiros dispersos em categorias, centros de custo e indicadores padronizados.", color: "#3b82f6" },
                { step: "02", title: "Interpreta", desc: "Analisa margens, tendências, riscos e oportunidades. Traduz números em linguagem executiva.", color: "#f0c040" },
                { step: "03", title: "Direciona", desc: "Entrega orientação estratégica: o que fazer, quando fazer e com que base de dados.", color: "#10b981" },
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div
                    className="flex gap-5 p-5 rounded-2xl border border-white/6 bg-[#131318]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold bg-white/4 text-white/40"
                    >
                      {p.step}
                    </div>
                    <div>
                      <h3
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-base font-semibold text-white mb-1"
                      >
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Comparison table */}
          <FadeIn>
            <div className="rounded-2xl border border-white/8 overflow-hidden">
              <div className="grid grid-cols-3 text-xs font-semibold" style={{ background: "#0a0a12" }}>
                <div className="px-5 py-4 text-white/40 uppercase tracking-wide">Aspecto</div>
                <div className="px-5 py-4 text-white/40 uppercase tracking-wide border-l border-white/7">Contabilidade</div>
                <div className="px-5 py-4 text-[#60a5fa] uppercase tracking-wide border-l border-white/7">DT Finance</div>
              </div>
              {comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 text-sm border-t border-white/6"
                  style={{ background: i % 2 === 0 ? "#131318" : "#0f0f15" }}
                >
                  <div className="px-5 py-3.5 text-white/50 font-medium text-xs">{row.label}</div>
                  <div className="px-5 py-3.5 text-white/40 text-xs border-l border-white/6 leading-relaxed">{row.contab}</div>
                  <div className="px-5 py-3.5 text-white/80 text-xs border-l border-white/6 leading-relaxed">{row.dt}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Bottom note for accountants */}
          <FadeIn delay={200}>
            <div
              className="mt-6 px-6 py-4 rounded-xl border text-center"
              style={{ borderColor: "rgba(16,185,129,0.15)", background: "rgba(16,185,129,0.04)" }}
            >
              <p className="text-xs text-white/40">
                <span className="text-emerald-400/70 font-medium">Contadores e escritórios contábeis:</span>{" "}
                a DT Finance não substitui e não compete com o seu trabalho. Somos parceiros que agregam a camada gerencial e estratégica que o cliente precisa — e que o modelo contábil não foi desenhado para entregar.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <ContatoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
