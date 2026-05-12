import { TrendingUp, TrendingDown, BarChart3, Percent, DollarSign, Calendar } from "lucide-react";

const DRE_ROWS = [
  { label: "Receita Bruta de Vendas",         orc: 420000,  real: 408000,  tipo: "receita" },
  { label: "(-) Deduções e Impostos",          orc: -63000,  real: -61200,  tipo: "deducao" },
  { label: "(=) Receita Líquida",              orc: 357000,  real: 346800,  tipo: "subtotal" },
  { label: "(-) CMV — Custo dos Produtos",     orc: -189210, real: -194208, tipo: "custo" },
  { label: "(=) Lucro Bruto",                  orc: 167790,  real: 152592,  tipo: "subtotal" },
  { label: "(-) Despesas Operacionais",        orc: -94500,  real: -99400,  tipo: "despesa" },
  { label: "(=) EBIT",                         orc: 73290,   real: 53192,   tipo: "resultado" },
  { label: "(+/-) Resultado Financeiro",       orc: -10710,  real: -12420,  tipo: "financeiro" },
  { label: "(=) Lucro Líquido",                orc: 62580,   real: 40772,   tipo: "resultado" },
];

const FLUXO = [
  { mes: "Out", previsto: 38, realizado: 31 },
  { mes: "Nov", previsto: 42, realizado: 44 },
  { mes: "Dez", previsto: 55, realizado: 58 },
  { mes: "Jan", previsto: 35, realizado: 28 },
  { mes: "Fev", previsto: 40, realizado: 36 },
  { mes: "Mar", previsto: 41, realizado: 41 },
];

const KPIS = [
  { label: "Margem Bruta", value: "44,0%", meta: "45%", icon: <Percent size={14} />, color: "#8b5cf6", ok: true },
  { label: "Margem EBIT", value: "15,3%", meta: "20,5%", icon: <TrendingDown size={14} />, color: "#d97706", ok: false },
  { label: "Margem Líquida", value: "11,8%", meta: "17,5%", icon: <TrendingDown size={14} />, color: "#d97706", ok: false },
  { label: "Giro de Estoque", value: "3,8x", meta: "4,5x", icon: <BarChart3 size={14} />, color: "#d97706", ok: false },
  { label: "Prazo Médio Rec.", value: "32 dias", meta: "25 dias", icon: <Calendar size={14} />, color: "#ef4444", ok: false },
  { label: "Liquidez Corrente", value: "1,42", meta: "> 1,20", icon: <TrendingUp size={14} />, color: "#10b981", ok: true },
];

const COMP_MENSAL = [
  { mes: "Out/24", receita: 390, lucro: 38 },
  { mes: "Nov/24", receita: 405, lucro: 42 },
  { mes: "Dez/24", receita: 468, lucro: 52 },
  { mes: "Jan/25", receita: 372, lucro: 29 },
  { mes: "Fev/25", receita: 398, lucro: 36 },
  { mes: "Mar/25", receita: 408, lucro: 41 },
];

function fmt(v: number): string {
  const abs = Math.abs(v);
  const s = abs >= 1000 ? `R$ ${(abs / 1000).toFixed(0)}K` : `R$ ${abs}`;
  return v < 0 ? `(${s})` : s;
}

function desvio(o: number, r: number): string {
  const d = ((r - o) / Math.abs(o)) * 100;
  return `${d >= 0 ? "+" : ""}${d.toFixed(1)}%`;
}

export function CFOPlus() {
  const maxComp = Math.max(...COMP_MENSAL.map(c => c.receita));
  const maxF = Math.max(...FLUXO.map(f => Math.max(f.previsto, f.realizado)));

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(139,92,246,0.25)", background: "linear-gradient(135deg, #282230 0%, #343438 100%)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 text-[#a78bfa] font-semibold border border-[#8b5cf6]/30">CFO PLUS</span>
              <span className="text-[10px] text-white/25">DRE + Fluxo de Caixa + KPIs · Sem gestão bancária ativa</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white mb-0.5">Painel Financeiro — Março 2025</h2>
            <p className="text-xs text-white/45">Grupo Nutrivida · Alimentação / Distribuição · 42 funcionários</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30">Valor do pacote</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[#a78bfa]">R$ 7,5–10K/mês</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/8">
          {[
            { label: "Receita Bruta", value: "R$ 408K", icon: <DollarSign size={13} />, color: "#8b5cf6" },
            { label: "Lucro Líquido", value: "R$ 40,8K", icon: <TrendingDown size={13} />, color: "#d97706" },
            { label: "Margem Líq.", value: "11,8%", icon: <Percent size={13} />, color: "#d97706" },
          ].map((k, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1" style={{ color: k.color }}>{k.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: k.color }} className="text-xl font-bold">{k.value}</div>
              <div className="text-[10px] text-white/35">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {KPIS.map((k, i) => (
          <div key={i} className="rounded-xl border border-white/7 bg-[#343438] p-3.5">
            <div className="flex items-center gap-1.5 mb-2" style={{ color: k.color }}>
              {k.icon}
              <span className="text-[9px] text-white/35">{k.label}</span>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: k.color }} className="text-lg font-bold mb-0.5">{k.value}</div>
            <div className="text-[9px]" style={{ color: `${k.color}80` }}>Meta: {k.meta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* DRE */}
        <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/7 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">DRE — Orçado vs. Realizado</h3>
            <div className="flex gap-3 text-[10px] text-white/30"><span>Orç.</span><span>Real.</span><span className="w-10 text-right">Δ%</span></div>
          </div>
          <div className="divide-y divide-white/4">
            {DRE_ROWS.map((row, i) => {
              const isResult = row.tipo === "resultado" || row.tipo === "subtotal";
              const dev = desvio(row.orc, row.real);
              const devNum = ((row.real - row.orc) / Math.abs(row.orc)) * 100;
              const devGood = (row.tipo === "receita" || row.tipo === "subtotal" || row.tipo === "resultado") ? devNum > 0 : devNum < 0;
              return (
                <div key={i} className={`flex items-center gap-3 px-4 py-2 text-xs ${isResult ? "bg-white/3 font-semibold" : ""}`}>
                  <span className={`flex-1 truncate ${isResult ? "text-white" : "text-white/55"}`}>{row.label}</span>
                  <span className="w-16 text-right text-white/40 text-[10px]">{fmt(row.orc)}</span>
                  <span className={`w-16 text-right font-medium ${isResult ? "text-white" : "text-white/70"}`}>{fmt(row.real)}</span>
                  <span className={`w-10 text-right text-[10px] ${devGood ? "text-[#10b981]" : "text-[#ef4444]"}`}>{dev}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fluxo de Caixa + Comparativo */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Fluxo de Caixa — Previsto vs. Realizado</h3>
            </div>
            <div className="flex gap-4 text-[10px] text-white/35 mb-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/20" />Previsto</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#8b5cf6]/70" />Realizado</span>
            </div>
            <div className="flex items-end gap-3 h-24">
              {FLUXO.map((h, i) => (
                <div key={i} className={`flex-1 flex flex-col items-center gap-0.5 h-full justify-end ${i === 5 ? "opacity-100" : "opacity-55"}`}>
                  <div className="w-full flex gap-0.5 items-end justify-center h-full">
                    <div className="flex-1 rounded-t-sm bg-white/15" style={{ height: `${(h.previsto / maxF) * 100}%` }} />
                    <div className="flex-1 rounded-t-sm bg-[#8b5cf6]/70" style={{ height: `${(h.realizado / maxF) * 100}%` }} />
                  </div>
                  <div className="text-[9px] text-white/30 mt-1">{h.mes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Comparativo — Receita & Lucro</h3>
            <div className="space-y-2">
              {COMP_MENSAL.map((c, i) => (
                <div key={i} className={`flex items-center gap-3 ${i === 5 ? "opacity-100" : "opacity-50"}`}>
                  <span className="text-[10px] text-white/40 w-12">{c.mes}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-[#8b5cf6]/60" style={{ width: `${(c.receita / maxComp) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-white/55 w-14 text-right">R$ {c.receita}K</span>
                  <span className="text-[10px] text-emerald-400 w-12 text-right">{c.lucro}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/5 p-4 text-[11px] text-white/40 leading-relaxed">
        <span className="text-[#a78bfa] font-medium">Próxima evolução:</span> O pacote <span className="text-[#f0c040]">CFO Full</span> adiciona relatórios de custos por centro/projeto, vendas por cliente/produto, gestão bancária ativa e dashboard executivo visual a partir de R$ 15.000/mês.
      </div>
    </div>
  );
}
