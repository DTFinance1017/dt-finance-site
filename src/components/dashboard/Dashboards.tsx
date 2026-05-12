import { useState } from "react";

const tabs = ["DRE Mês a Mês", "Análise de Lucro", "Fluxo de Caixa 90d", "Receita por Cliente", "Composição de Despesas", "Realizado vs Projetado"];

// ─── Dados com números realistas ────────────────────────────────────────────
const dreData = [
  { label: "Receita Bruta", jan: "R$ 722.419", fev: "R$ 748.162", mar: "R$ 777.251", bold: false, neg: false, hi: false },
  { label: "(-) Deduções e Impostos", jan: "(R$ 59.794)", fev: "(R$ 61.053)", mar: "(R$ 62.880)", bold: false, neg: true, hi: false },
  { label: "(=) Receita Líquida", jan: "R$ 662.625", fev: "R$ 687.109", mar: "R$ 714.371", bold: true, neg: false, hi: true },
  { label: "(-) Custos Operacionais", jan: "(R$ 381.240)", fev: "(R$ 403.817)", mar: "(R$ 425.412)", bold: false, neg: true, hi: false },
  { label: "(=) Lucro Bruto", jan: "R$ 281.385", fev: "R$ 283.292", mar: "R$ 288.959", bold: true, neg: false, hi: false },
  { label: "(-) Despesas Operacionais", jan: "(R$ 192.664)", fev: "(R$ 192.249)", mar: "(R$ 197.329)", bold: false, neg: true, hi: false },
  { label: "(=) Lucro Líquido", jan: "R$ 88.721", fev: "R$ 91.043", mar: "R$ 91.630", bold: true, neg: false, hi: true },
  { label: "Margem Líquida", jan: "13,4%", fev: "13,2%", mar: "12,8%", bold: true, neg: false, hi: false, isMarg: true },
];

const lucroComps = [
  { label: "1T26 (atual)", lucro: 271394, receita: 2247832, margem: 13.1, color: "#3b82f6", isMain: true },
  { label: "4T25 (anterior)", lucro: 248371, receita: 2038547, margem: 12.8, color: "#94a3b8", isMain: false },
  { label: "1T25 (ano ant.)", lucro: 207862, receita: 1891243, margem: 11.4, color: "#cbd5e1", isMain: false },
];

const fluxo = [
  { mes: "Abril/26",  entrada: 763420, saida: 658920, result: 104500 },
  { mes: "Maio/26",   entrada: 778340, saida: 672180, result: 106160 },
  { mes: "Junho/26",  entrada: 798430, saida: 689247, result: 109183 },
];

const clientes = [
  { name: "Cliente A", pct: 25.3, valor: 568700, color: "#3b82f6" },
  { name: "Cliente B", pct: 18.1, valor: 407060, color: "#10b981" },
  { name: "Cliente C", pct: 12.4, valor: 278730, color: "#f0c040" },
  { name: "Outros (carteira diversificada)", pct: 44.2, valor: 993342, color: "#64748b" },
];

const despesas = [
  { label: "Folha de Pagamento e Encargos", pct: 35.2, color: "#3b82f6" },
  { label: "Serviços de Terceiros", pct: 19.7, color: "#10b981" },
  { label: "Estrutura e Ocupação", pct: 15.1, color: "#0891b2" },
  { label: "Marketing e Comercial", pct: 10.4, color: "#d97706" },
  { label: "Outros / Variáveis", pct: 19.6, color: "#64748b" },
];

// ─── Realizado vs Projetado — 12 meses ────────────────────────────────────
const anual = [
  { mes: "Jan", real: 722419,  proj: null,   orc: 800000 },
  { mes: "Fev", real: 748162,  proj: null,   orc: 800000 },
  { mes: "Mar", real: 777251,  proj: null,   orc: 800000 },
  { mes: "Abr", real: null,    proj: 763420,  orc: 800000 },
  { mes: "Mai", real: null,    proj: 778340,  orc: 800000 },
  { mes: "Jun", real: null,    proj: 798430,  orc: 800000 },
  { mes: "Jul", real: null,    proj: 812680,  orc: 800000 },
  { mes: "Ago", real: null,    proj: 823540,  orc: 810000 },
  { mes: "Set", real: null,    proj: 836290,  orc: 810000 },
  { mes: "Out", real: null,    proj: 849120,  orc: 820000 },
  { mes: "Nov", real: null,    proj: 861830,  orc: 820000 },
  { mes: "Dez", real: null,    proj: 870450,  orc: 820000 },
];

const totalReal  = anual.filter(d => d.real).reduce((s, d) => s + (d.real ?? 0), 0);
const totalProj  = anual.filter(d => d.proj).reduce((s, d) => s + (d.proj ?? 0), 0);
const totalForecast = totalReal + totalProj;
const totalOrc   = anual.reduce((s, d) => s + d.orc, 0);
const maxAnual   = 950000;

function fmtK(n: number) { return "R$ " + Math.round(n / 1000).toLocaleString("pt-BR") + "K"; }
function fmtBR(n: number) { return "R$ " + n.toLocaleString("pt-BR"); }
function fmtM(n: number) { return "R$ " + (n / 1000000).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M"; }
function pct(a: number, b: number) { return ((a - b) / b * 100).toFixed(1); }

function BarGroup({ groups, max, colors }: { groups: { lbl: string; vals: number[] }[]; max: number; colors: string[] }) {
  return (
    <div className="flex items-end gap-3 h-36 mt-4">
      {groups.map((g, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
          <div className="w-full flex gap-0.5 items-end justify-center h-full">
            {g.vals.map((v, j) => (
              <div key={j} className="flex-1 rounded-t-sm transition-all duration-700"
                style={{ height: `${(v / max) * 100}%`, background: colors[j] + "99" }} />
            ))}
          </div>
          <div className="text-[9px] text-white/30 mt-1 text-center leading-tight">{g.lbl}</div>
        </div>
      ))}
    </div>
  );
}

export function Dashboards() {
  const [tab, setTab] = useState(0);

  return (
    <div className="space-y-5">
      <div className="flex gap-1 p-1 rounded-xl border border-white/7 bg-[#343438] overflow-x-auto">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all flex-shrink-0 ${tab === i ? "bg-[#1e40af]/35 text-[#60a5fa]" : "text-white/40 hover:text-white/70"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">

        {/* ── DRE MÊS A MÊS ── */}
        {tab === 0 && (
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">DRE Gerencial — Mês a Mês</h3>
            <p className="text-xs text-white/35 mb-4">1º Trimestre 2026 · Dados protegidos por LGPD</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/40 font-medium">Descrição</th>
                    <th className="text-right py-2 text-white/40 font-medium w-28">Jan/26</th>
                    <th className="text-right py-2 text-white/40 font-medium w-28">Fev/26</th>
                    <th className="text-right py-2 text-white/40 font-medium w-28">Mar/26</th>
                  </tr>
                </thead>
                <tbody>
                  {dreData.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${row.hi ? "bg-[#1e40af]/10" : i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                      <td className={`py-2.5 ${row.bold ? "font-semibold" : ""} ${(row as any).isMarg ? "text-[#10b981]" : row.neg ? "text-white/45" : "text-white/80"}`}>{row.label}</td>
                      {[row.jan, row.fev, row.mar].map((v, vi) => (
                        <td key={vi} className={`py-2.5 text-right font-mono text-[11px] ${row.bold && !row.neg ? ((row as any).isMarg ? "text-[#10b981] font-semibold" : "text-white font-semibold") : row.neg ? "text-[#f87171]" : "text-white/65"}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <BarGroup groups={[{lbl:"Janeiro",vals:[722,88]},{lbl:"Fevereiro",vals:[748,91]},{lbl:"Março",vals:[777,91]}]} max={900} colors={["#3b82f6","#10b981"]} />
              <div className="flex gap-4 mt-3 justify-center">
                {[{l:"Receita Bruta (R$ mil)",c:"#3b82f6"},{l:"Lucro Líquido (R$ mil)",c:"#10b981"}].map((leg,i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[10px] text-white/40">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: leg.c }} />{leg.l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ANÁLISE DE LUCRO ── */}
        {tab === 1 && (
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Análise de Lucro — Comparativo Trimestral</h3>
            <p className="text-xs text-white/35 mb-5">1T26 vs 4T25 (t/t) · 1T26 vs 1T25 (a/a)</p>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {lucroComps.map((c, i) => (
                <div key={i} className={`rounded-xl p-4 border ${c.isMain ? "border-[#1e40af]/40 bg-[#1e40af]/10" : "border-white/7 bg-white/[0.02]"}`}>
                  {c.isMain && <div className="text-[9px] text-[#60a5fa] font-semibold mb-2 uppercase tracking-wide">Período atual</div>}
                  <div className="text-[10px] text-white/40 mb-1">{c.label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: c.color }} className="text-xl font-bold">{fmtBR(c.lucro)}</div>
                  <div className="text-[10px] text-white/30 mb-2">Lucro Líquido</div>
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <div className="text-[10px] text-white/40">Receita: {fmtBR(c.receita)}</div>
                    <div className="text-[10px] text-white/40">Margem: {c.margem}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 text-xs justify-center mb-4">
              <div className="text-center">
                <span className="text-[#10b981] font-semibold text-sm">▲{pct(271394,248371)}%</span>
                <div className="text-[10px] text-white/35 mt-0.5">1T26 vs 4T25 (t/t) no Lucro</div>
              </div>
              <div className="text-center">
                <span className="text-[#3b82f6] font-semibold text-sm">▲{pct(271394,207862)}%</span>
                <div className="text-[10px] text-white/35 mt-0.5">1T26 vs 1T25 (a/a) no Lucro</div>
              </div>
              <div className="text-center">
                <span className="text-[#10b981] font-semibold text-sm">▲{pct(2247832,1891243)}%</span>
                <div className="text-[10px] text-white/35 mt-0.5">Receita a/a</div>
              </div>
            </div>
            <BarGroup
              groups={[{lbl:"1T25",vals:[1891,207]},{lbl:"4T25",vals:[2038,248]},{lbl:"1T26",vals:[2247,271]}]}
              max={2500} colors={["#3b82f6","#10b981"]}
            />
            <div className="flex gap-4 mt-3 justify-center">
              {[{l:"Receita Bruta (R$ mil)",c:"#3b82f6"},{l:"Lucro Líquido (R$ mil)",c:"#10b981"}].map((leg,i) => (
                <span key={i} className="flex items-center gap-1.5 text-[10px] text-white/40">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: leg.c }} />{leg.l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── FLUXO DE CAIXA 90d ── */}
        {tab === 2 && (
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Fluxo de Caixa Projetado — 90 Dias</h3>
            <p className="text-xs text-white/35 mb-5">Abril, Maio e Junho de 2026</p>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {fluxo.map((f, i) => (
                <div key={i} className="rounded-xl border border-white/7 bg-white/[0.02] p-4">
                  <div className="text-xs font-semibold text-white mb-3">{f.mes}</div>
                  {[
                    { l: "Entradas", v: f.entrada, c: "#3b82f6" },
                    { l: "Saídas", v: f.saida,   c: "#f87171" },
                    { l: "Resultado", v: f.result, c: "#10b981" },
                  ].map((r, ri) => (
                    <div key={ri} className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-white/40">{r.l}</span>
                      <span className="text-sm font-bold font-mono" style={{ color: r.c }}>{fmtK(r.v)}</span>
                    </div>
                  ))}
                  <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div className="h-full rounded-full bg-[#10b981]" style={{ width: `${(f.result / f.entrada) * 100}%` }} />
                  </div>
                  <div className="text-[9px] text-white/30 mt-1">Margem: {((f.result / f.entrada) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-[#1e40af]/30 bg-[#1e40af]/8">
              {[
                { l: "Total Entradas", v: fmtBR(fluxo.reduce((s,f)=>s+f.entrada,0)), c: "#60a5fa" },
                { l: "Total Saídas",   v: fmtBR(fluxo.reduce((s,f)=>s+f.saida,0)),   c: "#f87171" },
                { l: "Resultado 90d",  v: "+"+fmtBR(fluxo.reduce((s,f)=>s+f.result,0)), c: "#10b981" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[10px] text-white/35 mb-1">{s.l}</div>
                  <div className="text-sm font-bold font-mono" style={{ color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RECEITA POR CLIENTE ── */}
        {tab === 3 && (
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Receita por Cliente — 1º Trimestre 2026</h3>
            <p className="text-xs text-white/35 mb-5">Distribuição % da Receita Bruta · Dados protegidos por LGPD</p>
            <div className="space-y-4">
              {clientes.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/70 font-medium">{c.name}</span>
                    <span className="font-semibold text-white font-mono">{c.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/8 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5 font-mono">≈ {fmtBR(c.valor)} no trimestre</div>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 rounded-xl border border-[#d97706]/25 bg-[#d97706]/8">
              <div className="text-xs font-semibold text-[#d97706] mb-1.5">⚠ Análise de Concentração</div>
              <div className="text-xs text-[#d97706]/80 leading-relaxed">
                Cliente A responde por 25,3% da receita trimestral. Os três principais somam 55,8% — nível de atenção. Recomenda-se estratégia de diversificação para reduzir Cliente A para &lt;20% em 12 meses.
              </div>
            </div>
          </div>
        )}

        {/* ── COMPOSIÇÃO DE DESPESAS ── */}
        {tab === 4 && (
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Composição de Despesas Operacionais</h3>
            <p className="text-xs text-white/35 mb-5">1º Tri/2026 — participação % sobre despesas totais</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative flex items-center justify-center">
                <div className="w-40 h-40 rounded-full" style={{
                  background: `conic-gradient(#3b82f6 0% 35.2%, #10b981 35.2% 54.9%, #0891b2 54.9% 70%, #d97706 70% 80.4%, #64748b 80.4% 100%)`
                }} />
                <div className="absolute w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "#343438" }}>
                  <div className="text-center">
                    <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">100%</div>
                    <div className="text-[9px] text-white/40">1º Tri/2026</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {despesas.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{e.label}</span>
                      <span className="font-semibold text-white">{e.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${e.pct}%`, background: e.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 p-4 rounded-xl border border-white/8 bg-white/[0.02]">
              <div className="text-xs text-white/50 leading-relaxed">
                Folha (35,2%) é o maior componente — padrão de empresa de serviços de alta especialização. Serviços + Marketing = 30,1% combinados. Monitoramento mensal recomendado para preservar margem líquida acima de 12%.
              </div>
            </div>
          </div>
        )}

        {/* ── REALIZADO VS META ACUMULADA + FORECAST ── */}
        {tab === 5 && (() => {
          // ── Dados exatos conforme tabela ─────────────────────────────────
          const MES    = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
          const ANNUAL = 9600000;

          // Realizado Acumulado (Jan-Mar real + Abr-Dez forecast a 749K/mês)
          const cumAll = [722000,1470000,2247000,2996000,3745000,4494000,5243000,5992000,6741000,7490000,8239000,8988000];
          // Meta Acumulada (800K × mês)
          const cumMeta= [800000,1600000,2400000,3200000,4000000,4800000,5600000,6400000,7200000,8000000,8800000,9600000];

          const totR   = 2247000;   // realizado Q1
          const q1Meta = 2400000;   // meta Q1
          const projEnd= 8988000;   // projeção anual ao ritmo Q1
          const achPct = (totR / q1Meta * 100);   // 93,625%
          const gap    = projEnd - ANNUAL;         // -612.000

          // ── SVG ──────────────────────────────────────────────────────────
          const N=12, PL=46, PR=24, PT=18, PB=30, W=560, H=190;
          const EW=W-PL-PR, EH=H-PT-PB;
          const MAX=10200000;
          const px = (i: number) => PL + i * EW / (N-1);
          const py = (v: number) => PT + (1 - v/MAX) * EH;

          // Solid Jan–Mar (realizado)
          const pathR = cumAll.slice(0,3).map((v,i)=>`${i===0?"M":"L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
          // Dashed Mar–Dez (forecast, ancora em Mar = índice 2)
          const pathF = cumAll.slice(2).map((v,i)=>`${i===0?"M":"L"}${px(2+i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
          // Meta acumulada Jan–Dez
          const pathM = cumMeta.map((v,i)=>`${i===0?"M":"L"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

          const fmtMi = (v: number) => (v/1000000).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})+"M";
          const achStr = achPct.toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1});

          return (
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Receita Acumulada — Realizado vs Meta 2026</h3>
              <p className="text-xs text-white/35 mb-3">Jan–Dez/26 · Meta 800K/mês acumulada · Forecast ao ritmo 1º Tri · Dados protegidos por LGPD</p>

              {/* Barra de progresso 1º Tri */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold" style={{ color: "#f87171" }}>
                    {achStr}% da meta 1º Tri atingida
                  </span>
                  <span className="text-white/35">Realiz. {fmtBR(totR)} de {fmtBR(q1Meta)}</span>
                </div>
                <div className="h-5 rounded-lg bg-white/8 overflow-hidden relative">
                  <div className="h-full rounded-lg flex items-center justify-start pl-3"
                    style={{ width: `${achPct}%`, background: "linear-gradient(90deg,#b45309,#f87171)" }}>
                    <span className="text-[9px] font-bold text-white">{achStr}%</span>
                  </div>
                  <div className="absolute top-0 h-full flex items-center" style={{ left: "100%", transform: "translateX(-1px)" }}>
                    <div className="w-px h-full bg-white/20" />
                  </div>
                </div>
                <p className="text-[10px] text-white/40 mt-1.5">
                  Ao ritmo atual (média R$749K/mês), o faturamento anual projetado é {fmtMi(projEnd)} —{" "}
                  gap de {fmtBR(-gap)} ({((gap/ANNUAL)*100).toFixed(1).replace(".",",")}%) vs meta de {fmtMi(ANNUAL)}.{" "}
                  Recomendado: acelerar faturamento e revisar política de desconto.
                </p>
              </div>

              {/* Legenda */}
              <div className="flex gap-5 mb-2 justify-end flex-wrap">
                {[
                  { l:"Realizado acum. (Jan–Mar)", c:"#3b82f6", w:2.5, d:"none"  },
                  { l:"Forecast ao ritmo 1º Tri",      c:"#f97316", w:1.8, d:"5,3"   },
                  { l:"Meta acum. (800K/mês)",     c:"#10b981", w:1.5, d:"5,3"   },
                ].map((g,i)=>(
                  <span key={i} className="flex items-center gap-1.5 text-[10px] text-white/45">
                    <svg width="22" height="8" viewBox="0 0 22 8">
                      <line x1="0" y1="4" x2="22" y2="4" stroke={g.c} strokeWidth={g.w} strokeDasharray={g.d}/>
                    </svg>
                    {g.l}
                  </span>
                ))}
              </div>

              {/* Gráfico SVG */}
              <div className="rounded-xl border border-white/7 bg-white/[0.02] p-2 overflow-hidden">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:190}}>
                  {/* Linhas de grade horizontais */}
                  {[2e6,4e6,6e6,8e6,9.6e6].map(v=>{
                    const gy=py(v); const isAnual=v===9.6e6;
                    return (
                      <g key={v}>
                        <line x1={PL} y1={gy} x2={W-PR} y2={gy}
                          stroke={isAnual?"#10b98130":"#ffffff08"} strokeWidth={isAnual?1:0.5}
                          strokeDasharray={isAnual?"4,3":"none"}/>
                        <text x={PL-3} y={gy+3} fill={isAnual?"#10b98170":"#ffffff28"} fontSize="7" textAnchor="end">
                          {isAnual?"9,6M":((v/1e6).toLocaleString("pt-BR",{maximumFractionDigits:0})+"M")}
                        </text>
                      </g>
                    );
                  })}
                  {/* Divider: borda direita de Mar = px(2) */}
                  <line x1={px(2)} y1={PT-2} x2={px(2)} y2={H-PB+2}
                    stroke="#ffffff25" strokeWidth="0.8" strokeDasharray="3,2"/>
                  <text x={px(2)} y={PT-5} fill="#ffffff30" fontSize="6" textAnchor="middle">1º Tri encerrado →</text>

                  {/* Meta acumulada (verde tracejado) */}
                  <path d={pathM} fill="none" stroke="#10b981" strokeWidth="1.5"
                    strokeDasharray="5,3" strokeLinejoin="round"/>
                  {/* Label meta final */}
                  <text x={W-PR+3} y={py(ANNUAL)+3} fill="#10b98188" fontSize="7" textAnchor="start">9,6M</text>

                  {/* Forecast ao ritmo 1º Tri (laranja tracejado) */}
                  <path d={pathF} fill="none" stroke="#f97316" strokeWidth="1.8"
                    strokeDasharray="5,3" strokeLinejoin="round" strokeLinecap="round"/>
                  {/* Label forecast final */}
                  <text x={W-PR+3} y={py(projEnd)+3} fill="#f9731688" fontSize="7" textAnchor="start">{fmtMi(projEnd)}</text>

                  {/* Realizado Jan–Mar (azul sólido, espesso) */}
                  <path d={pathR} fill="none" stroke="#3b82f6" strokeWidth="2.8"
                    strokeLinejoin="round" strokeLinecap="round"/>

                  {/* Pontos realizado (Jan–Mar) */}
                  {cumAll.slice(0,3).map((v,i)=>(
                    <circle key={i} cx={px(i)} cy={py(v)} r={i===2?4.5:3} fill={i===2?"#93c5fd":"#3b82f6"}/>
                  ))}
                  {/* Labels dos valores realizados */}
                  {cumAll.slice(0,3).map((v,i)=>(
                    <text key={i} x={px(i)} y={py(v)-(i===2?7:6)} fill="#93c5fd" fontSize="7" textAnchor="middle">
                      {fmtMi(v)}
                    </text>
                  ))}

                  {/* Eixo X */}
                  {MES.map((l,i)=>(
                    <text key={i} x={px(i)} y={H-12} fill={i<=2?"#93c5fd55":"#ffffff25"} fontSize="7.5" textAnchor="middle">{l}</text>
                  ))}
                  <text x={px(6)} y={H-3} fill="#ffffff15" fontSize="6" textAnchor="middle">2026</text>
                </svg>
              </div>

              {/* Cards resumo */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  {l:"Realizado 1º Tri",    v:fmtBR(totR),        sub:"Jan + Fev + Mar",      c:"#3b82f6"},
                  {l:"Meta 1º Tri",         v:fmtBR(q1Meta),      sub:"R$ 800K × 3 meses",    c:"#10b981"},
                  {l:"Forecast Anual",  v:fmtMi(projEnd),     sub:"ao ritmo médio 1º Tri",     c:"#f97316"},
                  {l:"Gap vs Meta",     v:fmtBR(gap),         sub:"projeção − meta anual", c:"#f87171"},
                ].map((s,i)=>(
                  <div key={i} className="rounded-xl border border-white/7 bg-white/[0.02] p-3 text-center">
                    <div className="text-[9px] text-white/35 mb-1">{s.l}</div>
                    <div className="text-sm font-bold font-mono" style={{color:s.c}}>{s.v}</div>
                    <div className="text-[9px] text-white/25 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
