import { Check, Loader, Clock, PlayCircle } from "lucide-react";

const CLIENTES_OPCOES = ["Empresa ABC Ltda", "Distribuidora XYZ", "Indústria Delta S/A", "Clínica Saúde+"];

const tasks = [
  { label: "Recebimento e indexação dos documentos", desc: "PDF, XLSX, XML e OFX recebidos e catalogados por tipo", status: "done", time: "concluído 12/03 às 09:14" },
  { label: "OCR e leitura de conteúdo", desc: "Extração de texto de PDFs, notas fiscais e extratos digitalizados", status: "done", time: "concluído 12/03 às 09:41" },
  { label: "Classificação inteligente dos lançamentos", desc: "Categorização por tipo: receita, CMV, despesa, tributo, financeiro", status: "done", time: "concluído 13/03 às 10:03" },
  { label: "Separação de custos fixos e variáveis", desc: "Identificação e alocação de custos por natureza e linha de produto", status: "done", time: "concluído 13/03 às 11:22" },
  { label: "Conciliação financeira e cruzamento de dados", desc: "Validação dos lançamentos contra documentos enviados", status: "processing", time: "em andamento · 67% concluído" },
  { label: "Cálculo de indicadores e margens", desc: "Apuração de DRE, margens, EBITDA, liquidez e endividamento", status: "waiting", time: "aguardando etapa anterior" },
  { label: "Geração do DRE gerencial", desc: "Consolidação final em formato DRE com abertura por linha", status: "waiting", time: "aguardando etapa anterior" },
  { label: "Publicação na Área do Cliente", desc: "DRE e dashboards disponibilizados para visualização pelo cliente", status: "waiting", time: "aguardando etapa anterior" },
];

const statusConfig = {
  done:       { color: "#10b981", bg: "#10b98118", icon: <Check size={14} />, label: "Concluído" },
  processing: { color: "#f0c040", bg: "#f0c04018", icon: <Loader size={14} className="animate-spin" />, label: "Processando" },
  waiting:    { color: "#6b7280", bg: "#6b728018", icon: <Clock size={14} />, label: "Aguardando" },
};

export function ProcessamentoDRE() {
  const done = tasks.filter(t => t.status === "done").length;
  const progress = Math.round((done / tasks.length) * 100);

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">Processamento DRE</h2>
        <p className="text-xs text-white/40 mt-0.5">Pipeline de inteligência financeira</p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap">
        <select className="text-xs px-3 py-2 rounded-lg border border-white/10 bg-[#343438] text-white/70 outline-none cursor-pointer">
          {CLIENTES_OPCOES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="text-xs px-3 py-2 rounded-lg border border-white/10 bg-[#343438] text-white/70 outline-none cursor-pointer">
          <option>Março 2025</option><option>Fevereiro 2025</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f0c040]/15 border border-[#f0c040]/30 text-[#f0c040] text-xs font-medium hover:bg-[#f0c040]/25 transition-colors ml-auto">
          <PlayCircle size={13} /> Iniciar novo processamento
        </button>
      </div>

      {/* Agent status */}
      <div className="rounded-xl border border-[#0d9488]/30 bg-[#0d9488]/8 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center text-2xl">⚡</div>
          <div>
            <div className="text-sm font-semibold text-white">Motor DT Finance — Ativo</div>
            <div className="text-xs text-white/45 mt-0.5">Processando documentos de Março 2025 · Empresa ABC Ltda</div>
          </div>
          <div className="ml-auto hidden sm:block">
            <span className="flex items-center gap-1.5 text-xs text-[#0d9488] px-3 py-1.5 rounded-full bg-[#0d9488]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse-dot" />Em operação
            </span>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>Progresso geral</span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#3b82f6] transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <p className="text-xs text-white/35">Etapa atual: conciliação financeira · Tempo estimado: ~1h 40min</p>
      </div>

      {/* Pipeline */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7">
          <h3 className="text-sm font-semibold text-white">Pipeline de Processamento</h3>
          <p className="text-xs text-white/35 mt-0.5">Março 2025 — Empresa ABC Ltda</p>
        </div>
        <div className="divide-y divide-white/5">
          {tasks.map((task, i) => {
            const config = statusConfig[task.status as keyof typeof statusConfig];
            return (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: config.bg, color: config.color }}>
                    {config.icon}
                  </div>
                  {i < tasks.length - 1 && (
                    <div className="w-px h-6 rounded-full" style={{ background: task.status === "done" ? "#10b98130" : "#ffffff10" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className={`text-sm font-medium ${task.status === "waiting" ? "text-white/35" : "text-white"}`}>{task.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: config.bg, color: config.color }}>{config.label}</span>
                  </div>
                  <p className={`text-xs mt-1 leading-snug ${task.status === "waiting" ? "text-white/20" : "text-white/45"}`}>{task.desc}</p>
                  <p className="text-[10px] text-white/25 mt-0.5">{task.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/7 bg-[#343438] p-4 text-xs text-white/40 leading-relaxed">
        Após a conclusão do processamento, o DRE gerencial será publicado automaticamente na Área do Cliente. O cliente receberá uma notificação por e-mail com o relatório disponível para download.
      </div>
    </div>
  );
}
