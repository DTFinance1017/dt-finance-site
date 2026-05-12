import { useState } from "react";
import { UserPlus, CheckCircle2, Clock, AlertTriangle, Building2, ChevronRight } from "lucide-react";

const CLIENTES = [
  {
    nome: "Empresa ABC Ltda", setor: "Serviços", plano: "Gerencial", status: "ativo",
    receita: "R$ 2,84M", margem: "11,0%", competencia: "Mar/25", dre: "processado",
    responsavel: "Daniel T.", contato: "financeiro@abc.com.br",
  },
  {
    nome: "Distribuidora XYZ", setor: "Comércio", plano: "Estratégico", status: "ativo",
    receita: "R$ 1,92M", margem: "8,3%", competencia: "Mar/25", dre: "processado",
    responsavel: "Daniel T.", contato: "admin@xyz.com.br",
  },
  {
    nome: "Indústria Delta S/A", setor: "Indústria", plano: "Estratégico", status: "ativo",
    receita: "R$ 5,10M", margem: "—", competencia: "Mar/25", dre: "processando",
    responsavel: "Daniel T.", contato: "cfo@delta.com.br",
  },
  {
    nome: "Clínica Saúde+", setor: "Saúde", plano: "Gerencial", status: "pendente",
    receita: "—", margem: "—", competencia: "Mar/25", dre: "aguardando",
    responsavel: "Daniel T.", contato: "gestao@saudemais.com.br",
  },
];

const dreConfig: Record<string, { label: string; color: string }> = {
  processado:  { label: "DRE pronto",     color: "#10b981" },
  processando: { label: "Processando",    color: "#f0c040" },
  aguardando:  { label: "Aguardando",     color: "#6b7280" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  ativo:    { label: "Ativo",    color: "#10b981" },
  pendente: { label: "Pendente", color: "#d97706" },
};

export function ClientesInterno() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">Clientes</h2>
          <p className="text-xs text-white/40 mt-0.5">{CLIENTES.length} empresas ativas na plataforma</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0c040]/15 border border-[#f0c040]/30 text-[#f0c040] text-xs font-medium hover:bg-[#f0c040]/25 transition-colors">
          <UserPlus size={13} /> Novo cliente
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {CLIENTES.map((c, i) => {
          const dreC = dreConfig[c.dre];
          const statusC = statusConfig[c.status];
          const isOpen = selected === i;

          return (
            <div key={i} className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
              <button
                onClick={() => setSelected(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1e40af]/20 flex items-center justify-center flex-shrink-0">
                  <Building2 size={16} className="text-[#60a5fa]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-white">{c.nome}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${statusC.color}18`, color: statusC.color }}>
                      {statusC.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${dreC.color}18`, color: dreC.color }}>
                      {dreC.label}
                    </span>
                  </div>
                  <div className="text-xs text-white/35 mt-0.5">{c.setor} · Plano {c.plano} · {c.competencia}</div>
                </div>
                <div className="hidden sm:flex items-center gap-8 text-right flex-shrink-0">
                  {c.receita !== "—" && (
                    <div>
                      <div className="text-[10px] text-white/30">Receita</div>
                      <div className="text-sm font-semibold text-white/80">{c.receita}</div>
                    </div>
                  )}
                  {c.margem !== "—" && (
                    <div>
                      <div className="text-[10px] text-white/30">Margem liq.</div>
                      <div className="text-sm font-semibold text-emerald-400">{c.margem}</div>
                    </div>
                  )}
                </div>
                <ChevronRight size={14} className={`text-white/20 flex-shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-white/7 px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#2a2a2e]/40">
                  {[
                    { label: "Responsável DT", value: c.responsavel },
                    { label: "Contato", value: c.contato },
                    { label: "Competência", value: c.competencia },
                    { label: "Status DRE", value: dreC.label },
                  ].map((f, fi) => (
                    <div key={fi}>
                      <div className="text-[10px] text-white/30 mb-0.5">{f.label}</div>
                      <div className="text-xs text-white/75 font-medium">{f.value}</div>
                    </div>
                  ))}
                  <div className="col-span-2 sm:col-span-4 flex gap-2 mt-2 pt-3 border-t border-white/5">
                    <button className="px-4 py-1.5 text-xs rounded-lg bg-[#1e40af]/20 text-[#60a5fa] border border-[#3b82f6]/20 hover:bg-[#1e40af]/35 transition-colors">
                      Ver DRE do cliente
                    </button>
                    <button className="px-4 py-1.5 text-xs rounded-lg border border-white/8 text-white/45 hover:text-white/70 hover:bg-white/5 transition-colors">
                      Gerenciar acesso
                    </button>
                    <button className="px-4 py-1.5 text-xs rounded-lg border border-white/8 text-white/45 hover:text-white/70 hover:bg-white/5 transition-colors">
                      Histórico de processamento
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
