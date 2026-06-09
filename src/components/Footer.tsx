import { useModal } from "@/context/ModalContext";
import { useLocation } from "wouter";
import { Linkedin, Instagram } from "lucide-react";

const NAVY = "#0D1F3C";

const navLinks = [
  { label: "Home",        path: "/" },
  { label: "Metodologia", path: "/metodologia" },
  { label: "Soluções",    path: "/solucoes" },
  { label: "Sobre Nós",   path: "/sobre" },
];

export function Footer() {
  const { openModal } = useModal();
  const [, navigate]  = useLocation();

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#0a1428" }}>

      {/* Corpo principal */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">

          {/* Brand */}
          <div className="lg:col-span-5">
            <div
              className="flex items-center gap-3 mb-5 cursor-pointer w-fit"
              onClick={() => goTo("/")}
            >
              <img
                src="/logo-dt-v2.png"
                alt="DT Finance"
                className="h-8 w-auto object-contain opacity-80"
              />
              <div>
                <span
                  style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
                  className="font-semibold text-base block"
                >
                  DT Finance
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{ color: "rgba(199,210,226,0.4)" }}
                >
                  Estruturação &amp; Inteligência
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-7 max-w-xs" style={{ color: "rgba(199,210,226,0.45)" }}>
              Transformamos empresas através de governança, processos, performance e inteligência financeira.
            </p>

            {/* Redes sociais */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/dtfinance"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(199,210,226,0.4)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(199,210,226,0.4)";
                }}
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.instagram.com/dtfinancebr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(199,210,226,0.4)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(199,210,226,0.4)";
                }}
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://wa.me/5511969771585"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 text-xs font-bold"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(199,210,226,0.4)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(199,210,226,0.4)";
                }}
              >
                W
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <div
              className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(199,210,226,0.3)" }}
            >
              Navegação
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => goTo(link.path)}
                    className="text-sm text-left transition-colors duration-200"
                    style={{ color: "rgba(199,210,226,0.45)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(199,210,226,0.45)"; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openModal()}
                  className="text-sm text-left transition-colors duration-200"
                  style={{ color: "rgba(199,210,226,0.45)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(199,210,226,0.45)"; }}
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contato + CTA */}
          <div className="lg:col-span-4">
            <div
              className="text-[10px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(199,210,226,0.3)" }}
            >
              Contato
            </div>
            <a
              href="mailto:contato@dtfinance.com.br"
              className="block text-sm mb-2 transition-colors duration-200"
              style={{ color: "rgba(199,210,226,0.45)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(199,210,226,0.45)"; }}
            >
              contato@dtfinance.com.br
            </a>
            <p className="text-sm mb-8" style={{ color: "rgba(199,210,226,0.3)" }}>São Paulo, SP — Brasil</p>

            <button
              onClick={() => openModal()}
              className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold"
            >
              Agendar Diagnóstico
            </button>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(199,210,226,0.25)" }}>
            © 2026 DT Finance. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
