import { DtfNav } from "./DtfNav";
import { useReveal } from "@/hooks/useReveal";
import "@/styles/dtf-home.css";

/** Fluxo real de contato do site — o mesmo do botão flutuante e das outras páginas. */
const WA_URL = "https://wa.me/5511969771585";
const WA_PROJETO =
  "https://wa.me/5511969771585?text=" +
  encodeURIComponent("Olá! Quero falar sobre um projeto de software sob medida.");
const EMAIL = "contato@dtfinance.com.br";

const FORCAS = [
  {
    no: "01",
    titulo: "Consultoria",
    texto:
      "Estruturação, processos, indicadores e governança. A metodologia DT aplicada para a empresa crescer com controle.",
    tags: ["Finance", "Performance", "Transformation"],
  },
  {
    no: "02",
    titulo: "Inteligência",
    texto:
      "DRE gerencial, fluxo de caixa, BI e CFO as a Service. Números que viram decisão, não relatório esquecido na gaveta.",
    tags: ["DRE gerencial", "Fluxo de caixa", "CFO as a Service"],
  },
  {
    no: "03",
    titulo: "Tecnologia",
    texto:
      "Plataformas verticais próprias com CFO embarcado. A metodologia da DT virou software que roda a operação por dentro.",
    tags: ["DT Empreita", "DT GYM", "DT Agro"],
  },
];

const CAUSAS = [
  { no: "01", titulo: "PCP & Produção", texto: "Planejamento frágil gera estoque parado e ruptura." },
  { no: "02", titulo: "Compras", texto: "Compra sem critério corrói margem e capital de giro." },
  { no: "03", titulo: "Estoque", texto: "Estoque mal girado trava caixa e esconde perdas." },
  { no: "04", titulo: "Comercial", texto: "Venda sem margem e sem política derruba o resultado." },
  { no: "05", titulo: "Centro de Custo", texto: "Sem rateio, ninguém sabe onde o dinheiro se perde." },
  { no: "06", titulo: "Governança", texto: "Sem controles, decisão vira achismo e risco." },
];

const LINHAS = [
  {
    nome: "DT Finance",
    papel: "Núcleo financeiro",
    desc: "DRE gerencial, fluxo de caixa, indicadores, BI, controladoria e CFO as a Service. Inclui Banking.",
    kick: "Recorrência",
  },
  {
    nome: "DT Performance",
    papel: "Processos & Gestão",
    desc: "Diagnóstico empresarial completo, redesenho de processos, indicadores por área e governança.",
    kick: "Diagnóstico · Entrada",
  },
  {
    nome: "DT Transformation",
    papel: "Projetos Especiais",
    desc: "ERP, reestruturação, turnaround, mapeamento de processos e implantação completa.",
    kick: "Projeto",
  },
];

const DEGRAUS = [
  {
    no: "01",
    kick: "Performance",
    titulo: "Diagnóstico completo",
    texto: "Mapeia problemas e quantifica o prêmio. O ponto de entrada da jornada.",
  },
  {
    no: "02",
    kick: "Finance",
    titulo: "Recorrência",
    texto: "Núcleo financeiro e Banking. MRR previsível. O cliente permanece.",
  },
  {
    no: "03",
    kick: "Transformation",
    titulo: "Projeto especial",
    texto: "ERP, turnaround, reestruturação. Quando a empresa precisa de mudança profunda.",
  },
  {
    no: "04",
    kick: "Finance ampliado",
    titulo: "Governança",
    texto: "Monitora a estrutura nova e vira recorrência ampliada. Fidelização máxima.",
  },
];

const PLATAFORMAS = [
  {
    nome: "DT Empreita",
    cor: "#f97316",
    titulo: "Do canteiro ao recebimento.",
    texto:
      "Obras, medições, RH, financeiro e compras para empreiteiras e construtoras. IA que lê o contrato e boletim com assinatura eletrônica integrada.",
    img: "/img/dt-empreita-medicoes.png",
    alt: "DT Empreita, tela de Medições",
    inverte: false,
  },
  {
    nome: "DT GYM",
    cor: "#7c3aed",
    titulo: "O financeiro da academia numa tela.",
    texto:
      "Cobrança, DRE, fluxo de caixa e fechamento de repasses TotalPass e Wellhub, sem planilha. CFO Dashboard com IA que aponta churn e margem.",
    img: "/img/dt-gym-cfo.png",
    alt: "DT GYM, CFO Dashboard",
    inverte: true,
  },
  {
    nome: "DT Agro",
    cor: "#16a34a",
    titulo: "A safra sob controle, do plantio à venda.",
    texto:
      "Controle por safra, DRE rural, custo por hectare, pecuária, máquinas e financiamentos. CFO Rural que lê a operação e aponta onde está a margem.",
    img: "/img/dt-agro.png",
    alt: "DT Agro, painel da safra",
    inverte: false,
  },
];

export function DtfHome() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="dtf" ref={ref}>
      <DtfNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero" id="top">
        <img
          className="hero-img"
          src="/img/hero-atrio.jpg"
          alt="Átrio corporativo com escadaria vista de cima"
          fetchPriority="high"
        />
        <div className="hero-ov" />
        <div className="wrap hero-in">
          <span className="kicker on-dark">Grupo DT · Gestão, Inteligência e Tecnologia</span>
          <h1 className="serif">
            Muito mais que uma <em>consultoria financeira</em>.
          </h1>
          <p className="lead">
            Somos a estrutura que faz empresas crescerem com controle: metodologia consultiva,
            inteligência financeira e plataformas próprias com CFO embarcado. Não apenas
            relatórios, mas o sistema inteiro funcionando.
          </p>
          <div className="hero-cta">
            <a href="#contato" className="btn btn-gold">
              Agendar diagnóstico <span className="arrow">→</span>
            </a>
            <a href="#plataformas" className="btn btn-line">
              Conhecer as plataformas
            </a>
          </div>
          <div className="hero-cred">
            <div className="cred">
              <div className="v">Consultoria</div>
              <div className="l">metodologia DT</div>
            </div>
            <div className="cred">
              <div className="v">CFO as a Service</div>
              <div className="l">inteligência financeira</div>
            </div>
            <div className="cred">
              <div className="v">Banking &amp; BNDES</div>
              <div className="l">crédito estruturado</div>
            </div>
            <div className="cred">
              <div className="v">Software próprio</div>
              <div className="l">plataformas verticais</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO / A VIRADA ─────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="manifesto reveal">
            <span className="kicker">A virada</span>
            <p>
              O financeiro é o espelho da empresa, <span className="g">não a doença</span>. Caixa
              apertado quase sempre é sintoma de processos desorganizados. Por isso deixamos de ser
              o gerente que arruma números para nos tornarmos o{" "}
              <span className="g">arquiteto que estrutura o negócio</span>.
            </p>
          </div>
          <div className="virada reveal">
            <div className="vcol">
              <div className="tag">Antes · Gerente financeiro terceirizado</div>
              <h3 className="serif">Organiza números</h3>
              <p>Reativo. Atua sobre a consequência, depois que o problema já chegou ao caixa.</p>
            </div>
            <div className="vcol now">
              <div className="tag">Agora · Arquiteto de gestão empresarial</div>
              <h3 className="serif">Estrutura o negócio</h3>
              <p>
                Estratégico. Organiza processos, indicadores, governança e tecnologia para que o
                resultado financeiro seja consequência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSSISTEMA ──────────────────────────────────────── */}
      <section id="ecossistema" className="sec sec-dark">
        <div className="wrap">
          <div className="shead reveal">
            <span className="kicker on-dark">O ecossistema</span>
            <h2 className="title">Uma marca. Três forças que se completam.</h2>
            <p className="lead on-dark">
              É o que nos torna mais que uma consultoria: entregamos a mesma metodologia como
              serviço e como software, com inteligência financeira no centro.
            </p>
          </div>
          <div className="forces reveal">
            {FORCAS.map((f) => (
              <div className="force" key={f.no}>
                <div className="no">{f.no}</div>
                <h3 className="serif">{f.titulo}</h3>
                <p>{f.texto}</p>
                <div className="tags">
                  {f.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ─────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="shead reveal">
            <span className="kicker">O problema</span>
            <h2 className="title">
              O financeiro é consequência.
              <br />A causa está nos processos.
            </h2>
            <p className="lead">
              Arrumar só o financeiro não sustenta o crescimento. Se as áreas a montante estão
              desorganizadas, o problema reaparece no caixa.
            </p>
          </div>
          <div className="prob reveal">
            {CAUSAS.map((c) => (
              <div className="prow" key={c.no}>
                <div className="no">{c.no}</div>
                <div>
                  <h3 className="serif">{c.titulo}</h3>
                  <p>{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LINHAS DE ATUAÇÃO ────────────────────────────────── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <div className="shead reveal">
            <span className="kicker on-dark">Atuação</span>
            <h2 className="title">Três linhas. Cada uma resolve uma camada.</h2>
          </div>
          <div className="lines reveal">
            {LINHAS.map((l) => (
              <div className="lrow" key={l.nome}>
                <div>
                  <div className="lname serif">{l.nome}</div>
                  <div className="lrole">{l.papel}</div>
                </div>
                <div className="ldesc">{l.desc}</div>
                <div className="lkick">{l.kick}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESCADA DE VALOR ──────────────────────────────────── */}
      <section id="metodologia" className="sec">
        <div className="wrap">
          <div className="shead reveal">
            <span className="kicker">A jornada do cliente</span>
            <h2 className="title">A escada de valor.</h2>
            <p className="lead">
              O cliente não se forma e sai, ele sobe. Cada etapa abre a próxima e converte em
              recorrência.
            </p>
          </div>
          <div className="ladder reveal">
            {DEGRAUS.map((d) => (
              <div className="rung" key={d.no}>
                <div className="no">{d.no}</div>
                <div className="lkick">{d.kick}</div>
                <h3 className="serif">{d.titulo}</h3>
                <p>{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATAFORMAS ──────────────────────────────────────── */}
      <section id="plataformas" className="sec sec-dark">
        <div className="wrap">
          <div className="shead reveal">
            <span className="kicker on-dark">Tecnologia própria</span>
            <h2 className="title">A metodologia da DT virou software.</h2>
            <p className="lead on-dark">
              Não indicamos sistema de terceiros: construímos os nossos. Plataformas verticais que
              rodam a operação por dentro, cada uma com um CFO digital que aplica a inteligência da
              DT Finance ao dia a dia do cliente.
            </p>
          </div>

          <div className="showcase reveal">
            {PLATAFORMAS.map((p) => (
              <div className={p.inverte ? "show rev" : "show"} key={p.nome}>
                <div className="show-txt">
                  <div className="plabel">
                    <span className="pdot" style={{ background: p.cor }} /> {p.nome}
                  </div>
                  <h3 className="serif">{p.titulo}</h3>
                  <p>{p.texto}</p>
                  <div className="pcfo">Consultor CFO embarcado</div>
                </div>
                <div className="show-media">
                  <div className="frame">
                    <div className="frame-bar">
                      <span />
                      <span />
                      <span />
                    </div>
                    <img src={p.img} alt={p.alt} loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bespoke reveal">
            <div>
              <span className="kicker on-dark">Software sob medida</span>
              <h3 className="serif">
                E quando o negócio precisa de algo único, a gente desenha do zero.
              </h3>
            </div>
            <div>
              <p>
                Além das plataformas verticais, a DT Finance desenvolve software sob medida para
                empresas. Entendemos a operação real, desenhamos a solução e ajustamos a cada
                necessidade específica, do primeiro protótipo à evolução contínua, sempre com a
                inteligência financeira da DT por dentro.
              </p>
              <a href={WA_PROJETO} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                Falar sobre um projeto <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANKING & CRÉDITO ────────────────────────────────── */}
      <section id="banking" className="bank">
        <div className="bank-img">
          <img src="/img/torre-banking.jpg" alt="Torre corporativa ao entardecer" loading="lazy" />
        </div>
        <div className="bank-txt">
          <div className="reveal">
            <span className="kicker on-dark">O diferencial</span>
            <h2 className="title">Banking &amp; Crédito.</h2>
            <p>
              Relacionamento bancário ativo, dossiê profissional, negociação de taxas e limites,
              estruturação de crédito e linhas BNDES. A gente não pede dinheiro mais barato: prova
              que a empresa merece.
            </p>
            <div className="bquote">
              “O dinheiro não fica mais barato porque você pede. Fica mais barato porque você
              prova.”
              <span className="cap">Dossiê profissional · Negociação de taxas · Linhas BNDES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTADOS ───────────────────────────────────────────
           Seção fora do ar até termos os números reais: publicar
           "+00 empresas" é pior que não ter a seção. O CSS (.stats,
           .stat) continua em dtf-home.css, e a marcação original está
           em dtfinance-preview.html — voltar é recolocar o <section>
           com os quatro indicadores. */}

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section id="sobre" className="sec">
        <div className="wrap about">
          <div className="about-img reveal">
            <img
              src="/img/time-consultores.jpg"
              alt="Consultores da DT Finance analisando indicadores em reunião"
              loading="lazy"
            />
          </div>
          <div className="reveal">
            <span className="kicker">Quem somos</span>
            <h2 className="title">Consultores e desenvolvedores no mesmo time.</h2>
            <p>
              A DT Finance nasceu na consultoria de gestão financeira e evoluiu para um grupo de
              gestão, inteligência e tecnologia. Os mesmos consultores que estruturam empresas em
              campo desenham, junto com o time de desenvolvimento, o software que carrega essa
              metodologia.
            </p>
            <ul className="about-points">
              <li>
                <span className="b">01</span> Metodologia consultiva testada em campo, não teoria de
                planilha.
              </li>
              <li>
                <span className="b">02</span> Inteligência financeira que vira decisão, com CFO as a
                Service.
              </li>
              <li>
                <span className="b">03</span> Tecnologia própria: a metodologia embarcada em
                plataformas verticais.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section id="contato" className="cta">
        <div className="cta-glow" />
        <h2 className="serif">Transformamos números em decisões estratégicas.</h2>
        <p>
          Estrutura financeira, de gestão e de tecnologia para empresas que querem crescer com
          controle. Comece por um diagnóstico estruturado, creditável no contrato se avançar em até
          30 dias.
        </p>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
          Agendar diagnóstico <span className="arrow">→</span>
        </a>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="n serif">DT Finance</div>
              <p>
                Transformamos empresas através de governança, processos, performance, inteligência
                financeira e tecnologia própria.
              </p>
            </div>
            <div className="foot-col">
              <h5>Navegação</h5>
              <ul>
                <li><a href="#ecossistema">Ecossistema</a></li>
                <li><a href="#metodologia">Metodologia</a></li>
                <li><a href="#plataformas">Plataformas</a></li>
                <li><a href="#banking">Banking</a></li>
                <li><a href="#sobre">Sobre</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Contato</h5>
              <ul>
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li>
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                    Agendar diagnóstico
                  </a>
                </li>
                <li><span>Sorocaba, SP — atende todo o Brasil</span></li>
              </ul>
            </div>
          </div>
          <p className="foot-copy">© 2026 DT Finance. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
