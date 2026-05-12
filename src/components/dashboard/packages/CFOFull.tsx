import { TrendingUp, TrendingDown, Building2, Calendar, Download, DollarSign, Percent, BarChart3, FileText } from "lucide-react";

const KPI_CARDS = [
  { label: "Receita Bruta", value: "R$ 1,54M", vs: "+8,2% vs Fev", cor: "#10b981", icon: <DollarSign size={14} /> },
  { label: "Lucro Líquido", value: "R$ 171K", vs: "+11,4% vs Fev", cor: "#10b981", icon: <TrendingUp size={14} /> },
  { label: "EBITDA", value: "18,3%", vs: "Meta: 20%", cor: "#d97706", icon: <Percent size={14} /> },
  { label: "Margem Líquida", value: "11,1%", vs: "Meta: 12%", cor: "#d97706", icon: <BarChart3 size={14} /> },
  { label: "Resultado Fin.", value: "(R$ 52K)", vs: "Custo de dívida", cor: "#ef4444", icon: <TrendingDown size={14} /> },
  { label: "Orçamento Exec.", value: "94,2%", vs: "Dentro do orçado", cor: "#10b981", icon: <TrendingUp size={14} /> },
];

const CENTROS_CUSTO = [
  { label: "Obra 1 — Residencial Norte", total: 620000, pct: 40, meta: 580000 },
  { label: "Obra 2 — Comercial Centro", total: 465000, pct: 30, meta: 440000 },
  { label: "Obra 3 — Infraestrutura Sul", total: 310000, pct: 20, meta: 290000 },
  { label: "Administrativo e Sede", total: 155000, pct: 10, meta: 160000 },
];

const VENDAS_CLIENTE = [
  { nome: "Construtora PEQ S/A", valor: 480000, pct: 31 },
  { nome: "Incorporadora Viva+", valor: 362000, pct: 23 },
  { nome: "Governo Municipal", valor: 278000, pct: 18 },
  { nome: "Holding Atlântica", valor: 216000, pct: 14 },
  { nome: "Outros (8 clientes)", valor: 204000, pct: 14 },
];

const BANCO_STATUS = [
  { banco: "Bradesco", tipo: "Capital de Giro", valor: "R$ 800K", taxa: "1,85%/mês", status: "aprovado", vencimento: "Mar/26" },
  { banco: "BTG Pactual", tipo: "Linha de Crédito CCB", valor: "R$ 2,5M", taxa: "CDI + 3,4%", status: "negociando", vencimento: "—" },
  { banco: "Caixa Econômica", tipo: "Finame Máquinas", valor: "R$ 420K", taxa: "TJLP + 2,1%", status: "em analise", vencimento: "—" },
];

const FLUXO_EXEC = [
  { mes: "Out", prev: 140, real: 128 }, { mes: "Nov", prev: 155, real: 158 },
  { mes: "Dez", prev: 180, real: 192 }, { mes: "Jan", prev: 120, real: 108 },
  { mes: "Fev", prev: 145, real: 140 }, { mes: "Mar", prev: 154, real: 171 },
];

const REUNIOES = [
  { data: "01/04/2025", tipo: "Quinzenal", status: "agendada", hora: "10h" },
  { data: "15/04/2025", tipo: "Quinzenal", status: "agendada", hora: "10h" },
  { data: "18/03/2025", tipo: "Quinzenal", status: "realizada", hora: "10h" },
];

const bancoCor: Record<string, string> = { aprovado: "#10b981", negociando: "#f0c040", "em analise": "#3b82f6" };
const bancoLabel: Record<string, string> = { aprovado: "Aprovado", negociando: "Negociando", "em analise": "Em análise" };

function fmt(v: number): string {
  return v >= 1000000 ? `R$ ${(v / 1000000).toFixed(2).replace(".", ",")}M` : `R$ ${(v / 1000).toFixed(0)}K`;
}

export function CFOFull() {
  const maxF = Math.max(...FLUXO_EXEC.map(f => Math.max(f.prev, f.real)));

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(240,192,64,0.25)", background: "linear-gradient(135deg, #2c2820 0%, #343438 100%)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0c040]/20 text-[#f0c040] font-semibold border border-[#f0c040]/30">CFO FULL</span>
              <span className="text-[10px] text-white/25">Solução completa · Reuniões quinzenais · Gestão bancária ativa</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white mb-0.5">Visão Executiva — Março 2025</h2>
            <p className="text-xs text-white/45">Construtora Horizonte S/A · Construção Civil · 115 funcionários</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30">Valor do pacote</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[#f0c040]">R$ 15–25K/mês</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {KPI_CARDS.map((k, i) => (
          <div key={i} className="rounded-xl border border-white/7 bg-[#343438] p-3.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center mb-2" style={{ background: `${k.cor}18`, color: k.cor }}>{k.icon}</div>
            <div className="text-[10px] text-white/40 mb-1">{k.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: k.cor }} className="text-base font-bold leading-tight mb-0.5">{k.value}</div>
            <div className="text-[9px]" style={{ color: `${k.cor}80` }}>{k.vs}</div>
          </div>
        ))}
      </div>

      {/* Fluxo de Caixa + Custos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Fluxo de Caixa Executivo</h3>
            <div className="flex gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-white/20" />Previsto</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#f0c040]/70" />Realizado</span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-28">
            {FLUXO_EXEC.map((h, i) => (
              <div key={i} className={`flex-1 flex flex-col items-center gap-0.5 h-full justify-end ${i === 5 ? "opacity-100" : "opacity-50"}`}>
                <div className="w-full flex gap-0.5 items-end justify-center h-full">
                  <div className="flex-1 rounded-t-sm bg-white/12" style={{ height: `${(h.prev / maxF) * 100}%` }} />
                  <div className="flex-1 rounded-t-sm" style={{ height: `${(h.real / maxF) * 100}%`, background: i === 5 ? "#f0c040bb" : "#f0c04060" }} />
                </div>
                <div className="text-[9px] text-white/30 mt-1">{h.mes}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Custos por centro */}
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Custos por Centro / Projeto</h3>
          <div className="space-y-3">
            {CENTROS_CUSTO.map((c, i) => {
              const overMeta = c.total > c.meta;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-white/65 truncate max-w-[160px]">{c.label}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-medium ${overMeta ? "text-[#ef4444]" : "text-[#10b981]"}`}>{fmt(c.total)}</span>
                      <span className="text-[10px] text-white/25">{c.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${c.pct * 2}%`, background: overMeta ? "#ef444470" : "#f0c04070" }} />
                  </div>
                  <div className="text-[9px] text-white/25 mt-0.5">Meta: {fmt(c.meta)} · {overMeta ? `+${fmt(c.total - c.meta)} acima` : "dentro do orçado"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vendas + Banco */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Vendas por cliente */}
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Receita por Cliente — Mar/25</h3>
          <div className="space-y-3">
            {VENDAS_CLIENTE.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#f0c040]/12 flex items-center justify-center flex-shrink-0">
                  <Building2 size={11} className="text-[#f0c040]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-white/65 truncate">{v.nome}</span>
                    <span className="text-[11px] text-white/70 font-medium ml-2">{fmt(v.valor)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-[#f0c040]/50" style={{ width: `${v.pct * 3}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-white/35 w-8 text-right">{v.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gestão Bancária */}
        <div className="rounded-xl border border-[#f0c040]/15 bg-[#343438] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/7 flex items-center gap-2">
            <Building2 size={13} className="text-[#f0c040]" />
            <h3 className="text-sm font-semibold text-white">Gestão Bancária Ativa</h3>
          </div>
          <div className="divide-y divide-white/5">
            {BANCO_STATUS.map((b, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-white/2 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-white/80">{b.banco} — {b.tipo}</div>
                    <div className="text-[10px] text-white/35 mt-0.5">{b.valor} · {b.taxa}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={{ background: `${bancoCor[b.status]}18`, color: bancoCor[b.status] }}>
                    {bancoLabel[b.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 text-[10px] text-white/30">DT Finance atua na negociação ativa com os bancos e acompanha todos os processos.</div>
        </div>
      </div>

      {/* Agenda + Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={14} className="text-[#f0c040]" />
            <h3 className="text-sm font-semibold text-white">Agenda — Reuniões Quinzenais</h3>
          </div>
          <div className="space-y-3">
            {REUNIOES.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-white/6 bg-white/2">
                <div>
                  <div className="text-xs font-medium text-white/80">{r.data} · {r.hora}</div>
                  <div className="text-[10px] text-white/35">{r.tipo} com sócios</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.status === "realizada" ? "bg-[#10b981]/12 text-[#10b981]" : "bg-[#3b82f6]/12 text-[#60a5fa]"}`}>
                  {r.status === "realizada" ? "Concluída" : "Agendada"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={14} className="text-[#f0c040]" />
            <h3 className="text-sm font-semibold text-white">Relatórios para Download</h3>
          </div>
          <div className="space-y-2">
            {[
              "DRE Gerencial Executivo — Mar/25",
              "Fluxo de Caixa Projetado — Abr–Jun/25",
              "Relatório de Custos por Centro — Mar/25",
              "Relatório de Vendas por Cliente — T1/25",
              "Acompanhamento Orçamentário — Mar/25",
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/3 transition-colors">
                <span className="text-xs text-white/60 truncate">{r}</span>
                <button className="flex items-center gap-1 text-[10px] text-[#f0c040]/70 hover:text-[#f0c040] transition-colors ml-3 flex-shrink-0">
                  <Download size={11} /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
