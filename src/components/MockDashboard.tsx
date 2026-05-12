import { FadeIn } from "./FadeIn";
import { useLocation } from "wouter";

const kpis = [
  { label: "Receita Bruta", value: "R$ 2,84M", change: "+12,4%", positive: true },
  { label: "Margem EBITDA", value: "31,4%", change: "+2,1pp", positive: true },
  { label: "Caixa Disponível", value: "R$ 1,12M", change: "-5,2%", positive: false },
  { label: "Inadimplência", value: "3,2%", change: "-0,8pp", positive: true },
];

const statusItems = [
  { label: "Extratos bancários", status: "Processado", color: "#10b981" },
  { label: "Borderôs e recebimentos", status: "Processado", color: "#10b981" },
  { label: "Contas a pagar", status: "Em análise", color: "#d97706" },
  { label: "DRE Gerencial", status: "Aguardando", color: "#ffffff40" },
];

const sidebarItems = [
  { label: "Visão Geral", active: true },
  { label: "Upload de Docs", active: false },
  { label: "Processamento", active: false },
  { label: "KPIs", active: false },
  { label: "Dashboards", active: false },
  { label: "Relatórios", active: false },
  { label: "Alertas", active: false },
  { label: "Configurações", active: false },
];

export function MockDashboard() {
  const [, navigate] = useLocation();

  return (
    <section id="dashboard" className="py-24 bg-[#2a2a2e] relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,64,175,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0ea5e9]/30 bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs font-medium mb-4">
            PLATAFORMA
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Clareza que você vê
            <br />
            <span className="gradient-text">em tempo real</span>
          </h2>
          <p className="text-white/45 text-sm max-w-lg mx-auto">
            Preview simulado da plataforma DT Finance — dados fictícios para demonstração.
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ background: "#05101f" }}
          >
            {/* Browser bar */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 border-b border-white/8"
              style={{ background: "#030d1a" }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/7 rounded-md px-4 py-1 text-xs text-white/35 font-mono tracking-wide">
                  app.dtfinance.com.br/dashboard
                </div>
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-[#1e40af]/30 text-[#60a5fa] border border-[#1e40af]/30 font-medium hidden sm:block">
                Empresa ABC
              </div>
            </div>

            {/* App body */}
            <div className="flex" style={{ minHeight: 380 }}>
              {/* Sidebar */}
              <div
                className="hidden sm:flex flex-col w-44 border-r border-white/6 py-4 flex-shrink-0"
                style={{ background: "#040d1c" }}
              >
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-4 py-2 mx-2 rounded-lg text-xs font-medium transition-colors ${
                      item.active
                        ? "bg-[#1e40af]/30 text-[#60a5fa] border border-[#1e40af]/30"
                        : "text-white/35"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        item.active ? "bg-[#3b82f6]" : "bg-white/20"
                      }`}
                    />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 overflow-hidden">
                {/* Page header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="text-sm font-semibold text-white">
                      Visão Geral — Março 2025
                    </div>
                    <div className="text-xs text-white/35 mt-0.5">
                      Empresa ABC Ltda · CNPJ 00.000.000/0001-00
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#10b981]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    Atualizado há 2h
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                  {kpis.map((kpi, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3.5 border border-white/7"
                      style={{ background: "#060e1f" }}
                    >
                      <div className="text-[10px] text-white/40 mb-1.5 uppercase tracking-wide">
                        {kpi.label}
                      </div>
                      <div
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-lg font-bold text-white mb-1"
                      >
                        {kpi.value}
                      </div>
                      <div
                        className={`text-[10px] font-semibold ${
                          kpi.positive ? "text-[#10b981]" : "text-[#d97706]"
                        }`}
                      >
                        {kpi.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Processing status */}
                <div
                  className="rounded-xl border border-white/7 p-4"
                  style={{ background: "#060e1f" }}
                >
                  <div className="text-xs font-semibold text-white mb-3">
                    Status de Processamento — Mar/25
                  </div>
                  <div className="space-y-2">
                    {statusItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                      >
                        <span className="text-xs text-white/55">{item.label}</span>
                        <span
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            color: item.color,
                            background: `${item.color}18`,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA below */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-outline-blue px-7 py-3 rounded-xl text-sm font-medium"
            >
              Explorar demo completo →
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
