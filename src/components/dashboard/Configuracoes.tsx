import { User, Bell, Shield, CreditCard, ChevronRight } from "lucide-react";

export function Configuracoes() {
  return (
    <div className="space-y-5 max-w-2xl">
      {/* User */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2">
          <User size={16} className="text-[#3b82f6]" />
          <h3 className="text-sm font-semibold text-white">Informações da Conta</h3>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: "Empresa", value: "Empresa ABC Ltda" },
            { label: "CNPJ", value: "00.000.000/0001-00" },
            { label: "E-mail principal", value: "financeiro@empresaabc.com.br" },
            { label: "Responsável", value: "João da Silva" },
          ].map((f, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-xs text-white/40 mb-1 sm:mb-0">{f.label}</span>
              <span className="text-sm text-white/75">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2">
          <Bell size={16} className="text-[#f0c040]" />
          <h3 className="text-sm font-semibold text-white">Notificações</h3>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { label: "Relatórios disponíveis", desc: "Notificar quando novos relatórios forem gerados", active: true },
            { label: "Alertas financeiros", desc: "Receber alertas de indicadores críticos", active: true },
            { label: "Status de processamento", desc: "Atualizações sobre o processamento de documentos", active: false },
            { label: "Reuniões e lembretes", desc: "Notificações sobre reuniões agendadas com a DT Finance", active: true },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <div className="text-sm text-white/75">{n.label}</div>
                <div className="text-xs text-white/35">{n.desc}</div>
              </div>
              <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-all ${n.active ? "bg-[#3b82f6]" : "bg-white/15"}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${n.active ? "left-4" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan */}
      <div className="rounded-xl border border-[#10b981]/25 bg-[#10b981]/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={16} className="text-[#10b981]" />
          <h3 className="text-sm font-semibold text-white">Plano Atual</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-white">Gerencial</div>
            <div className="text-xs text-white/40">Renovação: 01/05/2025</div>
          </div>
          <button className="text-xs px-4 py-2 rounded-lg border border-[#10b981]/30 text-[#10b981] hover:bg-[#10b981]/10 transition-colors">
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center gap-2">
          <Shield size={16} className="text-[#0d9488]" />
          <h3 className="text-sm font-semibold text-white">Segurança</h3>
        </div>
        <div className="divide-y divide-white/5">
          {["Alterar senha", "Configurar autenticação em dois fatores", "Gerenciar usuários da conta"].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-white/60 hover:text-white/90 hover:bg-white/2 transition-all text-left">
              {item} <ChevronRight size={14} className="text-white/20" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
