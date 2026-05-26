import { TrendingUp, ShieldCheck, Target, Gauge } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useLocation } from "wouter";

const bullets = [
  { icon: <TrendingUp size={14} />, text: "DRE Gerencial mensal" },
  { icon: <Gauge size={14} />, text: "Fluxo de caixa projetado — 30, 60 e 90 dias" },
  { icon: <ShieldCheck size={14} />, text: "KPIs, alertas e relatórios executivos" },
  { icon: <Target size={14} />, text: "CFO estratégico sem custo de executivo fixo" },
];

const stats = [
  { value: "+15 anos", label: "de experiência no mercado" },
  { value: "CFP® + OAB", label: "Finanças e Direito Empresarial" },
  { value: "CFO sob demanda", label: "Estratégia sem custo fixo" },
];

export function Hero() {
  const { openModal } = useModal();
  const [, navigate] = useLocation();

  return (
    <>
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">

        <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full pt-24 pb-8">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1B4158]/12 text-[#1B4158]/45 text-xs font-medium mb-8 animate-fade-in tracking-widest uppercase">
            CFO as a Service · Inteligência Financeira para PMEs
          </div>

          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#1B4158] leading-[1.08] mb-6 animate-fade-in max-w-4xl"
          >
            Clareza financeira<br />
            para decisões<br />
            mais inteligentes.
          </h1>

          <p className="text-base lg:text-xl text-[#1B4158]/55 leading-relaxed mb-8 max-w-2xl animate-fade-in">
            Estruturamos a gestão financeira da sua empresa com DRE gerencial, fluxo de caixa projetado e acompanhamento executivo contínuo — para você decidir com dados, não com intuição.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 mb-10 animate-fade-in">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-[#1B4158]/55 justify-center sm:justify-start">
                <span className="text-[#1B4158]/38 flex-shrink-0">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5 animate-fade-in">
            <button
              onClick={() => openModal()}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-semibold"
            >
              Agendar diagnóstico financeiro →
            </button>
            <button
              onClick={() => { navigate("/metodologia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-sm text-[#1B4158]/45 hover:text-[#1B4158]/72 transition-colors px-4 py-3.5"
            >
              Ver nossa metodologia
            </button>
          </div>

          <p className="text-xs text-[#1B4158]/27 animate-fade-in">
            Sem compromisso · Diagnóstico gratuito · Retorno em até 24h
          </p>
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full pb-10">
          <div className="flex items-center justify-center gap-8 sm:gap-16 pt-7 border-t border-[#1B4158]/8 flex-wrap">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg sm:text-xl font-bold text-[#1B4158]">{s.value}</div>
                <div className="text-xs text-[#1B4158]/32 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
