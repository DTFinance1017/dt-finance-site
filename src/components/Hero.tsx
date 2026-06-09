import { useModal } from "@/context/ModalContext";
import { useLocation } from "wouter";
import { TrendingUp, TrendingDown, ArrowUpRight, Users, Target, BarChart3 } from "lucide-react";

const stats = [
  { value: "+15 anos",       label: "de experiência no mercado" },
  { value: "R$ 2M – 50M",   label: "faturamento dos clientes" },
  { value: "Método DT 5D™", label: "metodologia proprietária" },
];

/* ─── Mock Dashboard Visual ─────────────────────────────────────── */
function DashboardVisual() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ backgroundColor: "#13294F", border: "1px solid rgba(201,168,76,0.15)" }}
    >
      {/* Barra superior do dashboard */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0D1F3C" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#C9A84C" }} />
          <span className="text-xs font-medium" style={{ color: "rgba(199,210,226,0.7)" }}>
            DT Finance · Painel Executivo
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#1F7A4D" }} />
          <span className="text-[10px]" style={{ color: "rgba(199,210,226,0.4)" }}>Ao vivo</span>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Receita Líquida", value: "R$ 4,2M", trend: "+18%", up: true },
            { label: "Margem EBITDA",   value: "23,4%",   trend: "+3,1pp", up: true },
            { label: "Giro de Caixa",   value: "42 dias",  trend: "-8 dias", up: true },
          ].map((kpi, i) => (
            <div
              key={i}
              className="rounded-xl p-3"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[9px] mb-1.5 uppercase tracking-wider" style={{ color: "rgba(199,210,226,0.4)" }}>
                {kpi.label}
              </p>
              <p className="text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}>
                {kpi.value}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.up
                  ? <TrendingUp size={9} style={{ color: "#1F7A4D" }} />
                  : <TrendingDown size={9} style={{ color: "#C9A84C" }} />
                }
                <span className="text-[9px] font-medium" style={{ color: "#1F7A4D" }}>{kpi.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico de barras simulado */}
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={12} style={{ color: "#C9A84C" }} />
              <span className="text-[10px] font-medium" style={{ color: "rgba(199,210,226,0.6)" }}>
                Faturamento vs. Meta — 2025
              </span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(31,122,77,0.15)", color: "#1F7A4D" }}>
              +12% acima da meta
            </span>
          </div>
          {/* Barras */}
          <div className="flex items-end gap-1.5 h-14">
            {[45, 60, 52, 78, 65, 88, 72, 95, 82, 100, 91, 108].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5 items-center">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 11 ? "#C9A84C" : "rgba(201,168,76,0.25)",
                    transition: "height 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m) => (
              <span key={m} className="text-[7px]" style={{ color: "rgba(199,210,226,0.25)" }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Linha inferior — alertas e indicadores */}
        <div className="grid grid-cols-2 gap-3">
          {/* Indicadores */}
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Target size={10} style={{ color: "#C9A84C" }} />
              <span className="text-[9px] font-medium" style={{ color: "rgba(199,210,226,0.5)" }}>
                KPIs Estratégicos
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Rentabilidade", pct: 82 },
                { label: "Liquidez",      pct: 91 },
                { label: "Eficiência",    pct: 74 },
              ].map((kpi) => (
                <div key={kpi.label}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[8px]" style={{ color: "rgba(199,210,226,0.4)" }}>{kpi.label}</span>
                    <span className="text-[8px] font-medium" style={{ color: "#C9A84C" }}>{kpi.pct}%</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-1 rounded-full"
                      style={{ width: `${kpi.pct}%`, backgroundColor: "#C9A84C" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reunião / Pessoas */}
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Users size={10} style={{ color: "#C9A84C" }} />
              <span className="text-[9px] font-medium" style={{ color: "rgba(199,210,226,0.5)" }}>
                Próxima Reunião
              </span>
            </div>
            <div
              className="rounded-lg p-2.5"
              style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <p className="text-[9px] font-semibold mb-0.5" style={{ color: "#C9A84C" }}>
                Review Mensal — CFO
              </p>
              <p className="text-[8px]" style={{ color: "rgba(199,210,226,0.5)" }}>Hoje · 15h00</p>
              <div className="flex items-center gap-1 mt-2">
                {[0,1,2].map((a) => (
                  <div key={a} className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[7px] font-bold"
                    style={{ backgroundColor: "#13294F", borderColor: "#0D1F3C", color: "#C9A84C" }}>
                    {["D","G","F"][a]}
                  </div>
                ))}
                <ArrowUpRight size={9} style={{ color: "#C9A84C" }} className="ml-auto" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────── */
export function Hero() {
  const { openModal } = useModal();
  const [, navigate]  = useLocation();

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0D1F3C", minHeight: "100vh" }}
    >
      {/* Gradientes de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 100% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)," +
            "radial-gradient(ellipse 40% 50% at 0% 100%, rgba(201,168,76,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Layout principal */}
      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 w-full pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">

          {/* ── Coluna esquerda: Texto ── */}
          <div className="flex flex-col justify-center">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 w-fit animate-fade-in"
              style={{ borderColor: "rgba(201,168,76,0.35)", color: "#C9A84C" }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
              <span className="text-[10px] font-semibold tracking-[0.16em] uppercase">
                Estruturação Empresarial &amp; Inteligência Financeira
              </span>
            </div>

            {/* Título */}
            <h1
              style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
              className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold leading-[1.1] mb-6 animate-fade-in"
            >
              Estruturamos empresas para crescer com{" "}
              <span style={{ color: "#C9A84C" }}>previsibilidade</span>{" "}
              e geração de valor.
            </h1>

            {/* Subtítulo */}
            <p
              className="text-lg leading-relaxed mb-9 max-w-lg animate-fade-in"
              style={{ color: "#C7D2E2" }}
            >
              Governança, Processos, Performance e Inteligência Financeira para empresas em crescimento.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
              <button
                onClick={() => openModal()}
                className="btn-primary px-7 py-4 rounded-lg text-sm font-semibold"
              >
                Agendar Diagnóstico
              </button>
              <button
                onClick={() => { navigate("/metodologia"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-secondary-dark px-7 py-4 rounded-lg text-sm"
              >
                Conhecer a Metodologia
              </button>
            </div>

            {/* Nota */}
            <p className="mt-5 text-xs animate-fade-in" style={{ color: "rgba(199,210,226,0.35)" }}>
              Sem compromisso · Diagnóstico gratuito · Retorno em até 24h
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t animate-fade-in"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
                    className="text-lg font-bold leading-tight"
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] mt-1 leading-snug" style={{ color: "rgba(199,210,226,0.45)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Coluna direita: Dashboard Visual ── */}
          <div className="flex items-center justify-center lg:justify-end animate-fade-in">
            <div className="w-full max-w-[480px]">
              <DashboardVisual />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
