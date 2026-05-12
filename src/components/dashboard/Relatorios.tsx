import { useState } from "react";
import { FileText, Download, Eye, PlusCircle, Clock, Loader2 } from "lucide-react";
import { gerarRelatorio, ReportType } from "../../utils/gerarRelatorio";

const reports: {
  name: string;
  type: ReportType;
  date: string;
  status: "ready" | "processing";
  pages: number | null;
  periodo: string;
}[] = [
  { name: "Relatório Executivo — Mar/25", type: "Executivo", date: "01/04/2025", status: "ready", pages: 12, periodo: "Março 2025" },
  { name: "DRE Gerencial — Mar/25", type: "DRE", date: "01/04/2025", status: "ready", pages: 8, periodo: "Março 2025" },
  { name: "Análise de Caixa — Mar/25", type: "Caixa", date: "01/04/2025", status: "processing", pages: null, periodo: "Março 2025" },
  { name: "Alertas Financeiros — Mar/25", type: "Alertas", date: "01/04/2025", status: "processing", pages: null, periodo: "Março 2025" },
  { name: "Relatório Executivo — Fev/25", type: "Executivo", date: "03/03/2025", status: "ready", pages: 11, periodo: "Fevereiro 2025" },
  { name: "DRE Gerencial — Fev/25", type: "DRE", date: "03/03/2025", status: "ready", pages: 8, periodo: "Fevereiro 2025" },
  { name: "Análise de Caixa — Fev/25", type: "Caixa", date: "03/03/2025", status: "ready", pages: 6, periodo: "Fevereiro 2025" },
  { name: "Alertas Financeiros — Fev/25", type: "Alertas", date: "03/03/2025", status: "ready", pages: 4, periodo: "Fevereiro 2025" },
];

const typeColors: Record<ReportType, string> = {
  Executivo: "#3b82f6",
  DRE: "#10b981",
  Caixa: "#f0c040",
  Alertas: "#d97706",
};

export function Relatorios() {
  const [loading, setLoading] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);

  async function handleDownload(r: typeof reports[0], index: number) {
    setLoading(index);
    try {
      await gerarRelatorio(r.type, r.periodo, r.name);
    } finally {
      setLoading(null);
    }
  }

  async function handleGerarExecutivo() {
    setGenerating(true);
    try {
      await gerarRelatorio("Executivo", "Março 2025", "Relatório Executivo — Mar/25");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGerarExecutivo}
          disabled={generating}
          className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {generating ? (
            <><Loader2 size={16} className="animate-spin" /> Gerando PDF...</>
          ) : (
            <><PlusCircle size={16} /> Gerar Relatório Executivo</>
          )}
        </button>
        <select className="text-xs px-3 py-2.5 rounded-xl border border-white/10 bg-[#343438] text-white/60 outline-none cursor-pointer">
          <option>Março 2025</option>
          <option>Fevereiro 2025</option>
          <option>Janeiro 2025</option>
        </select>
      </div>

      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7">
          <h3 className="text-sm font-semibold text-white">Repositório de Relatórios</h3>
          <p className="text-xs text-white/35 mt-0.5">
            Clique em <Download size={10} className="inline" /> para baixar o PDF completo
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {reports.map((r, i) => {
            const color = typeColors[r.type] || "#6b7280";
            const isLoading = loading === i;
            return (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <FileText size={16} style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/80 font-medium truncate">{r.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                      style={{ background: `${color}18`, color }}
                    >
                      {r.type}
                    </span>
                    <span className="text-[10px] text-white/30">{r.date}</span>
                    {r.pages && (
                      <span className="text-[10px] text-white/25">{r.pages} páginas</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {r.status === "ready" ? (
                    <>
                      <button
                        className="p-2 rounded-lg border border-white/8 text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                        title="Visualizar"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDownload(r, i)}
                        disabled={isLoading}
                        className="p-2 rounded-lg border border-white/8 text-white/40 hover:text-[#3b82f6] hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/10 transition-colors disabled:opacity-50"
                        title="Download PDF"
                      >
                        {isLoading ? (
                          <Loader2 size={14} className="animate-spin text-[#3b82f6]" />
                        ) : (
                          <Download size={14} />
                        )}
                      </button>
                    </>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-[#f0c040]/15 text-[#f0c040]">
                      <Clock size={10} /> Gerando
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
        <h4 className="text-sm font-semibold text-white mb-3">Sobre os relatórios</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/45 leading-relaxed">
          <div>
            <strong className="text-white/70 block mb-1">Relatório Executivo</strong>
            Visão consolidada do mês com KPIs, DRE gerencial, fluxo de caixa e alertas identificados pela DT Finance. Download em PDF com logo.
          </div>
          <div>
            <strong className="text-white/70 block mb-1">DRE Gerencial</strong>
            Demonstrativo de Resultado gerencial com análise de margens, variâncias e comparativo de 3 meses.
          </div>
          <div>
            <strong className="text-white/70 block mb-1">Análise de Caixa</strong>
            Fluxo de caixa realizado versus projetado, com mapeamento de descasamentos e recomendações.
          </div>
          <div>
            <strong className="text-white/70 block mb-1">Alertas Financeiros</strong>
            Alertas críticos e pontos de atenção identificados pelo sistema com ações recomendadas.
          </div>
        </div>
      </div>
    </div>
  );
}
