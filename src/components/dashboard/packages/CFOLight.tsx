import { Calendar, TrendingUp, TrendingDown, MessageSquare, ChevronRight } from "lucide-react";

const DRE_ROWS = [
  { label: "Receita de Honorários", orcado: 105000, realizado: 98000, tipo: "receita" },
  { label: "(-) Deduções e Impostos", orcado: -15750, realizado: -14700, tipo: "deducao" },
  { label: "(=) Receita Líquida", orcado: 89250, realizado: 83300, tipo: "subtotal" },
  { label: "(-) Custo de Terceiros/Colaboradores", orcado: -28000, realizado: -29400, tipo: "custo" },
  { label: "(=) Lucro Bruto", orcado: 61250, realizado: 53900, tipo: "subtotal" },
  { label: "(-) Salários e Encargos", orcado: -22000, realizado: -23800, tipo: "despesa" },
  { label: "(-) Aluguel e Ocupação", orcado: -8500, realizado: -8500, tipo: "despesa" },
  { label: "(-) Outros Administrativos", orcado: -11500, realizado: -13700, tipo: "despesa" },
  { label: "(=) Resultado Operacional", orcado: 19250, realizado: 7900, tipo: "resultado" },
];

const HIST_MESES = [
  { mes: "Out", orcado: 22, realizado: 18 },
  { mes: "Nov", orcado: 22, realizado: 21 },
  { mes: "Dez", orcado: 25, realizado: 28 },
  { mes: "Jan", orcado: 20, realizado: 16 },
  { mes: "Fev", orcado: 22, realizado: 20 },
  { mes: "Mar", orcado: 19, realizado: 8 },
];

function fmt(v: number): string {
  const abs = Math.abs(v);
  const s = `R$ ${abs >= 1000 ? `${(abs / 1000).toFixed(0)}K` : abs}`;
  return v < 0 ? `(${s})` : s;
}

function desvio(orc: number, real: number): string {
  const d = ((real - orc) / Math.abs(orc)) * 100;
  return `${d >= 0 ? "+" : ""}${d.toFixed(1)}%`;
}

export function CFOLight() {
  const maxH = Math.max(...HIST_MESES.map(h => Math.max(h.orcado, h.realizado)));

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(59,130,246,0.25)", background: "linear-gradient(135deg, #2e2e36 0%, #343438 100%)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3b82f6]/20 text-[#60a5fa] font-semibold border border-[#3b82f6]/30">CFO LIGHT</span>
              <span className="text-[10px] text-white/25">Acompanhamento mensal · Sem fluxo de caixa previsto</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white mb-0.5">Resumo Mensal — Março 2025</h2>
            <p className="text-xs text-white/45">Moreira & Lima Advocacia · Serviços Jurídicos · 12 funcionários</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30">Valor do pacote</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[#3b82f6]">R$ 3–5K/mês</div>
          </div>
        </div>

        {/* KPI bar */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/8">
          {[
            { label: "Receita Real", value: "R$ 98K", vs: "Orç: R$ 105K", color: "#d97706", icon: <TrendingDown size={14} /> },
            { label: "Resultado Op.", value: "R$ 7,9K", vs: "Orç: R$ 19,2K", color: "#ef4444", icon: <TrendingDown size={14} /> },
            { label: "Margem Op.", value: "9,5%", vs: "Orç: 21,6%", color: "#d97706", icon: <TrendingDown size={14} /> },
          ].map((k, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1" style={{ color: k.color }}>{k.icon}<span className="text-[10px]">{k.vs}</span></div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: k.color }} className="text-xl font-bold">{k.value}</div>
              <div className="text-[10px] text-white/35">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* DRE table */}
        <div className="lg:col-span-2 rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">DRE Gerencial — Orçado vs. Realizado</h3>
              <p className="text-xs text-white/35 mt-0.5">Março 2025</p>
            </div>
            <div className="flex gap-3 text-[10px] text-white/35">
              <span>Orçado</span>
              <span>Realizado</span>
              <span className="w-12 text-right">Desvio</span>
            </div>
          </div>
          <div className="divide-y divide-white/4">
            {DRE_ROWS.map((row, i) => {
              const isResult = row.tipo === "resultado" || row.tipo === "subtotal";
              const dev = desvio(row.orcado, row.realizado);
              const devNum = ((row.realizado - row.orcado) / Math.abs(row.orcado)) * 100;
              const devGood = (row.tipo === "receita" || row.tipo === "subtotal" || row.tipo === "resultado") ? devNum > 0 : devNum < 0;
              return (
                <div key={i} className={`flex items-center gap-4 px-5 py-2.5 text-xs ${isResult ? "bg-white/3 font-semibold" : "hover:bg-white/1"}`}>
                  <span className={`flex-1 ${isResult ? "text-white" : "text-white/60"}`}>{row.label}</span>
                  <span className="w-20 text-right text-white/50">{fmt(row.orcado)}</span>
                  <span className={`w-20 text-right font-medium ${isResult ? "text-white" : "text-white/75"}`}>{fmt(row.realizado)}</span>
                  <span className={`w-14 text-right text-[10px] font-medium ${devGood ? "text-[#10b981]" : "text-[#ef4444]"}`}>{dev}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Reunião */}
          <div className="rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/6 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-[#60a5fa]" />
              <span className="text-xs font-semibold text-white">Próxima Reunião</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-[#60a5fa]">15/04/2025</div>
            <div className="text-xs text-white/45 mt-0.5">Terça-feira · 14h00</div>
            <div className="text-[10px] text-white/30 mt-1">Reunião mensal com sócios · 60 min</div>
            <div className="mt-3 pt-3 border-t border-white/8">
              <div className="text-[10px] text-white/35 mb-1">Última reunião</div>
              <div className="text-xs text-white/50">18/03/2025 · Concluída</div>
            </div>
          </div>

          {/* Observações estratégicas */}
          <div className="rounded-xl border border-white/7 bg-[#343438] p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={13} className="text-white/40" />
              <span className="text-xs font-semibold text-white">Observações Estratégicas</span>
            </div>
            <div className="space-y-2.5">
              {[
                "Queda de 2 clientes recorrentes — perda de R$ 12K/mês em honorários",
                "Propostas de revisão de honorários em elaboração para 3 clientes",
                "Contratar 1 advogado júnior pode reduzir custo com terceiros",
              ].map((obs, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ChevronRight size={11} className="text-[#60a5fa] mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-white/55 leading-snug">{obs}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historical chart */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Resultado Operacional — Orçado vs. Realizado</h3>
            <p className="text-xs text-white/35 mt-0.5">Últimos 6 meses · R$ em milhares</p>
          </div>
          <div className="flex gap-4 text-[10px] text-white/35">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/20" />Orçado</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#3b82f6]/70" />Realizado</span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-28">
          {HIST_MESES.map((h, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center gap-1 h-full justify-end ${i === 5 ? "opacity-100" : "opacity-50"}`}>
              <div className="w-full flex gap-1 items-end justify-center h-full">
                <div className="flex-1 rounded-t-sm bg-white/15" style={{ height: `${(h.orcado / maxH) * 100}%` }} />
                <div className="flex-1 rounded-t-sm" style={{ height: `${(h.realizado / maxH) * 100}%`, background: i === 5 ? "#3b82f6" : "#3b82f6aa" }} />
              </div>
              <div className="text-[9px] text-white/30">{h.mes}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg bg-[#d97706]/8 border border-[#d97706]/15">
          <p className="text-[11px] text-[#d97706]/80">Mar/25 abaixo do orçado em 59%. Março historicamente fraco + perda de clientes. Ação necessária em Abril.</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/5 p-4 text-[11px] text-white/40 leading-relaxed">
        <span className="text-[#60a5fa] font-medium">Próxima evolução:</span> O pacote <span className="text-[#8b5cf6]">CFO Plus</span> inclui Fluxo de Caixa Previsto vs. Realizado, KPIs financeiros e comparativos mensais a partir de R$ 7.500/mês.
      </div>
    </div>
  );
}
