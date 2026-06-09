import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useModal } from "@/context/ModalContext";

const NAVY = "#0D1F3C";
const GOLD = "#C9A84C";
const PETROL = "#1B4158";

const links = [
  { label: "Home",        path: "/" },
  { label: "Soluções",    path: "/solucoes" },
  { label: "Sobre Nós",   path: "/quem-somos" },
  { label: "Metodologia", path: "/metodologia" },
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal }               = useModal();
  const [, navigate]                = useLocation();
  const [location]                  = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navTo = (path: string) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // dark = barra sobre fundo escuro (navy) → texto claro; senão (hero claro) → texto petróleo
  const dark = scrolled || !isHome || mobileOpen;
  const cMain    = dark ? "#FFFFFF"                : PETROL;
  const cSub     = dark ? "rgba(199,210,226,0.5)"  : "rgba(27,65,88,0.5)";
  const cLink    = dark ? "rgba(199,210,226,0.65)" : "rgba(27,65,88,0.7)";
  const cLinkH   = dark ? "#FFFFFF"                : PETROL;

  const navBg = dark ? `${NAVY}f5` : "transparent";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: navBg,
          backdropFilter: dark ? "blur(12px)" : "none",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[68px] lg:h-[76px]">

            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => navTo("/")}
            >
              <img
                src="/logo-dt-v2.png"
                alt="DT Finance"
                className="h-9 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span
                  style={{ fontFamily: "'Playfair Display', serif", color: cMain }}
                  className="font-semibold text-base tracking-tight"
                >
                  DT Finance
                </span>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: cSub }}>
                  Estruturação & Inteligência
                </div>
              </div>
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const active = location === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => navTo(link.path)}
                    className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200"
                    style={{
                      color: active ? GOLD : cLink,
                      backgroundColor: active ? "rgba(201,168,76,0.06)" : "transparent",
                    }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = cLinkH; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = cLink; }}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Contato — abre modal */}
              <button
                onClick={() => openModal()}
                className="px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{ color: cLink }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = cLinkH; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = cLink; }}
              >
                Contato
              </button>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => openModal()}
                className="btn-primary px-5 py-2.5 rounded-lg text-sm"
              >
                Agendar Diagnóstico
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: cLink }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              backgroundColor: `${NAVY}fa`,
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="max-w-[1320px] mx-auto px-6 py-4 space-y-1">
              {links.map((link) => {
                const active = location === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => navTo(link.path)}
                    className="flex w-full text-left py-3 px-3 text-sm font-medium rounded-lg transition-colors"
                    style={{ color: active ? GOLD : "rgba(199,210,226,0.6)" }}
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => { setMobileOpen(false); openModal(); }}
                className="flex w-full text-left py-3 px-3 text-sm font-medium rounded-lg transition-colors"
                style={{ color: "rgba(199,210,226,0.6)" }}
              >
                Contato
              </button>
              <div className="pt-3 border-t mt-2 space-y-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="btn-primary w-full py-3 px-5 rounded-lg text-sm"
                >
                  Agendar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
