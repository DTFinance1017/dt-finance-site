import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import { LayoutDashboard, Upload, Cpu, Users, ChevronLeft, LogOut, X, Menu, Zap } from "lucide-react";
import { logout } from "../../utils/auth";

const navItems = [
  { id: "visao-geral",     label: "Visão Geral",          icon: <LayoutDashboard size={16} />, path: "/interno" },
  { id: "upload",          label: "Upload de Documentos", icon: <Upload size={16} />,          path: "/interno/upload" },
  { id: "classificacao",   label: "Classificação IA",     icon: <Zap size={16} />,             path: "/interno/classificacao" },
  { id: "processamento",   label: "Processamento DRE",    icon: <Cpu size={16} />,             path: "/interno/processamento" },
  { id: "clientes",        label: "Clientes",             icon: <Users size={16} />,           path: "/interno/clientes" },
];

interface InternoLayoutProps { children: ReactNode; activeSection: string; }

export function InternoLayout({ children, activeSection }: InternoLayoutProps) {
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#2a2a2e] text-white overflow-hidden">
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`fixed lg:relative z-40 h-full w-62 flex flex-col border-r border-white/8 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#2a2a2e", minWidth: "240px" }}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <img src="/logo-dt-v2.png" alt="DT Finance" className="h-8 w-auto object-contain flex-shrink-0" />
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-semibold text-sm block">DT Finance</span>
              <span className="text-[10px] text-[#f0c040]">Área Interna</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white"><X size={18} /></button>
        </div>

        <div className="px-4 py-3 mx-3 mt-3 rounded-xl border border-[#f0c040]/20 bg-[#f0c040]/5">
          <div className="text-[10px] text-[#f0c040]/60 mb-0.5">Acesso restrito</div>
          <div className="text-xs font-medium text-white">Área dos Sócios</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f0c040]" />
            <span className="text-[10px] text-[#f0c040]">Módulo Inteligência</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive ? "bg-[#f0c040]/15 text-[#f0c040] font-medium" : "text-white/45 hover:text-white/80 hover:bg-white/5"}`}
              >
                <span className={isActive ? "text-[#f0c040]" : ""}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-5 border-t border-white/8 pt-4 space-y-1">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <ChevronLeft size={16} /> Voltar ao Site
          </button>
          <button onClick={() => { logout(); navigate("/login"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-[#d97706] hover:bg-[#d97706]/5 transition-all">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0" style={{ background: "#2a2a2e" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50 hover:text-white p-1"><Menu size={20} /></button>
            <div>
              <h1 className="text-sm font-semibold text-white">{navItems.find(n => n.id === activeSection)?.label || "Painel"}</h1>
              <p className="text-xs text-white/35">Área Interna · Acesso restrito aos sócios</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f0c040]/20 bg-[#f0c040]/8">
              <Zap size={10} className="text-[#f0c040]" />
              <span className="text-xs text-[#f0c040]/70">Motor IA ativo</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f0c040]/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-[#f0c040]">DT</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
