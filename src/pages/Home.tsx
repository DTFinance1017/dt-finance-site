import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// ============================================================
// Home v2.0 — Layout aprovado (base creme · Arial · navy + dourado acento)
// Página autossuficiente: navbar e footer próprios em creme, sem mexer
// nos componentes compartilhados pelas demais páginas. Logo real mantida.
// ============================================================

const WA =
  "https://wa.me/5511969771585?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20DT%20Finance%20e%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico.";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Metodologia", path: "/metodologia" },
  { label: "Soluções", path: "/solucoes" },
  { label: "Sobre", path: "/sobre" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const go = (path: string) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToFooter = () => {
    setMobileOpen(false);
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="home-v2">
      <style>{styles}</style>

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav className="hv-navbar">
        <div className="hv-navbar-inner">
          <div className="hv-logo-area" onClick={() => go("/")}>
            <img src="/logo-dt-v2.png" alt="DT Finance" className="hv-logo-img" />
            <div className="hv-logo-text">
              <span className="hv-logo-name">DT Finance</span>
              <span className="hv-logo-sub">Estruturação Empresarial</span>
            </div>
          </div>

          <div className="hv-nav-links">
            {navItems.map((item) => (
              <button key={item.label} className="hv-nav-link" onClick={() => go(item.path)}>
                {item.label}
              </button>
            ))}
            <button className="hv-nav-link" onClick={scrollToFooter}>
              Contato
            </button>
          </div>

          <div className="hv-nav-cta">
            <span className="hv-nav-area" onClick={() => go("/login")}>
              Área do Cliente
            </span>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary hv-btn-sm">
              Agendar diagnóstico
            </a>
          </div>

          <button
            className="hv-burger"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        {mobileOpen && (
          <div className="hv-mobile-menu">
            {navItems.map((item) => (
              <button key={item.label} className="hv-mobile-link" onClick={() => go(item.path)}>
                {item.label}
              </button>
            ))}
            <button className="hv-mobile-link" onClick={scrollToFooter}>Contato</button>
            <button className="hv-mobile-link" onClick={() => go("/login")}>Área do Cliente</button>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary" style={{ marginTop: 8 }}>
              Agendar diagnóstico
            </a>
          </div>
        )}
      </nav>

      {/* ─── 1 · HERO ───────────────────────────────────────── */}
      <section className="hv-hero">
        <div className="hv-hero-stripe" />
        <div className="hv-hero-ornament"><div className="hv-hero-dots" /></div>
        <div className="hv-container">
          <div className="hv-hero-content">
            <div className="hv-eyebrow-row">
              <span className="hv-gold-line" />
              <span className="hv-eyebrow">DT Finance</span>
            </div>
            <h1 className="hv-h1">
              Estruturação Empresarial<br />e Inteligência Financeira
            </h1>
            <p className="hv-body-lg" style={{ marginBottom: 36, maxWidth: 560 }}>
              Organizamos empresas em crescimento através de processos, indicadores,
              governança e inteligência financeira. Estrutura para crescer com controle —
              não apenas relatórios.
            </p>
            <div className="hv-btn-row">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary">
                Agendar diagnóstico →
              </a>
              <a
                href="#hv-tres-linhas"
                className="hv-btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("hv-tres-linhas")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Conheça nossa atuação
              </a>
            </div>
            <p className="hv-hero-note">
              Diagnóstico estruturado e creditável&nbsp;&nbsp;·&nbsp;&nbsp;Sorocaba, SP — atende todo o Brasil
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2 · A VIRADA ───────────────────────────────────── */}
      <section className="hv-section hv-bg-white">
        <div className="hv-container">
          <div className="hv-eyebrow-row">
            <span className="hv-gold-line" />
            <span className="hv-eyebrow">A Virada</span>
          </div>
          <h2 className="hv-h2" style={{ marginBottom: 14, maxWidth: 520 }}>
            De executor financeiro a arquiteto do negócio
          </h2>
          <p className="hv-body-lg" style={{ marginBottom: 48, maxWidth: 580 }}>
            O financeiro é o espelho da empresa — não a doença. Caixa apertado quase sempre é
            sintoma de processos desorganizados. Mudamos o papel da DT para tratar o sistema,
            não só o sintoma.
          </p>
          <div className="hv-grid-2">
            <div className="hv-virada-antes">
              <div className="hv-card-tag hv-tag-antes">Antes</div>
              <h3 className="hv-h3" style={{ marginBottom: 10 }}>Gerente Financeiro Terceirizado</h3>
              <p className="hv-body-sm">
                Organiza números. Reativo. Atua sobre a consequência, depois que o problema chega ao caixa.
              </p>
            </div>
            <div className="hv-virada-depois">
              <div className="hv-card-tag hv-tag-depois">Agora</div>
              <h3 className="hv-h3" style={{ marginBottom: 10, color: "#fff" }}>Arquiteto de Gestão Empresarial</h3>
              <p className="hv-depois-text">
                Estrutura processos, indicadores e governança. Estratégico. Atua na origem para que o
                resultado financeiro seja consequência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 · O PROBLEMA ─────────────────────────────────── */}
      <section className="hv-section hv-bg-cream2">
        <div className="hv-container">
          <div className="hv-eyebrow-row">
            <span className="hv-gold-line" />
            <span className="hv-eyebrow">O Problema</span>
          </div>
          <h2 className="hv-h2" style={{ marginBottom: 12, maxWidth: 520 }}>
            O financeiro é consequência.
            <span className="hv-highlight"> A causa está nos processos.</span>
          </h2>
          <p className="hv-body-lg" style={{ marginBottom: 48, maxWidth: 540 }}>
            Arrumar só o financeiro não sustenta o crescimento. Se as áreas a montante estão
            desorganizadas, o problema reaparece no caixa.
          </p>
          <div className="hv-grid-3">
            {problemas.map((p, i) => (
              <div className="hv-card" key={i} style={{ padding: 24 }}>
                <div className="hv-prob-num">{i + 1}</div>
                <h3 className="hv-h3" style={{ marginBottom: 8 }}>{p.title}</h3>
                <p className="hv-body-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · MANIFESTO ──────────────────────────────────── */}
      <section className="hv-section hv-bg-white">
        <div className="hv-container">
          <div style={{ maxWidth: 700 }}>
            <div className="hv-gold-bar-left">
              <div className="hv-eyebrow" style={{ marginBottom: 16 }}>Nosso posicionamento</div>
              <p className="hv-manifesto">
                Organizamos empresas em crescimento através de
                <span className="hv-highlight"> processos, indicadores, governança</span> e{" "}
                <span className="hv-highlight">inteligência financeira</span>.
              </p>
              <p className="hv-body-lg" style={{ marginTop: 20, color: "var(--hv-muted)" }}>
                Estrutura para crescer com controle — não apenas relatórios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5 · TRÊS LINHAS ────────────────────────────────── */}
      <section className="hv-section hv-bg-cream2" id="hv-tres-linhas">
        <div className="hv-container">
          <div className="hv-eyebrow-row">
            <span className="hv-gold-line" />
            <span className="hv-eyebrow">Atuação</span>
          </div>
          <h2 className="hv-h2" style={{ marginBottom: 12 }}>Uma marca. Três linhas de atuação.</h2>
          <p className="hv-body-lg" style={{ marginBottom: 48, maxWidth: 480 }}>
            DT Finance como marca-mãe. Cada linha resolve uma camada do negócio.
          </p>
          <div className="hv-grid-3">
            {linhas.map((l) => (
              <div className="hv-linha-card" key={l.name} style={{ borderTop: `3px solid ${l.color}` }}>
                <span className="hv-linha-kicker" style={{ color: l.color }}>{l.kicker}</span>
                <div className="hv-linha-prefix">
                  {l.name} <span className="hv-linha-suffix">· {l.area}</span>
                </div>
                <h3 className="hv-h3" style={{ marginBottom: 10 }}>{l.title}</h3>
                <p className="hv-body-sm">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6 · ESCADA DE VALOR ────────────────────────────── */}
      <section className="hv-section hv-bg-white">
        <div className="hv-container">
          <div className="hv-eyebrow-row">
            <span className="hv-gold-line" />
            <span className="hv-eyebrow">Jornada do cliente</span>
          </div>
          <h2 className="hv-h2" style={{ marginBottom: 12, maxWidth: 400 }}>A escada de valor</h2>
          <p className="hv-body-lg" style={{ marginBottom: 48, maxWidth: 480 }}>
            O cliente não se forma e sai — ele sobe. Cada etapa abre a próxima e converte em recorrência.
          </p>
          <div className="hv-grid-4">
            {escada.map((s, i) => (
              <div
                className="hv-step-card"
                key={s.num}
                style={{ borderTop: `2px solid ${s.color}`, marginTop: [0, 12, 24, 36][i] }}
              >
                <div className="hv-step-num" style={{ color: s.color }}>{s.num}</div>
                {i < escada.length - 1 && <span className="hv-step-arrow">→</span>}
                <div className="hv-step-label" style={{ color: s.color }}>{s.label}</div>
                <h3 className="hv-h3" style={{ marginBottom: 8 }}>{s.title}</h3>
                <p className="hv-body-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7 · BANKING & CRÉDITO ──────────────────────────── */}
      <section className="hv-section hv-bg-cream2">
        <div className="hv-container">
          <div className="hv-banking-wrap">
            <div className="hv-banking-left">
              <div className="hv-eyebrow" style={{ marginBottom: 18 }}>Diferencial</div>
              <h2 className="hv-h2" style={{ marginBottom: 16 }}>
                Banking & Crédito —<br />
                <span className="hv-highlight">nosso maior diferencial</span>
              </h2>
              <p className="hv-body-lg" style={{ marginBottom: 32 }}>
                Relacionamento bancário ativo, dossiê profissional, negociação de taxas e limites,
                estruturação de crédito e linhas BNDES.
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary">
                Falar sobre crédito →
              </a>
            </div>
            <div className="hv-banking-right">
              <blockquote className="hv-banking-quote">
                "O dinheiro não fica mais barato porque você pede. Fica mais barato porque você{" "}
                <span className="hv-highlight">prova</span>."
              </blockquote>
              <div className="hv-banking-footer">
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  Dossiê profissional · Negociação de taxas · Linhas BNDES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8 · CTA FINAL ──────────────────────────────────── */}
      <section className="hv-cta-final">
        <div className="hv-container">
          <div className="hv-cta-line" />
          <h2 className="hv-cta-h">Transformamos números em decisões estratégicas.</h2>
          <p className="hv-cta-sub">
            Estrutura financeira e de gestão para empresas que querem crescer com controle.
          </p>
          <p className="hv-cta-micro">
            O ponto de partida é um diagnóstico — estruturado e creditável no contrato se você
            avançar em até 30 dias.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary hv-btn-lg">
            Agendar diagnóstico →
          </a>
          <div className="hv-cta-rod">
            <div className="hv-cta-rod-line" />
            <span className="hv-cta-rod-text">DT Finance · Sorocaba, SP — atende todo o Brasil</span>
            <div className="hv-cta-rod-line" />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer className="hv-footer">
        <div className="hv-container">
          <div className="hv-footer-grid">
            <div>
              <div className="hv-footer-logo" onClick={() => go("/")}>
                <img src="/logo-dt-v2.png" alt="DT Finance" className="hv-logo-img" />
                <div>
                  <span className="hv-footer-logo-name">DT Finance</span>
                  <span className="hv-footer-logo-sub">Estruturação & Inteligência</span>
                </div>
              </div>
              <p className="hv-footer-desc">
                Organizamos empresas em crescimento através de processos, indicadores,
                governança e inteligência financeira.
              </p>
              <p className="hv-footer-prac">Sorocaba, SP — atende todo o Brasil</p>
              <div className="hv-socials">
                <a className="hv-social-btn" href="https://www.linkedin.com/company/dtfinance" target="_blank" rel="noopener noreferrer">in</a>
                <a className="hv-social-btn" href="https://www.instagram.com/dtfinancebr" target="_blank" rel="noopener noreferrer">ig</a>
                <a className="hv-social-btn" href={WA} target="_blank" rel="noopener noreferrer">W</a>
              </div>
            </div>
            <div>
              <div className="hv-footer-col-title">Navegação</div>
              {navItems.map((item) => (
                <button key={item.label} className="hv-footer-link" onClick={() => go(item.path)}>{item.label}</button>
              ))}
              <button className="hv-footer-link" onClick={scrollToFooter}>Contato</button>
            </div>
            <div>
              <div className="hv-footer-col-title">Fale conosco</div>
              <a className="hv-footer-email" href="mailto:contato@dtfinance.com.br">contato@dtfinance.com.br</a>
              <p className="hv-footer-loc">Sorocaba, SP — Brasil</p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="hv-btn-primary hv-btn-sm">
                Agendar diagnóstico
              </a>
            </div>
          </div>
          <div className="hv-footer-rod">
            <span className="hv-footer-copy">© {new Date().getFullYear()} DT Finance. Todos os direitos reservados.</span>
            <button className="hv-footer-copy hv-footer-copy-link" onClick={() => go("/login")}>Área do Cliente</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Dados ──────────────────────────────────────────────────
const problemas = [
  { title: "PCP & Produção", desc: "Planejamento frágil gera estoque parado e ruptura." },
  { title: "Compras", desc: "Compra sem critério corrói margem e capital de giro." },
  { title: "Estoque", desc: "Estoque mal girado trava caixa e esconde perdas." },
  { title: "Comercial", desc: "Venda sem margem e sem política derruba o resultado." },
  { title: "Centro de Custo", desc: "Sem rateio, ninguém sabe onde o dinheiro se perde." },
  { title: "Governança", desc: "Sem controles, decisão vira achismo e risco." },
];

const GOLD = "#C9A84C";
const GREEN = "#2E7D5B";
const NAVY = "#0D1F3C";

const linhas = [
  { name: "DT Finance", area: "Financeiro", kicker: "Recorrência", color: GREEN, title: "Núcleo financeiro", desc: "DRE gerencial, fluxo de caixa, indicadores, BI, controladoria e CFO as a Service. Inclui Banking." },
  { name: "DT Performance", area: "Processos & Gestão", kicker: "Diagnóstico · Entrada", color: GOLD, title: "Estruturação operacional", desc: "Diagnóstico empresarial completo, redesenho de processos, indicadores por área e governança." },
  { name: "DT Transformation", area: "Projetos Especiais", kicker: "Projeto", color: NAVY, title: "Transformação", desc: "ERP, reestruturação, turnaround, mapeamento de processos e implantação completa." },
];

const escada = [
  { num: "01", label: "Performance", color: GOLD, title: "Diagnóstico completo", desc: "Mapeia problemas e quantifica o prêmio. Ponto de entrada da jornada." },
  { num: "02", label: "Finance", color: NAVY, title: "Recorrência", desc: "Núcleo financeiro + Banking. MRR previsível. O cliente permanece." },
  { num: "03", label: "Transformation", color: GREEN, title: "Projeto especial", desc: "ERP, turnaround, reestruturação. Quando a empresa precisa de mudança profunda." },
  { num: "04", label: "Finance ampliado", color: GOLD, title: "Governança", desc: "Monitora a estrutura nova e vira recorrência ampliada. Fidelização máxima." },
];

// ── Estilos (escopados em .home-v2) ────────────────────────
const styles = `
.home-v2 {
  --hv-navy: #0D1F3C; --hv-gold: #C9A84C; --hv-gold-dk: #A8893A; --hv-green: #2E7D5B;
  --hv-cream: #FAF8F2; --hv-cream2: #F4F1EA; --hv-white: #fff; --hv-body: #374151;
  --hv-muted: #6B7280; --hv-border: #E5E1D8;
  font-family: Arial, Helvetica, sans-serif;
  background: var(--hv-cream); color: var(--hv-body); -webkit-font-smoothing: antialiased;
}
.home-v2 *, .home-v2 *::before, .home-v2 *::after { box-sizing: border-box; }
.home-v2 h1, .home-v2 h2, .home-v2 h3, .home-v2 h4 { color: var(--hv-navy); font-weight: 700; line-height: 1.15; }
.home-v2 img { max-width: 100%; display: block; }

.home-v2 .hv-container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
.home-v2 .hv-section { padding: 80px 0; }
.home-v2 .hv-bg-white { background: var(--hv-white); }
.home-v2 .hv-bg-cream2 { background: var(--hv-cream2); }
.home-v2 .hv-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.home-v2 .hv-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; row-gap: 16px; }
.home-v2 .hv-grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }

.home-v2 .hv-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hv-gold); }
.home-v2 .hv-eyebrow-row { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
.home-v2 .hv-gold-line { display: block; width: 36px; height: 1px; background: var(--hv-gold); }
.home-v2 .hv-gold-bar-left { border-left: 3px solid var(--hv-gold); padding-left: 20px; }
.home-v2 .hv-h1 { font-size: clamp(1.875rem, 5vw, 3.375rem); line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 24px; }
.home-v2 .hv-h2 { font-size: clamp(1.5rem, 3.5vw, 2.375rem); }
.home-v2 .hv-h3 { font-size: 1.0625rem; }
.home-v2 .hv-body-lg { font-size: 1.0625rem; line-height: 1.75; color: var(--hv-body); }
.home-v2 .hv-body-sm { font-size: 0.875rem; line-height: 1.65; color: var(--hv-muted); }
.home-v2 .hv-highlight { color: var(--hv-gold); }

.home-v2 .hv-btn-primary { display: inline-flex; align-items: center; justify-content: center; background: var(--hv-gold); color: var(--hv-navy); font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 0.875rem; border: none; cursor: pointer; padding: 14px 28px; border-radius: 6px; text-decoration: none; transition: background 0.18s; }
.home-v2 .hv-btn-primary:hover { background: var(--hv-gold-dk); }
.home-v2 .hv-btn-sm { padding: 10px 20px; font-size: 13px; }
.home-v2 .hv-btn-lg { font-size: 0.9375rem; padding: 16px 40px; }
.home-v2 .hv-btn-outline { display: inline-flex; align-items: center; justify-content: center; background: transparent; color: var(--hv-navy); font-weight: 600; font-size: 0.875rem; border: 1.5px solid var(--hv-navy); cursor: pointer; padding: 13px 28px; border-radius: 6px; text-decoration: none; transition: all 0.18s; }
.home-v2 .hv-btn-outline:hover { background: var(--hv-navy); color: #fff; }
.home-v2 .hv-btn-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }

.home-v2 .hv-card { background: var(--hv-white); border: 1px solid var(--hv-border); border-radius: 8px; transition: box-shadow 0.2s, transform 0.2s; }
.home-v2 .hv-card:hover { box-shadow: 0 6px 24px rgba(13,31,60,0.08); transform: translateY(-2px); }

/* Navbar */
.home-v2 .hv-navbar { background: rgba(250,248,242,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--hv-border); position: sticky; top: 0; z-index: 100; }
.home-v2 .hv-navbar-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; height: 68px; }
.home-v2 .hv-logo-area { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.home-v2 .hv-logo-img { height: 34px; width: auto; object-fit: contain; }
.home-v2 .hv-logo-text { display: flex; flex-direction: column; line-height: 1.2; }
.home-v2 .hv-logo-name { font-weight: 700; font-size: 0.9rem; color: var(--hv-navy); }
.home-v2 .hv-logo-sub { font-size: 9px; letter-spacing: 0.1em; color: var(--hv-muted); text-transform: uppercase; }
.home-v2 .hv-nav-links { display: flex; gap: 4px; }
.home-v2 .hv-nav-link { font-family: Arial, Helvetica, sans-serif; font-size: 0.875rem; font-weight: 500; color: rgba(13,31,60,0.55); padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: color 0.15s; background: none; border: none; }
.home-v2 .hv-nav-link:hover { color: var(--hv-navy); font-weight: 700; }
.home-v2 .hv-nav-cta { display: flex; align-items: center; gap: 16px; }
.home-v2 .hv-nav-area { font-size: 0.75rem; color: #9CA3AF; cursor: pointer; }
.home-v2 .hv-nav-area:hover { color: var(--hv-navy); }
.home-v2 .hv-burger { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 6px; }
.home-v2 .hv-burger span { width: 22px; height: 2px; background: var(--hv-navy); display: block; }
.home-v2 .hv-mobile-menu { display: flex; flex-direction: column; gap: 4px; padding: 12px 40px 20px; border-top: 1px solid var(--hv-border); background: rgba(250,248,242,0.98); }
.home-v2 .hv-mobile-link { text-align: left; font-family: Arial, Helvetica, sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--hv-navy); padding: 10px 4px; background: none; border: none; cursor: pointer; }

/* Hero */
.home-v2 .hv-hero { background: var(--hv-cream); padding: 96px 0 72px; position: relative; overflow: hidden; }
.home-v2 .hv-hero-content { max-width: 640px; position: relative; z-index: 2; }
.home-v2 .hv-hero-note { margin-top: 20px; font-size: 11px; color: #9CA3AF; }
.home-v2 .hv-hero-ornament { position: absolute; right: 0; top: 0; bottom: 0; width: 42%; background: linear-gradient(135deg, transparent 0%, rgba(201,168,76,0.04) 50%, rgba(13,31,60,0.04) 100%); border-left: 1px solid rgba(229,225,216,0.5); pointer-events: none; }
.home-v2 .hv-hero-ornament::before { content: "DT"; position: absolute; bottom: 40px; right: 48px; font-size: 9rem; font-weight: 900; line-height: 1; color: rgba(13,31,60,0.04); letter-spacing: -0.05em; user-select: none; }
.home-v2 .hv-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, #C9A84C 1px, transparent 1px); background-size: 32px 32px; opacity: 0.06; }
.home-v2 .hv-hero-stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--hv-gold); opacity: 0.3; }

/* A Virada */
.home-v2 .hv-virada-antes { background: var(--hv-cream2); border: 1px solid var(--hv-border); border-radius: 8px; padding: 32px; }
.home-v2 .hv-virada-depois { background: var(--hv-navy); border-radius: 8px; padding: 32px; position: relative; overflow: hidden; }
.home-v2 .hv-virada-depois::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--hv-gold); }
.home-v2 .hv-depois-text { font-size: 0.875rem; line-height: 1.65; color: rgba(255,255,255,0.6); }
.home-v2 .hv-card-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid; }
.home-v2 .hv-tag-antes { color: #9CA3AF; border-color: var(--hv-border); }
.home-v2 .hv-tag-depois { color: rgba(201,168,76,0.55); border-color: rgba(255,255,255,0.07); }

/* O Problema */
.home-v2 .hv-prob-num { width: 28px; height: 28px; border-radius: 4px; background: rgba(201,168,76,0.12); color: var(--hv-gold); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }

/* Manifesto */
.home-v2 .hv-manifesto { font-size: clamp(1.375rem, 2.8vw, 2rem); font-weight: 700; line-height: 1.3; color: var(--hv-navy); }

/* Três Linhas */
.home-v2 .hv-linha-card { border-radius: 8px; padding: 28px; border: 1px solid var(--hv-border); background: var(--hv-white); }
.home-v2 .hv-linha-kicker { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
.home-v2 .hv-linha-prefix { font-size: 11px; color: #9CA3AF; margin-top: 14px; margin-bottom: 2px; }
.home-v2 .hv-linha-suffix { color: var(--hv-gold); }

/* Escada */
.home-v2 .hv-step-card { padding: 24px; border-radius: 8px; background: var(--hv-white); border: 1px solid var(--hv-border); position: relative; }
.home-v2 .hv-step-num { font-size: 2rem; font-weight: 900; opacity: 0.2; line-height: 1; margin-bottom: 12px; }
.home-v2 .hv-step-arrow { position: absolute; top: 16px; right: 16px; color: var(--hv-border); font-size: 1.2rem; }
.home-v2 .hv-step-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }

/* Banking */
.home-v2 .hv-banking-wrap { border: 1px solid var(--hv-border); border-radius: 8px; overflow: hidden; }
.home-v2 .hv-banking-left { padding: 48px; background: var(--hv-white); }
.home-v2 .hv-banking-right { padding: 48px; background: var(--hv-navy); position: relative; display: flex; flex-direction: column; justify-content: center; }
.home-v2 .hv-banking-right::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--hv-gold); }
.home-v2 .hv-banking-quote { font-size: clamp(1.1rem, 2.2vw, 1.4rem); font-weight: 700; line-height: 1.45; color: #fff; font-style: italic; }
.home-v2 .hv-banking-footer { border-top: 1px solid rgba(255,255,255,0.07); margin-top: 24px; padding-top: 20px; }
@media (min-width: 769px) { .home-v2 .hv-banking-wrap { display: grid; grid-template-columns: 1fr 1fr; } }

/* CTA Final */
.home-v2 .hv-cta-final { background: var(--hv-navy); padding: 80px 0; text-align: center; }
.home-v2 .hv-cta-line { width: 48px; height: 1px; background: var(--hv-gold); margin: 0 auto 36px; }
.home-v2 .hv-cta-h { font-size: clamp(1.75rem, 4vw, 2.875rem); color: #fff; max-width: 520px; margin: 0 auto 16px; }
.home-v2 .hv-cta-sub { font-size: 1.0625rem; color: rgba(255,255,255,0.55); max-width: 420px; margin: 0 auto 12px; }
.home-v2 .hv-cta-micro { font-size: 12px; color: rgba(255,255,255,0.3); max-width: 380px; margin: 0 auto 36px; }
.home-v2 .hv-cta-rod { border-top: 1px solid rgba(255,255,255,0.06); margin-top: 56px; padding-top: 28px; display: flex; align-items: center; justify-content: center; gap: 14px; }
.home-v2 .hv-cta-rod-line { width: 28px; height: 1px; background: var(--hv-gold); opacity: 0.4; }
.home-v2 .hv-cta-rod-text { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.22); }

/* Footer */
.home-v2 .hv-footer { background: #0a1428; padding: 64px 0 32px; }
.home-v2 .hv-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1.5fr; gap: 48px; margin-bottom: 48px; }
.home-v2 .hv-footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; cursor: pointer; }
.home-v2 .hv-footer-logo-name { font-weight: 700; font-size: 0.9rem; color: #fff; display: block; }
.home-v2 .hv-footer-logo-sub { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(199,210,226,0.3); }
.home-v2 .hv-footer-desc { font-size: 0.875rem; line-height: 1.65; color: rgba(199,210,226,0.4); max-width: 240px; margin-bottom: 18px; }
.home-v2 .hv-footer-prac { font-size: 11px; color: rgba(199,210,226,0.28); margin-bottom: 22px; }
.home-v2 .hv-socials { display: flex; gap: 10px; }
.home-v2 .hv-social-btn { width: 34px; height: 34px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.09); display: flex; align-items: center; justify-content: center; color: rgba(199,210,226,0.38); font-size: 13px; cursor: pointer; transition: all 0.18s; text-decoration: none; }
.home-v2 .hv-social-btn:hover { border-color: rgba(201,168,76,0.4); color: var(--hv-gold); }
.home-v2 .hv-footer-col-title { font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(199,210,226,0.28); margin-bottom: 18px; }
.home-v2 .hv-footer-link { display: block; font-size: 0.875rem; color: rgba(199,210,226,0.42); margin-bottom: 10px; cursor: pointer; transition: color 0.15s; background: none; border: none; text-align: left; padding: 0; font-family: Arial, Helvetica, sans-serif; }
.home-v2 .hv-footer-link:hover { color: #fff; }
.home-v2 .hv-footer-email { font-size: 0.875rem; color: rgba(199,210,226,0.42); margin-bottom: 6px; display: block; text-decoration: none; }
.home-v2 .hv-footer-loc { font-size: 0.875rem; color: rgba(199,210,226,0.28); margin-bottom: 28px; }
.home-v2 .hv-footer-rod { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
.home-v2 .hv-footer-copy { font-size: 11px; color: rgba(199,210,226,0.22); }
.home-v2 .hv-footer-copy-link { background: none; border: none; cursor: pointer; font-family: Arial, Helvetica, sans-serif; }

/* Responsivo */
@media (max-width: 768px) {
  .home-v2 .hv-container { padding: 0 20px; }
  .home-v2 .hv-navbar-inner { padding: 0 20px; }
  .home-v2 .hv-grid-2, .home-v2 .hv-grid-3, .home-v2 .hv-grid-4 { grid-template-columns: 1fr; }
  .home-v2 .hv-section { padding: 56px 0; }
  .home-v2 .hv-step-card { margin-top: 0 !important; }
  .home-v2 .hv-nav-links, .home-v2 .hv-nav-cta { display: none; }
  .home-v2 .hv-burger { display: flex; }
  .home-v2 .hv-banking-left, .home-v2 .hv-banking-right { padding: 32px; }
}
`;
