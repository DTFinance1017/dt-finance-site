import { useState } from "react";
import { Upload, Check, Clock, FileText, X, ChevronDown } from "lucide-react";

const CLIENTES = ["Empresa ABC Ltda", "Distribuidora XYZ", "Indústria Delta S/A", "Clínica Saúde+"];
const MESES = ["Março 2025", "Fevereiro 2025", "Janeiro 2025"];

const DOC_CATEGORIES = [
  {
    label: "Receita — Entradas",
    color: "#3b82f6",
    docs: [
      { name: "Notas Fiscais de Venda (NF-e / NFS-e)", status: "uploaded", date: "12/03/25" },
      { name: "Relatórios de Vendas", status: "uploaded", date: "12/03/25" },
      { name: "Cancelamentos e Devoluções", status: "pending", date: "—" },
    ],
  },
  {
    label: "Custos e Despesas — Saídas",
    color: "#d97706",
    docs: [
      { name: "Notas Fiscais de Compra (CMV/Insumos)", status: "uploaded", date: "13/03/25" },
      { name: "Serviços de Terceiros", status: "processing", date: "13/03/25" },
      { name: "Contas Fixas (água, luz, aluguel, internet)", status: "uploaded", date: "12/03/25" },
      { name: "Folha de Pagamento (salários, encargos, pró-labore)", status: "pending", date: "—" },
    ],
  },
  {
    label: "Financeiro e Tributário",
    color: "#10b981",
    docs: [
      { name: "Extratos Bancários", status: "uploaded", date: "12/03/25" },
      { name: "Guias de Impostos (Simples, ISS, PIS/COFINS)", status: "uploaded", date: "12/03/25" },
      { name: "Juros e Taxas Financeiras", status: "processing", date: "13/03/25" },
    ],
  },
];

const statusConfig = {
  uploaded:   { label: "Enviado",     color: "#10b981", icon: <Check size={11} /> },
  processing: { label: "Processando", color: "#f0c040", icon: <Clock size={11} className="animate-spin" /> },
  pending:    { label: "Pendente",    color: "#6b7280", icon: <Clock size={11} /> },
};

export function UploadDocsInterno() {
  const [cliente, setCliente] = useState(CLIENTES[0]);
  const [mes, setMes] = useState(MESES[0]);
  const [dragging, setDragging] = useState(false);

  const totalDocs = DOC_CATEGORIES.flatMap(c => c.docs).length;
  const uploaded = DOC_CATEGORIES.flatMap(c => c.docs).filter(d => d.status === "uploaded").length;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-white">Upload de Documentos</h2>
            <p className="text-xs text-white/40 mt-0.5">Classifique e envie os documentos por cliente e competência</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={cliente} onChange={(e) => setCliente(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-white/10 bg-[#2a2a2e] text-white/70 outline-none cursor-pointer">
              {CLIENTES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={mes} onChange={(e) => setMes(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-white/10 bg-[#2a2a2e] text-white/70 outline-none cursor-pointer">
              {MESES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>{uploaded} de {totalDocs} documentos recebidos</span>
            <span>{Math.round((uploaded / totalDocs) * 100)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#10b981] transition-all duration-700"
              style={{ width: `${(uploaded / totalDocs) * 100}%` }} />
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer group ${dragging ? "border-[#3b82f6]/70 bg-[#3b82f6]/8" : "border-white/12 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/4"}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform ${dragging ? "scale-110 bg-[#3b82f6]/25" : "bg-[#3b82f6]/15 group-hover:scale-105"}`}>
            <Upload size={22} className="text-[#3b82f6]" />
          </div>
          <div className="text-sm font-medium text-white mb-1">
            {dragging ? "Solte os arquivos aqui" : "Arraste os arquivos ou clique para selecionar"}
          </div>
          <div className="text-xs text-white/35 mb-4">PDF, XLSX, OFX, CSV, XML (NF-e), imagens — até 50 MB</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["PDF", "XLSX", "OFX", "CSV", "XML", "JPG/PNG"].map(f => (
              <span key={f} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/45">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Document categories */}
      {DOC_CATEGORIES.map((cat, ci) => (
        <div key={ci} className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/7 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cat.color }}>{cat.label}</span>
            <span className="ml-auto text-[10px] text-white/30">
              {cat.docs.filter(d => d.status === "uploaded").length}/{cat.docs.length} enviados
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {cat.docs.map((doc, di) => {
              const cfg = statusConfig[doc.status as keyof typeof statusConfig];
              return (
                <div key={di} className="flex items-center justify-between px-5 py-3 hover:bg-white/2 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cat.color}18` }}>
                      <FileText size={13} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <div className="text-sm text-white/75">{doc.name}</div>
                      {doc.date !== "—" && <div className="text-[10px] text-white/30">{doc.date}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: `${cfg.color}18`, color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </span>
                    {doc.status === "pending" && (
                      <button className="text-xs px-3 py-1 rounded-lg border border-[#3b82f6]/30 text-[#60a5fa] hover:bg-[#3b82f6]/10 transition-colors">
                        Enviar
                      </button>
                    )}
                    {doc.status === "uploaded" && (
                      <button className="text-[10px] text-white/20 hover:text-red-400 transition-colors">
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-[#f0c040]/15 bg-[#f0c040]/5 p-4 text-xs text-white/50 leading-relaxed">
        <span className="text-[#f0c040] font-medium">Dica:</span> O motor de IA classifica automaticamente os documentos ao receber o upload. Para melhor precisão, envie todos os documentos antes de iniciar o processamento do DRE.
      </div>
    </div>
  );
}
