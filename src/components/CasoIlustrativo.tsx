import { FadeIn } from "./FadeIn";
import { AlertTriangle, ArrowRight, TrendingUp, Eye } from "lucide-react";

export function CasoIlustrativo() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn className="text-center mb-14">
          <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-4">
            ESTUDO DE CASO REAL
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4158]"
          >
            "Faturávamos R$ 6M por ano.
            <br />
            Não sobrava nada."
          </h2>
          <p className="mt-4 text-[#1B4158]/78 max-w-xl mx-auto text-sm leading-relaxed">
            Prestadora de serviços do setor de construção civil. 8 anos de mercado, equipe de 17 pessoas — e margem real desconhecida.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Situação inicial */}
          <FadeIn>
            <div
              className="card-lift rounded-2xl border p-6 h-full"
              style={{ borderColor: "rgba(27,65,88,0.09)", background: "#f5f7f9" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle size={15} className="text-[#1B4158]/68" />
                <span className="text-xs font-semibold text-[#1B4158]/72 uppercase tracking-wider">O Problema</span>
              </div>

              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-sm font-semibold text-[#1B4158] mb-4 leading-snug"
              >
                Crescimento no faturamento. Queda no caixa. Ninguém sabia por quê.
              </p>

              <div className="space-y-3">
                {[
                  "DRE fiscal entregue pelo contador — sem visão gerencial",
                  "Custos operacionais misturados entre linhas de produto",
                  "Precificação feita com markup histórico, nunca revisada",
                  "Linhas de serviço gerando prejuízo sem que ninguém soubesse",
                  "Ciclo financeiro de 47 dias — capital de giro insuficiente",
                  "Sócio cogitava empréstimo para cobrir o caixa",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 flex-shrink-0" />
                    <p className="text-xs text-[#1B4158]/78 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* O que foi feito */}
          <FadeIn delay={100}>
            <div
              className="card-lift rounded-2xl border p-6 h-full"
              style={{ borderColor: "rgba(27,65,88,0.11)", background: "#f5f7f9" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <ArrowRight size={15} className="text-[#1B4158]/75" />
                <span className="text-xs font-semibold text-[#1B4158]/78 uppercase tracking-wider">O Que Estruturamos</span>
              </div>

              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-sm font-semibold text-[#1B4158] mb-4 leading-snug"
              >
                Diagnóstico + implantação em 60 dias.
              </p>

              <div className="space-y-3">
                {[
                  "DRE gerencial por linha de produto e canal de venda",
                  "Custeio real por categoria — fixo e variável separados",
                  "Identificação das linhas de serviço com margem de contribuição negativa",
                  "Nova tabela de precificação baseada em markup real",
                  "Renegociação de condições com 4 fornecedores principais",
                  "Fluxo de caixa projetado a 90 dias com alertas automáticos",
                  "Dashboard executivo mensal com KPIs de margem e giro",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/25 mt-2 flex-shrink-0" />
                    <p className="text-xs text-[#1B4158]/72 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Resultados */}
          <FadeIn delay={200}>
            <div
              className="card-lift rounded-2xl border p-6 h-full"
              style={{ borderColor: "rgba(27,65,88,0.13)", background: "#f5f7f9" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={15} className="text-[#1B4158]/82" />
                <span className="text-xs font-semibold text-[#1B4158]/72 uppercase tracking-wider">Resultado em 120 dias</span>
              </div>

              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-sm font-semibold text-[#1B4158] mb-4 leading-snug"
              >
                Sem demitir ninguém. Sem contrair dívida.
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: "Margem líquida",
                    value: "4,8% → 9,3%",
                    detail: "sem aumentar faturamento",
                    highlight: true,
                  },
                  {
                    label: "Economia em custos operacionais",
                    value: "R$ 230K/ano",
                    detail: "identificados nos primeiros 30 dias",
                    highlight: false,
                  },
                  {
                    label: "Ciclo financeiro",
                    value: "47 → 26 dias",
                    detail: "capital de giro liberado",
                    highlight: false,
                  },
                  {
                    label: "Decisão de empréstimo",
                    value: "Cancelada",
                    detail: "caixa passou a se sustentar",
                    highlight: false,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl"
                    style={{
                      background: item.highlight ? "rgba(27,65,88,0.10)" : "rgba(27,65,88,0.05)",
                      border: `1px solid rgba(255,255,255,${item.highlight ? "0.10" : "0.06"})`,
                    }}
                  >
                    <div className="text-[10px] text-[#1B4158]/68 uppercase tracking-wide mb-1">{item.label}</div>
                    <div
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-base font-bold text-[#1B4158]"
                    >
                      {item.value}
                    </div>
                    <div className="text-[10px] text-[#1B4158]/68 mt-0.5">{item.detail}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-[#1B4158]/32">
                <Eye size={10} />
                <span>Dados reais. Nome da empresa preservado por confidencialidade.</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quote */}
        <FadeIn delay={100}>
          <div
            className="mt-8 rounded-2xl border p-6 sm:p-8 text-center"
            style={{ borderColor: "rgba(27,65,88,0.09)", background: "rgba(255,255,255,0.02)" }}
          >
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-lg sm:text-xl text-[#1B4158]/90 italic max-w-3xl mx-auto leading-relaxed"
            >
              "Achávamos que precisávamos vender mais para resolver o caixa. Quando a DT Finance nos mostrou a margem real de cada serviço, descobrimos que o dinheiro já estava lá — só estava indo para o lugar errado."
            </p>
            <p className="mt-4 text-xs text-[#1B4158]/38">— Sócio da empresa. Setor de construção civil. SP.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
