import { CheckCircle2, Clock, Loader, Users, FileText, TrendingUp, AlertTriangle } from "lucide-react";

const clientes = [
  { nome: "Empresa ABC Ltda", setor: "Serviços", status: "processado", mes: "Mar/25", margem: "11,0%", receita: "R$ 2,84M" },
  { nome: "Distribuidora XYZ", setor: "Comércio", status: "processado", mes: "Mar/25", margem: "8,3%", receita: "R$ 1,92M" },
  { nome: "Indústria Delta S/A", setor: "Indústria", status: "processando", mes: "Mar/25", margem: "—", receita: "R$ 5,10M" },
  { nome: "Clínica Saúde+", setor: "Saúde", status: "aguardando", mes: "Mar/25", margem: "—", receita: "—" },
];

const statusConfig = {
  processado: { label: "Processado", color: "#10b981", icon: <CheckCircle2 size={12} /> },
  processando: { label: "Processando", color: "#f0c040", icon: <Loader size={12} className="animate-spin" /> },
  aguardando: { label: "Aguardando docs", color: "#6b7280", icon: <Clock size={12} /> },
};

export function VisaoGeralInterno() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">Visão Geral do Sistema</h2>
        <p className="text-xs text-white/40 mt-0.5">Competência: Março 2025</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Clientes ativos", value: "4", icon: <Users size={16} />, color: "#3b82f6" },
          { label: "DREs processados", value: "2", icon: <FileText size={16} />, color: "#10b981" },
          { label: "Em processamento", value: "1", icon: <Loader size={16} className="animate-spin" />, color: "#f0c040" },
          { label: "Aguardando docs", value: "1", icon: <Clock size={16} />, color: "#6b7280" },
        ].map((k, i) => (
          <div key={i} className="rounded-xl border border-white/7 bg-[#343438] p-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3" style={{ background: `${k.color}18`, color: k.color }}>{k.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-white mb-1">{k.value}</div>
            <div className="text-[10px] text-white/40">{k.label}</div>
          </div>
        ))}
      </div>

      {/* AI Agent Status */}
      <div className="rounded-xl border border-[#f0c040]/20 bg-[#f0c040]/5 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f0c040]/15 flex items-center justify-center text-2xl">⚡</div>
          <div>
            <div className="text-sm font-semibold text-white">Motor de Inteligência — Ativo</div>
            <div className="text-xs text-white/45 mt-0.5">Processando Indústria Delta S/A — Março 2025</div>
          </div>
          <div className="ml-auto hidden sm:block">
            <span className="flex items-center gap-1.5 text-xs text-[#f0c040] px-3 py-1.5 rounded-full bg-[#f0c040]/12">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0c040] animate-pulse-dot" />Em operação
            </span>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white/50 mb-1.5"><span>Progresso — Conciliação financeira</span><span>67%</span></div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: "67%", background: "linear-gradient(90deg, #f0c040, #3b82f6)" }} />
          </div>
        </div>
        <p className="text-xs text-white/35">Etapa atual: conciliação financeira · ETA: ~1h 40min</p>
      </div>

      {/* Clients table */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Clientes — Status de Processamento</h3>
          <span className="text-xs text-white/35">Mar/25</span>
        </div>
        <div className="divide-y divide-white/5">
          {clientes.map((c, i) => {
            const cfg = statusConfig[c.status as keyof typeof statusConfig];
            return (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/2 transition-colors gap-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#1e40af]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#60a5fa]">{c.nome.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="text-sm text-white/85 font-medium">{c.nome}</div>
                    <div className="text-[10px] text-white/35">{c.setor} · {c.mes}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {c.receita !== "—" && <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-white/30">Receita</div>
                    <div className="text-xs text-white/70 font-medium">{c.receita}</div>
                  </div>}
                  {c.margem !== "—" && <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-white/30">Margem liq.</div>
                    <div className="text-xs text-emerald-400 font-medium">{c.margem}</div>
                  </div>}
                  <span className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                    style={{ background: `${cfg.color}18`, color: cfg.color }}>
                    {cfg.icon} {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-xl border border-[#d97706]/20 bg-[#d97706]/5 p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-[#d97706] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-white/80 font-medium">Clínica Saúde+ — Documentos pendentes</p>
          <p className="text-xs text-white/45 mt-1">Extrato bancário e folha de pagamento não recebidos. Processamento de Mar/25 bloqueado.</p>
        </div>
      </div>
    </div>
  );
}
