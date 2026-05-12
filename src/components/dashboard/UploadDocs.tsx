import { Upload, Check, Clock, FileText, X } from "lucide-react";

const docTypes = [
  { name: "Extratos Bancários", status: "uploaded", date: "12/03/25", size: "2,4 MB" },
  { name: "Borderôs e Recebimentos", status: "uploaded", date: "12/03/25", size: "1,1 MB" },
  { name: "Contas a Pagar", status: "processing", date: "13/03/25", size: "890 KB" },
  { name: "Contas a Receber", status: "processing", date: "13/03/25", size: "1,3 MB" },
  { name: "DRE Gerencial", status: "pending", date: "—", size: "—" },
  { name: "Balanço Patrimonial", status: "pending", date: "—", size: "—" },
  { name: "Balancete Contábil", status: "pending", date: "—", size: "—" },
];

const statusConfig = {
  uploaded: { label: "Enviado", color: "#10b981", icon: <Check size={11} /> },
  processing: { label: "Processando", color: "#f0c040", icon: <Clock size={11} /> },
  pending: { label: "Aguardando", color: "#6b7280", icon: <Clock size={11} /> },
};

export function UploadDocs() {
  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-white">Upload de Documentos</h2>
            <p className="text-xs text-white/40 mt-0.5">Competência: Março 2025</p>
          </div>
          <select className="text-xs px-3 py-2 rounded-lg border border-white/10 bg-[#2a2a2e] text-white/60 outline-none cursor-pointer">
            <option>Março 2025</option>
            <option>Fevereiro 2025</option>
            <option>Janeiro 2025</option>
          </select>
        </div>

        {/* Drop zone */}
        <div className="border-2 border-dashed border-white/12 rounded-xl p-8 text-center hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/4 transition-all duration-200 cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-[#3b82f6]/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload size={22} className="text-[#3b82f6]" />
          </div>
          <div className="text-sm font-medium text-white mb-1">Arraste os arquivos aqui ou clique para selecionar</div>
          <div className="text-xs text-white/35">PDF, XLSX, OFX, CSV — até 50 MB por arquivo</div>
          <button className="mt-4 px-5 py-2 rounded-lg bg-[#1e40af]/25 text-[#60a5fa] text-xs font-medium hover:bg-[#1e40af]/40 transition-colors">
            Selecionar Arquivos
          </button>
        </div>
      </div>

      {/* Document list */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Documentos — Mar/25</h3>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />2 enviados</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f0c040]" />2 processando</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#6b7280]" />3 pendentes</span>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {docTypes.map((doc, i) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig];
            return (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1e40af]/20 flex items-center justify-center flex-shrink-0">
                    <FileText size={14} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/80">{doc.name}</div>
                    {doc.date !== "—" && <div className="text-[10px] text-white/30">{doc.date} · {doc.size}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${config.color}18`, color: config.color }}
                  >
                    {config.icon} {config.label}
                  </span>
                  {doc.status === "pending" && (
                    <button className="text-xs px-3 py-1 rounded-lg border border-[#3b82f6]/30 text-[#60a5fa] hover:bg-[#3b82f6]/10 transition-colors">
                      Enviar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#f0c040]/15 flex items-center justify-center flex-shrink-0">
          <span className="text-[#f0c040] text-sm">⚡</span>
        </div>
        <div>
          <div className="text-sm font-medium text-white mb-1">Envie todos os documentos para processamento completo</div>
          <div className="text-xs text-white/45 leading-relaxed">O agente interno precisa de todos os documentos do mês para gerar os indicadores e dashboards com máxima precisão. Documentos parciais resultam em análises incompletas.</div>
        </div>
      </div>
    </div>
  );
}
