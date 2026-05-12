import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { useModal } from "@/context/ModalContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useModal();
  const [, navigate] = useLocation();
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navTo = (path: string) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { label: "Início", path: "/" },
    { label: "Nosso Foco", path: "/nosso-foco" },
    { label: "Soluções", path: "/solucoes" },
    { label: "Metodologia", path: "/metodologia" },
    { label: "Quem Somos", path: "/quem-somos" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-[#0d0d12]/95 backdrop-blur-md border-b border-white/6"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            <div
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <img
                src="/logo-dt-v2.png"
                alt="DT Finance"
                className="h-9 w-auto object-contain"
              />
              <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white/80 font-semibold text-lg tracking-tight hidden sm:block">
                DT Finance
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const active = location === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => navTo(link.path)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      active
                        ? "text-[#c8a84a] bg-white/4"
                        : "text-white/45 hover:text-white/75 hover:bg-white/4"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-px h-4 bg-white/8" />
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-medium text-white/35 hover:text-white/60 transition-colors duration-200"
              >
                Área do Cliente
              </button>
              <button
                onClick={() => openModal()}
                className="btn-gold px-5 py-2.5 rounded-lg text-sm font-semibold"
              >
                Agendar diagnóstico
              </button>
            </div>

            <button className="md:hidden text-white/50 hover:text-white/80 p-2 rounded-lg transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0d0d12]/97 backdrop-blur-md border-t border-white/6">
            <div className="max-w-[1440px] mx-auto px-6 py-4 space-y-1">
              {links.map((link) => {
                const active = location === link.path;
                return (
                  <button key={link.label} onClick={() => navTo(link.path)} className={`block w-full text-left py-2.5 px-3 text-sm font-medium transition-colors rounded-lg hover:bg-white/4 ${active ? "text-[#c8a84a]" : "text-white/50 hover:text-white/75"}`}>
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-white/6 mt-2 space-y-2">
                <button onClick={() => { setMobileOpen(false); navigate("/login"); }} className="block w-full text-left text-white/40 hover:text-white/65 py-2.5 px-3 text-sm font-medium transition-colors rounded-lg hover:bg-white/4">
                  Área do Cliente
                </button>
                <button onClick={() => { setMobileOpen(false); openModal(); }} className="btn-gold w-full px-5 py-3 rounded-lg text-sm font-semibold">
                  Agendar diagnóstico
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
