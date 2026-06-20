import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NAVY = "#0D1F3C";
const GOLD = "#C9A84C";
const GOLD_DK = "#A8893A";
const GREEN = "#1F7A4D";
const CREAM = "#F7F4EE";
const MUTED = "#5B6470";

const WA =
  "https://wa.me/5511969771585?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20DT%20Finance%20e%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico.";

const serif = { fontFamily: "'Playfair Display', serif" } as const;

const problemas = [
  { title: "PCP & Produção", desc: "Planejamento frágil gera estoque parado e ruptura." },
  { title: "Compras", desc: "Compra sem critério corrói margem e capital de giro." },
  { title: "Estoque", desc: "Estoque mal girado trava caixa e esconde perdas." },
  { title: "Comercial", desc: "Venda sem margem e sem política derruba o resultado." },
  { title: "Centro de Custo", desc: "Sem rateio, ninguém sabe onde o dinheiro se perde." },
  { title: "Governança", desc: "Sem controles, decisão vira achismo e risco." },
];

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

export default function Home() {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 58%)" }}
        />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-line" />
              <span className="eyebrow">DT Finance</span>
            </div>
            <h1 style={{ ...serif, color: NAVY }} className="text-4xl sm:text-5xl lg:text-[58px] font-bold leading-[1.1] mb-6">
              Estruturação Empresarial e <span style={{ color: GOLD_DK }}>Inteligência Financeira</span>
            </h1>
            <p className="text-lg leading-relaxed mb-9 max-w-2xl" style={{ color: MUTED }}>
              Organizamos empresas em crescimento através de processos, indicadores, governança e
              inteligência financeira. Estrutura para crescer com controle — não apenas relatórios.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 rounded-lg text-sm font-semibold text-center w-full sm:w-auto">
                Agendar diagnóstico
              </a>
              <button onClick={() => scrollTo("tres-linhas")} className="btn-outline-blue px-7 py-4 rounded-lg text-sm w-full sm:w-auto">
                Conheça nossa atuação
              </button>
            </div>
            <p className="mt-5 text-xs" style={{ color: "rgba(27,65,88,0.42)" }}>
              Diagnóstico estruturado e creditável · Sorocaba, SP — atende todo o Brasil
            </p>
          </div>
        </div>
      </section>

      {/* A Virada */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <span className="eyebrow block mb-5">A Virada</span>
          <h2 style={{ ...serif, color: NAVY }} className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-5 max-w-xl">
            De executor financeiro a arquiteto do negócio
          </h2>
          <p className="text-base leading-relaxed mb-12 max-w-2xl" style={{ color: MUTED }}>
            O financeiro é o espelho da empresa — não a doença. Caixa apertado quase sempre é sintoma
            de processos desorganizados. Mudamos o papel da DT para tratar o sistema, não só o sintoma.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl p-8 border" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(13,31,60,0.08)" }}>
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase pb-3 mb-4 border-b" style={{ color: "#9CA3AF", borderColor: "rgba(13,31,60,0.08)" }}>Antes</div>
              <h3 style={{ ...serif, color: NAVY }} className="text-lg font-bold mb-2.5">Gerente Financeiro Terceirizado</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                Organiza números. Reativo. Atua sobre a consequência, depois que o problema chega ao caixa.
              </p>
            </div>
            <div className="rounded-xl p-8 relative overflow-hidden" style={{ backgroundColor: NAVY }}>
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: GOLD }} />
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase pb-3 mb-4 border-b" style={{ color: "rgba(201,168,76,0.6)", borderColor: "rgba(255,255,255,0.08)" }}>Agora</div>
              <h3 style={{ ...serif, color: "#FFFFFF" }} className="text-lg font-bold mb-2.5">Arquiteto de Gestão Empresarial</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(199,210,226,0.7)" }}>
                Estrutura processos, indicadores e governança. Estratégico. Atua na origem para que o
                resultado financeiro seja consequência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow block mb-5">O Problema</span>
            <h2 style={{ ...serif, color: NAVY }} className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
              O financeiro é consequência. <span style={{ color: GOLD_DK }}>A causa está nos processos.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Arrumar só o financeiro não sustenta o crescimento. Se as áreas a montante estão
              desorganizadas, o problema reaparece no caixa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemas.map((p, i) => (
              <div key={i} className="service-card rounded-xl p-8 border" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(13,31,60,0.08)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-5 text-xs font-bold" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: GOLD }}>
                  {i + 1}
                </div>
                <h3 style={{ ...serif, color: NAVY }} className="text-lg font-bold mb-2.5">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posicionamento */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl border-l-4 pl-7" style={{ borderColor: GOLD }}>
            <span className="eyebrow block mb-5">Nosso posicionamento</span>
            <p style={{ ...serif, color: NAVY }} className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.3]">
              Organizamos empresas em crescimento através de <span style={{ color: GOLD_DK }}>processos, indicadores, governança</span> e <span style={{ color: GOLD_DK }}>inteligência financeira</span>.
            </p>
            <p className="text-lg mt-6" style={{ color: MUTED }}>
              Estrutura para crescer com controle — não apenas relatórios.
            </p>
          </div>
        </div>
      </section>

      {/* Linhas de atuação */}
      <section id="tres-linhas" className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl mb-14">
            <span className="eyebrow block mb-5">Atuação</span>
            <h2 style={{ ...serif, color: NAVY }} className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
              Uma marca. Três linhas de atuação.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              DT Finance como marca-mãe. Cada linha resolve uma camada do negócio.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {linhas.map((l) => (
              <div key={l.name} className="service-card rounded-xl p-8 border" style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(13,31,60,0.08)", borderTop: `3px solid ${l.color}` }}>
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: l.color }}>{l.kicker}</span>
                <div className="text-[11px] mt-3.5 mb-1" style={{ color: "#9CA3AF" }}>
                  {l.name} <span style={{ color: GOLD }}>· {l.area}</span>
                </div>
                <h3 style={{ ...serif, color: NAVY }} className="text-lg font-bold mb-2.5">{l.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escada de valor */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-xl mb-14">
            <span className="eyebrow block mb-5">Jornada do cliente</span>
            <h2 style={{ ...serif, color: NAVY }} className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
              A escada de valor
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              O cliente não se forma e sai — ele sobe. Cada etapa abre a próxima e converte em recorrência.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {escada.map((s, i) => (
              <div
                key={s.num}
                className="rounded-xl p-7 border bg-white relative"
                style={{ borderColor: "rgba(13,31,60,0.08)", borderTop: `2px solid ${s.color}` }}
              >
                <div style={{ ...serif, color: s.color, opacity: 0.25 }} className="text-4xl font-bold leading-none mb-3">{s.num}</div>
                {i < escada.length - 1 && <span className="absolute top-5 right-5 text-lg" style={{ color: "rgba(13,31,60,0.15)" }}>→</span>}
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: s.color }}>{s.label}</div>
                <h3 style={{ ...serif, color: NAVY }} className="text-base font-bold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banking & Crédito */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(13,31,60,0.08)" }}>
            <div className="p-7 sm:p-10 lg:p-14" style={{ backgroundColor: "#FFFFFF" }}>
              <span className="eyebrow block mb-5">Diferencial</span>
              <h2 style={{ ...serif, color: NAVY }} className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.2] mb-5">
                Banking & Crédito —<br />
                <span style={{ color: GOLD_DK }}>nosso maior diferencial</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: MUTED }}>
                Relacionamento bancário ativo, dossiê profissional, negociação de taxas e limites,
                estruturação de crédito e linhas BNDES.
              </p>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 rounded-lg text-sm font-semibold inline-flex">
                Falar sobre crédito
              </a>
            </div>
            <div className="p-7 sm:p-10 lg:p-14 relative flex flex-col justify-center" style={{ backgroundColor: NAVY }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: GOLD }} />
              <blockquote style={{ ...serif }} className="text-xl sm:text-2xl font-bold leading-snug italic" >
                <span style={{ color: "#FFFFFF" }}>"O dinheiro não fica mais barato porque você pede. Fica mais barato porque você </span>
                <span style={{ color: GOLD }}>prova</span>
                <span style={{ color: "#FFFFFF" }}>."</span>
              </blockquote>
              <div className="border-t mt-6 pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs" style={{ color: "rgba(199,210,226,0.45)" }}>
                  Dossiê profissional · Negociação de taxas · Linhas BNDES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <span className="gold-line mx-auto mb-8" />
          <h2 style={{ ...serif, color: "#FFFFFF" }} className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] mb-6 max-w-3xl mx-auto">
            Transformamos números em decisões estratégicas.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4 max-w-xl mx-auto" style={{ color: "#C7D2E2" }}>
            Estrutura financeira e de gestão para empresas que querem crescer com controle.
          </p>
          <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: "rgba(199,210,226,0.45)" }}>
            O ponto de partida é um diagnóstico — estruturado e creditável no contrato se você avançar em até 30 dias.
          </p>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary px-10 py-4 rounded-lg text-base font-semibold inline-flex">
            Agendar diagnóstico
          </a>
          <div className="flex items-center justify-center gap-4 mt-14 pt-14 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <span className="gold-line" />
            <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(199,210,226,0.35)" }}>
              DT Finance · Sorocaba, SP — atende todo o Brasil
            </span>
            <span className="gold-line" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
