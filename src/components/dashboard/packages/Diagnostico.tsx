import { AlertTriangle, Download, CheckCircle2, ArrowRight, FileText, FileSpreadsheet, ClipboardList } from "lucide-react";

const ACHADOS = [
  { tipo: "critico", texto: "Margem real apurada: 8,2% — estimativa dos sócios era 20%" },
  { tipo: "critico", texto: "Inadimplência de 12% no faturamento, sem controle ou aging de recebíveis" },
  { tipo: "atencao", texto: "2 contratos de capital de giro com CET de 3,4% ao mês (acima do mercado)" },
  { tipo: "atencao", texto: "R$ 2.800/mês em despesas pessoais lançadas no CNPJ — mistura PF/PJ" },
  { tipo: "info", texto: "Sem DRE estruturado há mais de 3 anos — dados baseados no extrato bancário" },
  { tipo: "info", texto: "Fluxo de caixa gerenciado de forma intuitiva, sem projeção formal" },
];

const INDICADORES = [
  { label: "Margem Líquida Real", value: "8,2%", ref: "estimavam 20%", color: "#d97706", bad: true },
  { label: "Endividamento", value: "74%", ref: "recomendado: < 50%", color: "#ef4444", bad: true },
  { label: "Liquidez Corrente", value: "0,72", ref: "recomendado: > 1,0", color: "#ef4444", bad: true },
  { label: "Inadimplência", value: "12%", ref: "esperavam 2–3%", color: "#d97706", bad: true },
];

const PROXIMOS = [
  "Separação imediata de despesas PF/PJ",
  "Renegociação dos contratos bancários (potencial de R$ 3.200/mês de economia)",
  "Implantação da Planilha de Fluxo de Caixa modelo",
  "Estruturação do DRE simplificado com dados dos últimos 12 meses",
  "Definição de política de recebimento e controle de inadimplência",
];

const DOWNLOADS = [
  { nome: "DRE Simplificado — Modelo DT Finance", tipo: "XLSX", icon: <FileSpreadsheet size={16} /> },
  { nome: "Planilha de Fluxo de Caixa — 12 meses", tipo: "XLSX", icon: <FileSpreadsheet size={16} /> },
  { nome: "Checklist de Organização Financeira", tipo: "PDF", icon: <FileText size={16} /> },
  { nome: "Relatório de Diagnóstico Inicial", tipo: "PDF", icon: <ClipboardList size={16} /> },
];

export function Diagnostico() {
  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(13,148,136,0.30)", background: "linear-gradient(135deg, #1e2824 0%, #343438 100%)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0d9488]/20 text-[#2dd4bf] font-semibold border border-[#0d9488]/30">PACOTE DIAGNÓSTICO</span>
              <span className="text-[10px] text-white/25">Entrega única · Sem acompanhamento recorrente</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white mb-0.5">
              Diagnóstico Financeiro Inicial
            </h2>
            <p className="text-xs text-white/45">Artesanal Bordados Ltda · Confecção · Microempresa</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/30">Valor do pacote</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#0d9488]">R$ 2.500</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d97706]/10 border border-[#d97706]/20">
          <AlertTriangle size={13} className="text-[#d97706] flex-shrink-0" />
          <p className="text-xs text-[#d97706]/80">Diagnóstico concluído. 6 pontos críticos identificados que precisam de atenção imediata.</p>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INDICADORES.map((ind, i) => (
          <div key={i} className="rounded-xl border border-white/7 bg-[#343438] p-4">
            <div className="text-[10px] text-white/40 mb-2">{ind.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: ind.color }} className="text-2xl font-bold mb-1">{ind.value}</div>
            <div className="text-[10px]" style={{ color: `${ind.color}99` }}>{ind.ref}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Achados */}
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Principais Achados</h3>
          <div className="space-y-3">
            {ACHADOS.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.tipo === "critico" ? "bg-red-400" : a.tipo === "atencao" ? "bg-[#d97706]" : "bg-white/30"}`} />
                <p className="text-xs text-white/60 leading-relaxed">{a.texto}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-[10px] text-white/35">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />Crítico</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />Atenção</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white/30" />Informação</span>
          </div>
        </div>

        {/* Próximos passos */}
        <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Próximos Passos Recomendados</h3>
          <div className="space-y-3">
            {PROXIMOS.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#0d9488]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-bold text-[#0d9488]">{i + 1}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/7">
            <p className="text-[10px] text-white/35 leading-relaxed">
              Quer avançar? O pacote <span className="text-[#3b82f6]">CFO Light</span> inclui acompanhamento mensal, DRE recorrente e reuniões com os sócios a partir de R$ 3.000/mês.
            </p>
          </div>
        </div>
      </div>

      {/* Downloads */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7">
          <h3 className="text-sm font-semibold text-white">Arquivos do Pacote</h3>
          <p className="text-xs text-white/35 mt-0.5">4 arquivos incluídos no Diagnóstico</p>
        </div>
        <div className="divide-y divide-white/5">
          {DOWNLOADS.map((d, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0d9488]/15 flex items-center justify-center text-[#2dd4bf]">{d.icon}</div>
                <div>
                  <div className="text-sm text-white/75">{d.nome}</div>
                  <div className="text-[10px] text-white/30">{d.tipo}</div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0d9488]/30 text-[#2dd4bf] text-xs hover:bg-[#0d9488]/10 transition-colors">
                <Download size={12} /> Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
