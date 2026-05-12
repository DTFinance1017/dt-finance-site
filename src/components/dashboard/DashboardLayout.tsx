import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard, Upload, Cpu, BarChart3, PieChart, FileText,
  Bell, Settings, ChevronLeft, LogOut, X, Menu, Download
} from "lucide-react";
import { logout } from "../../utils/auth";
import { gerarRelatorioQ1 } from "../../utils/gerarRelatorio";
import { gerarExcelQ1 } from "../../utils/gerarExcel";

const navItems = [
  { id: "visao-geral", label: "Visão Geral", icon: <LayoutDashboard size={16} />, path: "/dashboard" },
  { id: "upload", label: "Upload de Docs", icon: <Upload size={16} />, path: "/dashboard/upload" },
  { id: "processamento", label: "Processamento", icon: <Cpu size={16} />, path: "/dashboard/processamento" },
  { id: "kpis", label: "KPIs", icon: <BarChart3 size={16} />, path: "/dashboard/kpis" },
  { id: "dashboards", label: "Dashboards", icon: <PieChart size={16} />, path: "/dashboard/dashboards" },
  { id: "relatorios", label: "Relatórios", icon: <FileText size={16} />, path: "/dashboard/relatorios" },
  { id: "alertas", label: "Alertas", icon: <Bell size={16} />, path: "/dashboard/alertas" },
  { id: "configuracoes", label: "Configurações", icon: <Settings size={16} />, path: "/dashboard/configuracoes" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
}

export function DashboardLayout({ children, activeSection }: DashboardLayoutProps) {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatingXls, setGeneratingXls] = useState(false);

  async function handleGerarRelatorio() {
    setGenerating(true);
    try {
      await gerarRelatorioQ1();
    } finally {
      setGenerating(false);
    }
  }

  function handleGerarExcel() {
    setGeneratingXls(true);
    try {
      gerarExcelQ1();
    } finally {
      setTimeout(() => setGeneratingXls(false), 800);
    }
  }

  return (
    <div className="flex h-screen bg-[#2a2a2e] text-white overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed lg:relative z-40 h-full w-60 flex flex-col border-r border-white/8 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#2a2a2e" }}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <img
              src="/logo-dt-v2.png"
              alt="DT Finance"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold text-base">DT Finance</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 mx-3 mt-3 rounded-xl border border-white/8 bg-[#343438]">
          <div className="text-[10px] text-white/35 mb-0.5">Empresa conectada</div>
          <div className="text-xs font-medium text-white">Empresa ABC Ltda</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-[10px] text-[#10b981]">Plano Gerencial</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#1e40af]/25 text-[#60a5fa] font-medium"
                    : "text-white/45 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <span className={isActive ? "text-[#3b82f6]" : ""}>{item.icon}</span>
                {item.label}
                {item.id === "alertas" && (
                  <span className="ml-auto w-4 h-4 rounded-full bg-[#d97706] text-[10px] flex items-center justify-center text-white font-bold">3</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-5 border-t border-white/8 pt-4 space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <ChevronLeft size={16} /> Voltar ao Site
          </button>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-[#d97706] hover:bg-[#d97706]/5 transition-all"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0" style={{ background: "#2a2a2e" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50 hover:text-white p-1">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-white">
                {navItems.find(n => n.id === activeSection)?.label || "Painel"}
              </h1>
              <p className="text-xs text-white/35">1º Trimestre 2026 · Jan – Mar</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGerarExcel}
              disabled={generatingXls}
              title="Exportar Excel editável (.xlsx)"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-60"
              style={{
                background: generatingXls ? "#166534" : "linear-gradient(135deg, #166534, #15803d)",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(22,101,52,0.4)",
              }}
            >
              <Download size={13} className={generatingXls ? "animate-bounce" : ""} />
              {generatingXls ? "Exportando..." : "Excel"}
            </button>

            <button
              onClick={handleGerarRelatorio}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-60"
              style={{
                background: generating ? "#1e40af" : "linear-gradient(135deg, #1e40af, #2563eb)",
                color: "#fff",
                boxShadow: "0 2px 8px rgba(30,64,175,0.4)",
              }}
            >
              <Download size={13} className={generating ? "animate-bounce" : ""} />
              {generating ? "Gerando..." : "PDF"}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-[#343438]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-dot" />
              <span className="text-xs text-white/40">Demo Mode</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1e40af]/40 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#60a5fa]">AB</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
