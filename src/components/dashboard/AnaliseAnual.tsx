import { TrendingUp, TrendingDown, Target, Calendar, BarChart2, AlertTriangle } from "lucide-react";

export const historico = [
  { mes: "Out/25", meta: 2600, real: 2480, tipo: "historico" },
  { mes: "Nov/25", meta: 2700, real: 2750, tipo: "historico" },
  { mes: "Dez/25", meta: 2900, real: 3100, tipo: "historico" },
  { mes: "Jan/26", meta: 2400, real: 2200, tipo: "ytd" },
  { mes: "Fev/26", meta: 2500, real: 2527, tipo: "ytd" },
  { mes: "Mar/26", meta: 2700, real: 2840, tipo: "ytd" },
];

export const forecast = [
  { mes: "Abr/26", meta: 2800, proj: 2920 },
  { mes: "Mai/26", meta: 2850, proj: 2950 },
  { mes: "Jun/26", meta: 2850, proj: 2940 },
  { mes: "Jul/26", meta: 2900, proj: 2980 },
  { mes: "Ago/26", meta: 2900, proj: 2960 },
  { mes: "Set/26", meta: 2950, proj: 3020 },
  { mes: "Out/26", meta: 3000, proj: 3050 },
  { mes: "Nov/26", meta: 3050, proj: 3080 },
  { mes: "Dez/26", meta: 3300, proj: 3350 },
];

const ytdMeses = historico.filter((h) => h.tipo === "ytd");
const ytdMeta  = ytdMeses.reduce((s, h) => s + h.meta, 0);
const ytdReal  = ytdMeses.reduce((s, h) => s + h.real, 0);
const ytdPct   = (ytdReal / ytdMeta) * 100;

const metaAnual = historico.reduce((s, h) => s + h.meta, 0) + forecast.reduce((s, f) => s + f.meta, 0);
const projTotal = ytdReal + forecast.reduce((s, f) => s + f.proj, 0);
const projPct   = (projTotal / metaAnual) * 100;

function fmt(v: number) {
  return v >= 1000
    ? `R$ ${(v / 1000).toFixed(2).replace(".", ",")}M`
    : `R$ ${v.toLocaleString("pt-BR")}K`;
}

function PctBadge({ pct }: { pct: number }) {
  const over = pct >= 100;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{
        background: over ? "#10b98120" : pct >= 95 ? "#d9770618" : "#ef444418",
        color: over ? "#10b981" : pct >= 95 ? "#d97706" : "#ef4444",
      }}
    >
      {over ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
      {pct.toFixed(1)}%
    </span>
  );
}

/* ─── SVG Line Chart ─── */
const allMonths = [
  ...historico.map((h) => ({ label: h.mes.split("/")[0], meta: h.meta, real: h.real as number | null, proj: null as number | null })),
  ...forecast.map((f)  => ({ label: f.mes.split("/")[0],  meta: f.meta, real: null,                    proj: f.proj })),
];

const CHART_W = 720, CHART_H = 210;
const PAD_L = 52, PAD_R = 14, PAD_T = 20, PAD_B = 38;
const cW = CHART_W - PAD_L - PAD_R;
const cH = CHART_H - PAD_T - PAD_B;
const V_MIN = 2000, V_MAX = 3500;
const N = allMonths.length - 1;

function cpx(i: number) { return PAD_L + (i / N) * cW; }
function cpy(v: number) { return PAD_T + (1 - (v - V_MIN) / (V_MAX - V_MIN)) * cH; }

const metaPath = allMonths.map((d, i) => `${i === 0 ? "M" : "L"}${cpx(i)},${cpy(d.meta)}`).join(" ");

const realPath = historico.map((h, i) => `${i === 0 ? "M" : "L"}${cpx(i)},${cpy(h.real)}`).join(" ");

const lastRealX = cpx(historico.length - 1);
const lastRealY = cpy(historico[historico.length - 1].real);
const projPath  = [
  `M${lastRealX},${lastRealY}`,
  ...forecast.map((f, i) => `L${cpx(historico.length + i)},${cpy(f.proj)}`),
].join(" ");

const divX = (cpx(historico.length - 1) + cpx(historico.length)) / 2;
const gridYs = [2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400];

function GraficoLinha() {
  return (
    <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Receita Bruta — Realizado vs Projetado</h3>
          <p className="text-xs text-white/35 mt-0.5">Out/25 – Dez/26 · em R$ mil</p>
        </div>
        <div className="flex flex-wrap gap-4 text-[10px] text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 inline-block" style={{ background: "rgba(255,255,255,0.30)", borderTop: "1.5px dashed rgba(255,255,255,0.30)" }} />
            Meta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 inline-block rounded-full bg-[#3b82f6]" />
            Realizado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 inline-block" style={{ borderTop: "2px dashed #0d9488" }} />
            Forecast
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        style={{ overflow: "visible" }}
      >
        {/* Grid lines */}
        {gridYs.map((v) => (
          <g key={v}>
            <line x1={PAD_L} y1={cpy(v)} x2={CHART_W - PAD_R} y2={cpy(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            <text x={PAD_L - 5} y={cpy(v) + 3.5} fill="rgba(255,255,255,0.28)" fontSize="9.5" textAnchor="end">
              {v >= 1000 ? `${(v / 1000).toFixed(1)}M` : v}
            </text>
          </g>
        ))}

        {/* Vertical divider Realizado | Forecast */}
        <line x1={divX} y1={PAD_T - 10} x2={divX} y2={PAD_T + cH + 4} stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3,3" />
        <text x={divX - 5} y={PAD_T - 4} fill="rgba(255,255,255,0.28)" fontSize="8.5" textAnchor="end">◀ Realizado</text>
        <text x={divX + 5} y={PAD_T - 4} fill="rgba(13,148,136,0.7)"  fontSize="8.5">Forecast ▶</text>

        {/* Shaded forecast area */}
        <rect x={divX} y={PAD_T} width={CHART_W - PAD_R - divX} height={cH} fill="rgba(13,148,136,0.04)" />

        {/* Meta path (dashed) */}
        <path d={metaPath} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="5,4" />

        {/* Realizado path (solid blue) */}
        <path d={realPath} fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Forecast path (dashed teal) */}
        <path d={projPath} fill="none" stroke="#0d9488" strokeWidth="2.2" strokeDasharray="6,4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Realizado dots */}
        {historico.map((h, i) => (
          <g key={i}>
            <circle cx={cpx(i)} cy={cpy(h.real)} r="4.5" fill="#3b82f6" stroke="#2a2a2e" strokeWidth="2" />
            <title>{`${h.mes}: R$ ${h.real.toLocaleString("pt-BR")}K`}</title>
          </g>
        ))}

        {/* Forecast dots */}
        {forecast.map((f, i) => (
          <g key={i}>
            <circle cx={cpx(historico.length + i)} cy={cpy(f.proj)} r="4" fill="#0d9488" stroke="#2a2a2e" strokeWidth="2" />
            <title>{`${f.mes}: R$ ${f.proj.toLocaleString("pt-BR")}K`}</title>
          </g>
        ))}

        {/* X-axis labels */}
        {allMonths.map((d, i) => (
          <text
            key={i}
            x={cpx(i)}
            y={PAD_T + cH + 16}
            fill={i < historico.length ? "rgba(255,255,255,0.40)" : "rgba(13,148,136,0.60)"}
            fontSize="9.5"
            textAnchor="middle"
          >
            {d.label}
          </text>
        ))}

        {/* Baseline */}
        <line x1={PAD_L} y1={PAD_T + cH} x2={CHART_W - PAD_R} y2={PAD_T + cH} stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export function AnaliseAnual() {
  const maxBar = Math.max(...historico.map((h) => Math.max(h.meta, h.real)), ...forecast.map((f) => Math.max(f.meta, f.proj)));

  return (
    <div className="space-y-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "YTD Receita (Jan–Mar/26)",
            value: fmt(ytdReal),
            sub: `Meta YTD: ${fmt(ytdMeta)}`,
            badge: <PctBadge pct={ytdPct} />,
            color: "#3b82f6",
          },
          {
            label: "Projeção Anual 2026",
            value: fmt(projTotal),
            sub: "Realizado + Forecast",
            badge: null,
            color: "#10b981",
          },
          {
            label: "Meta Anual 2026",
            value: fmt(metaAnual),
            sub: "12 meses consolidado",
            badge: null,
            color: "#f0c040",
          },
          {
            label: "Atingimento Projetado",
            value: `${projPct.toFixed(1)}%`,
            sub: projPct >= 100 ? "Acima da meta anual" : "Abaixo da meta anual",
            badge: <PctBadge pct={projPct} />,
            color: projPct >= 100 ? "#10b981" : "#d97706",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/7"
            style={{ background: "#343438" }}
          >
            <div className="text-[10px] text-white/40 mb-2 uppercase tracking-wide leading-tight">{c.label}</div>
            <div
              style={{ fontFamily: "'Playfair Display', serif", color: c.color }}
              className="text-xl font-bold mb-1"
            >
              {c.value}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-white/35">{c.sub}</span>
              {c.badge}
            </div>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <GraficoLinha />

      {/* Annual progress bar */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <Target size={14} className="text-[#f0c040]" />
              Progresso da Meta Anual 2026
            </div>
            <div className="text-xs text-white/35 mt-0.5">YTD realizado + projeção para os meses restantes</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-[#10b981]">{projPct.toFixed(1)}%</div>
            <div className="text-[10px] text-white/35">da meta</div>
          </div>
        </div>
        <div className="h-4 rounded-full bg-white/8 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${Math.min(projPct, 110)}%`,
              background: "linear-gradient(to right, #1e40af, #3b82f6, #10b981)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/40"
            style={{ left: "100%" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/30 mt-1.5">
          <span>R$ 0</span>
          <span className="text-white/50">Meta: {fmt(metaAnual)}</span>
          <span>Proj: {fmt(projTotal)}</span>
        </div>

        {projPct >= 100 ? (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs">
            <TrendingUp size={12} />
            No ritmo atual, a empresa projeta encerrar 2026 {projPct.toFixed(1) > "100.0" ? "acima" : "dentro"} da meta anual — sinal positivo de performance.
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] text-xs">
            <AlertTriangle size={12} />
            Atenção: ritmo atual projeta {(metaAnual - projTotal).toFixed(0) !== "NaN" ? fmt(metaAnual - projTotal) : ""} abaixo da meta anual. Aceleração comercial recomendada.
          </div>
        )}
      </div>

      {/* Histórico Meta vs Realizado */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2">
          <Calendar size={14} className="text-[#3b82f6]" />
          <h3 className="text-sm font-semibold text-white">Histórico — Meta vs Realizado (Out/25 – Mar/26)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/7" style={{ background: "#2a2a2e" }}>
                {["Mês", "Meta", "Realizado", "Variação", "% Ating.", "Status"].map((h, i) => (
                  <th key={i} className={`px-4 py-3 text-[10px] font-semibold text-white/40 uppercase tracking-wide ${i > 0 ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {historico.map((row, i) => {
                const pct    = (row.real / row.meta) * 100;
                const delta  = row.real - row.meta;
                const isYtd  = row.tipo === "ytd";
                const good   = pct >= 100;
                return (
                  <tr
                    key={i}
                    className="hover:bg-white/2 transition-colors"
                    style={isYtd ? { background: "#2e2e36" } : {}}
                  >
                    <td className="px-4 py-3 text-white/70 font-medium">
                      {row.mes}
                      {isYtd && (
                        <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-[#3b82f6]/20 text-[#60a5fa]">YTD</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-white/55">{fmt(row.meta)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-white">{fmt(row.real)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${delta >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                      {delta >= 0 ? "+" : ""}{fmt(delta)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <PctBadge pct={pct} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-[10px] font-medium ${good ? "text-[#10b981]" : pct >= 95 ? "text-[#d97706]" : "text-[#ef4444]"}`}>
                        {good ? "✓ Meta" : pct >= 95 ? "~ Perto" : "✗ Abaixo"}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* YTD total row */}
              <tr className="font-semibold" style={{ background: "#303038" }}>
                <td className="px-4 py-3 text-white">Total YTD (Jan–Mar/26)</td>
                <td className="px-4 py-3 text-right text-white/70">{fmt(ytdMeta)}</td>
                <td className="px-4 py-3 text-right text-white">{fmt(ytdReal)}</td>
                <td className={`px-4 py-3 text-right ${ytdReal >= ytdMeta ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                  {ytdReal >= ytdMeta ? "+" : ""}{fmt(ytdReal - ytdMeta)}
                </td>
                <td className="px-4 py-3 text-right"><PctBadge pct={ytdPct} /></td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[10px] text-[#10b981] font-bold">YTD</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecast */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2">
          <BarChart2 size={14} className="text-[#0d9488]" />
          <h3 className="text-sm font-semibold text-white">Forecast — Projeção Abr–Dez/26</h3>
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#0d9488]/20 text-[#0d9488]">Projeção baseada em tendência</span>
        </div>

        {/* Bar chart */}
        <div className="p-5">
          <div className="flex items-end gap-2 h-36 mb-3">
            {forecast.map((f, i) => {
              const mH = (f.meta / maxBar) * 100;
              const pH = (f.proj / maxBar) * 100;
              const over = f.proj >= f.meta;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end group">
                  <div className="w-full flex gap-0.5 items-end justify-center h-full">
                    <div
                      className="flex-1 rounded-t-sm bg-white/15 group-hover:bg-white/25 transition-colors"
                      style={{ height: `${mH}%` }}
                    />
                    <div
                      className="flex-1 rounded-t-sm transition-colors"
                      style={{
                        height: `${pH}%`,
                        background: over ? "#10b98199" : "#d9770699",
                      }}
                    />
                  </div>
                  <div className="text-[8px] text-white/30 mt-1 text-center leading-tight">{f.mes.split("/")[0]}</div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 text-[10px] text-white/40 mb-4">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-white/20" />Meta</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]/60" />Forecast acima</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]/60" />Forecast abaixo</span>
          </div>

          {/* Forecast table compact */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/7">
                  {["Mês", "Meta", "Forecast", "% vs Meta"].map((h, i) => (
                    <th key={i} className={`py-2 text-[10px] font-semibold text-white/35 uppercase ${i > 0 ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {forecast.map((f, i) => {
                  const pct = (f.proj / f.meta) * 100;
                  return (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="py-2 text-white/60">{f.mes}</td>
                      <td className="py-2 text-right text-white/40">{fmt(f.meta)}</td>
                      <td className="py-2 text-right font-medium text-white/80">{fmt(f.proj)}</td>
                      <td className="py-2 text-right"><PctBadge pct={pct} /></td>
                    </tr>
                  );
                })}
                {/* Forecast subtotal */}
                <tr className="font-semibold border-t border-white/10" style={{ background: "#303038" }}>
                  <td className="py-2.5 text-white">Total Forecast (Abr–Dez)</td>
                  <td className="py-2.5 text-right text-white/60">{fmt(forecast.reduce((s, f) => s + f.meta, 0))}</td>
                  <td className="py-2.5 text-right text-white">{fmt(forecast.reduce((s, f) => s + f.proj, 0))}</td>
                  <td className="py-2.5 text-right">
                    <PctBadge pct={(forecast.reduce((s, f) => s + f.proj, 0) / forecast.reduce((s, f) => s + f.meta, 0)) * 100} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Consolidated 2026 */}
      <div className="rounded-xl border border-[#f0c040]/20 bg-[#343438] p-5">
        <div className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Target size={14} className="text-[#f0c040]" />
          Visão Consolidada 2026 — Receita Bruta
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: "Realizado YTD", value: fmt(ytdReal), color: "#3b82f6", sub: "Jan–Mar/26" },
            { label: "Forecast Restante", value: fmt(forecast.reduce((s, f) => s + f.proj, 0)), color: "#0d9488", sub: "Abr–Dez/26" },
            { label: "Projeção Total", value: fmt(projTotal), color: "#10b981", sub: "Ano completo" },
            { label: "Meta Anual", value: fmt(metaAnual), color: "#f0c040", sub: `${projPct.toFixed(1)}% atingido` },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl border border-white/7" style={{ background: "#2a2a2e" }}>
              <div className="text-[10px] text-white/35 mb-1.5 uppercase tracking-wide">{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: s.color }} className="text-base font-bold">
                {s.value}
              </div>
              <div className="text-[10px] text-white/30 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
