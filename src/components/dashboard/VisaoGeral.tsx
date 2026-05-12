import { TrendingUp, DollarSign, Percent, Landmark, Target, BarChart2 } from "lucide-react";

// ─── Dados 1º Tri/2026 ──────────────────────────────────────────────────────────
const Q1_RECEITA = 2247832;
const Q1_LUCRO   = 271394;
const Q4_RECEITA = 2038547;
const Q4_LUCRO   = 248371;
const Q1_25_RECEITA = 1891243;
const Q1_25_LUCRO   = 207862;
const FORECAST_ANUAL = 9261532;
const ANUAL_2025     = 7782104;

const pct = (a: number, b: number) => ((a - b) / b * 100);
const fmt  = (n: number) => "R$ " + n.toLocaleString("pt-BR");
const fmtK = (n: number) => "R$ " + (n / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + "K";
const fmtM = (n: number) => "R$ " + (n / 1000000).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";

const cashFlow = [
  { month: "Out", real: 67.8 }, { month: "Nov", real: 70.4 },
  { month: "Dez", real: 72.1 }, { month: "Jan", real: 72.2 },
  { month: "Fev", real: 74.8 }, { month: "Mar", real: 77.7 },
];

const secKpis = [
  {
    label: "Receita Bruta 1º Tri/26",
    value: fmtM(Q1_RECEITA),
    tt: `+${pct(Q1_RECEITA, Q4_RECEITA).toFixed(1)}%`,
    aa: `+${pct(Q1_RECEITA, Q1_25_RECEITA).toFixed(1)}%`,
    posT: true, posA: true,
    icon: <DollarSign size={14} />, color: "#3b82f6",
  },
  {
    label: "Margem Líquida",
    value: "13,1%",
    tt: "+0,3 pp",
    aa: "+1,8 pp",
    posT: true, posA: true,
    icon: <Percent size={14} />, color: "#10b981",
  },
  {
    label: "Caixa Projetado 90d",
    value: "+R$ 319.847",
    tt: "Abr–Jun 2026",
    aa: "resultado positivo",
    posT: true, posA: true,
    icon: <Landmark size={14} />, color: "#f0c040",
  },
  {
    label: "Receita Mar/26",
    value: fmtK(777251),
    tt: `+${pct(777251, 748162).toFixed(1)}% vs fev`,
    aa: `+${pct(777251, 657230).toFixed(1)}% a/a`,
    posT: true, posA: true,
    icon: <BarChart2 size={14} />, color: "#0d9488",
  },
  {
    label: "Lucro Mar/26",
    value: "R$ 91.630",
    tt: `+${pct(91630, 91043).toFixed(1)}% vs fev`,
    aa: "+29,1% a/a",
    posT: true, posA: true,
    icon: <TrendingUp size={14} />, color: "#10b981",
  },
  {
    label: "Forecast 2026",
    value: fmtM(FORECAST_ANUAL),
    tt: `+${pct(FORECAST_ANUAL, ANUAL_2025).toFixed(1)}% vs 2025`,
    aa: "base 1º Tri real",
    posT: true, posA: true,
    icon: <Target size={14} />, color: "#d97706",
  },
];

const recentActivity = [
  { label: "DRE 1º Tri/2026 processado e disponível", time: "há 1h", color: "#10b981" },
  { label: "Upload de extratos Mar/26 concluído", time: "há 3h", color: "#3b82f6" },
  { label: "Alerta: concentração Cliente A em 25,3%", time: "há 1d", color: "#d97706" },
  { label: "Relatório gerencial gerado para download", time: "há 2d", color: "#10b981" },
  { label: "Reunião de análise estratégica 2º Tri confirmada", time: "há 4d", color: "#0d9488" },
];

export function VisaoGeral() {
  const ttRec  = pct(Q1_RECEITA, Q4_RECEITA).toFixed(1);
  const aaRec  = pct(Q1_RECEITA, Q1_25_RECEITA).toFixed(1);
  const ttLuc  = pct(Q1_LUCRO,   Q4_LUCRO).toFixed(1);
  const aaLuc  = pct(Q1_LUCRO,   Q1_25_LUCRO).toFixed(1);
  const aaAnual = pct(FORECAST_ANUAL, ANUAL_2025).toFixed(1);

  return (
    <div className="space-y-5">

      {/* ── Hero Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 — Lucro Líquido 1º Tri */}
        <div className="rounded-2xl border border-[#1e40af]/30 bg-gradient-to-br from-[#343438] to-[#0d1a35] p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-widest text-[#60a5fa] uppercase">1T26</span>
              <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">1º Tri · Jan–Mar 2026</span>
            </div>
            <div className="text-[11px] text-white/45 mb-1">Lucro Líquido Recorrente</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-white mb-4">
              {fmt(Q1_LUCRO)}
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl px-3 py-2.5" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="text-[#10b981] text-xl font-bold">▲{ttLuc.replace(".",",")}%</div>
                <div className="text-[10px] text-white/40 mt-0.5">1T26 vs. 4T25 (t/t)</div>
              </div>
              <div className="flex-1 rounded-xl px-3 py-2.5" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="text-[#10b981] text-xl font-bold">▲{aaLuc.replace(".",",")}%</div>
                <div className="text-[10px] text-white/40 mt-0.5">1T26 vs. 1T25 (a/a)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — Forecast Anual */}
        <div className="rounded-2xl border border-[#d97706]/20 bg-gradient-to-br from-[#343438] to-[#1a1205] p-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #f0c040 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-widest text-[#f0c040] uppercase">2026</span>
              <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">Projeção Anual</span>
            </div>
            <div className="text-[11px] text-white/45 mb-1">Receita Anual Projetada</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-white mb-4">
              {fmtM(FORECAST_ANUAL)}
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl px-3 py-2.5" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <div className="text-[#10b981] text-xl font-bold">▲{aaAnual.replace(".",",")}%</div>
                <div className="text-[10px] text-white/40 mt-0.5">2026 vs. 2025 (a/a)</div>
              </div>
              <div className="flex-1 rounded-xl px-3 py-2.5" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <div className="text-[#60a5fa] text-xl font-bold">{fmtK(Q1_RECEITA / 3)}</div>
                <div className="text-[10px] text-white/40 mt-0.5">média mensal realiz.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {secKpis.map((k, i) => (
          <div key={i} className="rounded-xl p-3.5 border border-white/7 bg-[#343438]">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}18`, color: k.color }}>
                {k.icon}
              </div>
              <div className="text-[9px] text-white/35 leading-tight">{k.label}</div>
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-white leading-tight mb-2">{k.value}</div>
            <div className="space-y-0.5">
              <div className={`text-[9px] font-medium ${k.posT ? "text-[#10b981]" : "text-[#d97706]"}`}>▲ {k.tt}</div>
              <div className="text-[9px] text-white/30">{k.aa}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Chart + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl border border-white/7 bg-[#343438] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Receita Bruta Mensal</div>
              <div className="text-xs text-white/35 mt-0.5">Out/25 – Mar/26 · em R$ 100K</div>
            </div>
            <div className="flex gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#3b82f6]" />Receita</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-32">
            {cashFlow.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end group">
                <div className="text-[8px] text-white/0 group-hover:text-white/40 transition-colors mb-0.5">
                  {d.real.toFixed(1)}
                </div>
                <div
                  className="w-full rounded-t-sm bg-[#3b82f6]/60 hover:bg-[#3b82f6] transition-colors"
                  style={{ height: `${(d.real / 85) * 100}%` }}
                />
                <div className="text-[9px] text-white/30 mt-1">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/35">
            <span>4º Tri/25: {fmtM(Q4_RECEITA)}</span>
            <span className="text-[#10b981]">1º Tri/26: {fmtM(Q1_RECEITA)} (+{pct(Q1_RECEITA, Q4_RECEITA).toFixed(1)}%)</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <div className="text-sm font-semibold text-white mb-4">Atividade Recente</div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/65 leading-snug">{a.label}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Resumo financeiro 1º Tri ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Receita Bruta 1º Tri", value: fmt(Q1_RECEITA), sub: `▲${ttRec}% t/t  ·  ▲${aaRec}% a/a`, color: "#3b82f6" },
          { label: "Lucro Líquido 1º Tri", value: fmt(Q1_LUCRO), sub: `margem 13,1%  ·  ▲${ttLuc}% t/t`, color: "#10b981" },
          { label: "Ticket Médio/Mês", value: fmtK(Q1_RECEITA / 3), sub: "média realizada 1º Tri/26", color: "#f0c040" },
          { label: "Forecast Anual", value: fmtM(FORECAST_ANUAL), sub: `▲${aaAnual}% vs 2025 estimado`, color: "#0d9488" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-white/7 bg-[#343438] p-4">
            <div className="text-[10px] text-white/35 mb-1">{s.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: s.color }} className="text-lg font-bold leading-tight">{s.value}</div>
            <div className="text-[9px] text-white/30 mt-1.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#1e40af]/30 bg-[#1e40af]/8 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
            <span className="text-[#60a5fa] text-base">🤖</span>
          </div>
          <div>
            <div className="text-sm font-medium text-white">Agente interno ativo</div>
            <div className="text-xs text-white/40">Processamento 1º Tri/2026 concluído · Iniciando análise 2º Tri · ETA: 4h</div>
          </div>
        </div>
        <span className="text-[10px] px-3 py-1 rounded-full bg-[#3b82f6]/20 text-[#60a5fa] font-medium">Em processamento</span>
      </div>
    </div>
  );
}
