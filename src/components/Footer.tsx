import { useModal } from "@/context/ModalContext";
import { useLocation } from "wouter";

export function Footer() {
  const { openModal } = useModal();
  const [, navigate] = useLocation();

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-[#1B4158]/8 bg-[#0c1a25] pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14">

            <div className="lg:col-span-5">
              <div
                className="flex items-center gap-3 mb-5 cursor-pointer w-fit"
                onClick={() => goTo("/")}
              >
                <img src="/logo-dt-v2.png" alt="DT Finance" className="h-9 w-auto object-contain opacity-80" />
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white/70 font-semibold text-lg">
                  DT Finance
                </span>
              </div>
              <p className="text-sm text-white/40 max-w-xs leading-relaxed mb-6">
                CFO as a Service para PMEs. Estruturamos a gestão financeira da sua empresa com método, dados e presença executiva contínua.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <img src="/selo-cfp.png" alt="CFP® — Certified Financial Planner" className="h-12 w-auto object-contain opacity-60" />
                <img src="/selo-oab.png" alt="OAB — Direito Empresarial" className="h-12 w-auto object-contain opacity-60" />
                <span className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-white/30">
                  São Paulo, SP
                </span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                Soluções
              </div>
              <ul className="space-y-3">
                {[
                  "CFO as a Service",
                  "Relatórios Executivos",
                  "Fluxo de Caixa Projetado",
                  "Controladoria Gerencial",
                  "Inteligência de Dados",
                  "Apoio Bancário",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => goTo("/solucoes")}
                      className="text-sm text-white/40 hover:text-white/75 transition-colors duration-200 text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
                Empresa
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  { label: "Nosso Foco", path: "/nosso-foco" },
                  { label: "Metodologia DOIA", path: "/metodologia" },
                  { label: "Quem Somos", path: "/quem-somos" },
                  { label: "Área do Cliente", path: "/login" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => goTo(item.path)}
                      className="text-sm text-white/40 hover:text-white/75 transition-colors duration-200 text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 mb-7">
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
                  Contato
                </div>
                <a href="mailto:contato@dtfinance.com.br" className="block text-sm text-white/40 hover:text-white/75 transition-colors">
                  contato@dtfinance.com.br
                </a>
              </div>

              <button
                className="btn-gold px-5 py-2.5 rounded-lg text-sm font-semibold"
                onClick={() => openModal()}
              >
                Agendar diagnóstico →
              </button>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/18">
              © 2026 DT Finance. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]/60 animate-pulse-dot" />
                <span className="text-xs text-white/18">Sistema operacional</span>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
