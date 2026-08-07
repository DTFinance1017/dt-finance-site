import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#ecossistema", label: "Ecossistema" },
  { href: "#metodologia", label: "Metodologia" },
  { href: "#plataformas", label: "Plataformas" },
  { href: "#banking",     label: "Banking" },
  { href: "#sobre",       label: "Sobre" },
];

export function DtfNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // com o menu aberto o fundo já é opaco — evita a nav transparente sobre o painel
  const solid = scrolled || open;

  return (
    <header className={solid ? "nav scrolled" : "nav"}>
      <div className="nav-in">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="n">DT Finance</span>
          <span className="s">Estruturação &amp; Inteligência</span>
        </a>

        <nav className="nav-links" aria-label="Seções da página">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a href="#contato" className="nav-cta">Agendar diagnóstico</a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="dtf-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" id="dtf-menu">
          <div className="nav-mobile-in">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contato" className="btn btn-gold" onClick={() => setOpen(false)}>
              Agendar diagnóstico <span className="arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
