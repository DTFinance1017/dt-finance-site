import { Check, Loader, Clock } from "lucide-react";

const tasks = [
  { label: "Leitura de extratos bancários", desc: "Identificação de créditos, débitos e transferências", status: "done", time: "concluído às 09:14" },
  { label: "Classificação de transações", desc: "Categorização por tipo: receita, custo, despesa operacional", status: "done", time: "concluído às 09:41" },
  { label: "Organização de recebimentos", desc: "Mapeamento de recebimentos por cliente e vencimento", status: "done", time: "concluído às 10:03" },
  { label: "Conciliação financeira", desc: "Cruzamento de lançamentos com documentos enviados", status: "processing", time: "em andamento · 63% concluído" },
  { label: "Geração de indicadores", desc: "Cálculo de KPIs, margens, liquidez e endividamento", status: "waiting", time: "aguardando etapa anterior" },
  { label: "Relatório em preparação", desc: "Montagem do relatório executivo e dashboards finais", status: "waiting", time: "aguardando etapa anterior" },
];

const statusConfig = {
  done: { color: "#10b981", bg: "#10b98118", icon: <Check size={14} />, label: "Concluído" },
  processing: { color: "#f0c040", bg: "#f0c04018", icon: <Loader size={14} className="animate-spin" />, label: "Processando" },
  waiting: { color: "#6b7280", bg: "#6b728018", icon: <Clock size={14} />, label: "Aguardando" },
};

export function Processamento() {
  const done = tasks.filter(t => t.status === "done").length;
  const progress = Math.round((done / tasks.length) * 100);

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Agent status card */}
      <div className="rounded-xl border border-[#0d9488]/30 bg-[#0d9488]/8 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0d9488]/20 flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Agente DT Finance — Ativo</div>
            <div className="text-xs text-white/45 mt-0.5">Processando documentos de Março 2025</div>
          </div>
          <div className="ml-auto">
            <span className="flex items-center gap-1.5 text-xs text-[#0d9488] px-3 py-1.5 rounded-full bg-[#0d9488]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] animate-pulse-dot" />
              Em operação
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>Progresso geral</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#0d9488] to-[#3b82f6] transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="text-xs text-white/35">Tempo estimado para conclusão: aproximadamente 2 horas</div>
      </div>

      {/* Tasks list */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7">
          <h3 className="text-sm font-semibold text-white">Etapas de Processamento</h3>
          <p className="text-xs text-white/35 mt-0.5">Março 2025 — Empresa ABC Ltda</p>
        </div>

        <div className="divide-y divide-white/5">
          {tasks.map((task, i) => {
            const config = statusConfig[task.status as keyof typeof statusConfig];
            return (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                {/* Step indicator */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: config.bg, color: config.color }}
                  >
                    {config.icon}
                  </div>
                  {i < tasks.length - 1 && (
                    <div className="w-px h-6 rounded-full" style={{ background: task.status === "done" ? "#10b98130" : "#ffffff10" }} />
                  )}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className={`text-sm font-medium ${task.status === "waiting" ? "text-white/40" : "text-white"}`}>
                      {task.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: config.bg, color: config.color }}>
                      {config.label}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-snug ${task.status === "waiting" ? "text-white/25" : "text-white/45"}`}>
                    {task.desc}
                  </p>
                  <p className="text-[10px] text-white/25 mt-1">{task.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-white/7 bg-[#343438] p-4 text-xs text-white/40 leading-relaxed">
        O agente interno da DT Finance realiza a leitura, classificação e estruturação dos dados de forma automatizada. Após a conclusão do processamento, sua equipe será notificada e os dashboards estarão disponíveis para análise.
      </div>
    </div>
  );
}
