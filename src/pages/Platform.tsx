import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { useLocation } from "wouter";
import {
  LogIn, Upload, Bot, LayoutDashboard, FileText, ShieldCheck,
  Check, ArrowRight, Clock, Zap
} from "lucide-react";

const features = [
  {
    icon: <LogIn size={20} className="text-[#3b82f6]" />,
    title: "Acesso Personalizado",
    description: "Login seguro por empresa, com controle de usuários e níveis de acesso configuráveis.",
    color: "#3b82f6",
  },
  {
    icon: <Upload size={20} className="text-[#10b981]" />,
    title: "Upload de Documentos",
    description: "Envio organizado de extratos, borderôs, DRE, balanços e outros documentos financeiros.",
    color: "#10b981",
  },
  {
    icon: <Bot size={20} className="text-[#0d9488]" />,
    title: "Agente Interno",
    description: "Leitura, classificação e estruturação automática dos dados enviados pelo cliente.",
    color: "#0d9488",
  },
  {
    icon: <LayoutDashboard size={20} className="text-[#0ea5e9]" />,
    title: "KPIs e Dashboards",
    description: "Indicadores financeiros gerenciais, gráficos de evolução e painéis analíticos interativos.",
    color: "#0ea5e9",
  },
  {
    icon: <FileText size={20} className="text-[#f0c040]" />,
    title: "Relatórios Executivos",
    description: "Relatórios mensais em PDF com análise de resultado, variâncias e alertas automáticos.",
    color: "#f0c040",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#d97706]" />,
    title: "Alertas Inteligentes",
    description: "Notificações automáticas sobre concentração de clientes, queda de margem e risco de caixa.",
    color: "#d97706",
  },
];

const plans = [
  {
    name: "Essencial",
    price: "Sob consulta",
    description: "Para empresas que precisam de visibilidade financeira básica e organização dos dados.",
    features: [
      "Dashboard financeiro mensal",
      "Relatório executivo simplificado",
      "KPIs principais",
      "1 reunião de análise/mês",
      "Upload de até 5 tipos de documento",
    ],
    color: "#3b82f6",
    highlighted: false,
  },
  {
    name: "Gerencial",
    price: "Sob consulta",
    description: "Para empresas que precisam de controle financeiro completo e suporte estratégico contínuo.",
    features: [
      "Dashboard completo com histórico",
      "Relatórios executivos avançados",
      "KPIs + alertas automáticos",
      "Reuniões quinzenais de análise",
      "Upload ilimitado de documentos",
      "Fluxo de caixa projetado",
      "Análise por centro de custo",
    ],
    color: "#f0c040",
    highlighted: true,
  },
  {
    name: "Estratégico",
    price: "Sob consulta",
    description: "Para grupos, holdings e empresas em processo de captação, M&A ou crescimento acelerado.",
    features: [
      "Tudo do plano Gerencial",
      "Consolidação de múltiplos CNPJs",
      "Modelagem financeira",
      "Suporte para captação e M&A",
      "CFO virtual dedicado",
      "Acesso prioritário à equipe DT Finance",
    ],
    color: "#0d9488",
    highlighted: false,
  },
];

const statusItems = [
  { label: "Extratos bancários", status: "Processado", color: "#10b981" },
  { label: "Borderôs e recebimentos", status: "Processado", color: "#10b981" },
  { label: "Contas a pagar", status: "Em análise", color: "#f0c040" },
  { label: "DRE Gerencial", status: "Aguardando", color: "#6b7280" },
];

export default function Platform() {
  const [, navigateTo] = useLocation();

  return (
    <div className="min-h-screen bg-[#2a2a2e]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(30,64,175,0.15) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-[#60a5fa] text-xs font-medium mb-6">
              A PLATAFORMA DT FINANCE
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              O portal onde dados
              <br />
              <span className="gradient-text">viram decisões</span>
            </h1>
            <p className="text-lg text-white/55 mb-10 leading-relaxed">
              Uma plataforma completa onde o cliente envia documentos financeiros, o agente interno organiza e estrutura os dados, e a DT Finance entrega análise estratégica de alto nível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigateTo("/dashboard")} className="btn-gold px-8 py-4 rounded-xl text-base font-semibold">
                Ver Demo da Plataforma →
              </button>
              <button onClick={() => { navigateTo("/"); setTimeout(() => document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" }), 400); }} className="btn-outline-blue px-8 py-4 rounded-xl text-base">
                Solicitar Acesso
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mockup visual */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: "#07101f" }}>
              {/* App bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8" style={{ background: "#050d1a" }}>
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="ml-4 flex-1 flex items-center gap-3">
                  <div className="h-5 w-48 rounded bg-white/6 flex items-center px-2">
                    <span className="text-[10px] text-white/30">app.dtfinance.com.br/dashboard</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-20 rounded-md bg-[#1e40af]/40 flex items-center justify-center">
                    <span className="text-[10px] text-[#60a5fa]">Empresa ABC</span>
                  </div>
                </div>
              </div>

              <div className="flex h-[460px]">
                {/* Sidebar */}
                <div className="w-52 border-r border-white/8 p-4 flex flex-col gap-1 flex-shrink-0" style={{ background: "#050d1a" }}>
                  {["Visão Geral", "Upload de Docs", "Processamento", "KPIs", "Dashboards", "Relatórios", "Alertas", "Configurações"].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-xs transition-all ${i === 0 ? "bg-[#1e40af]/30 text-[#60a5fa]" : "text-white/40 hover:text-white/70 hover:bg-white/4"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-[#3b82f6]" : "bg-white/20"}`} />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Visão Geral — Março 2025</h3>
                      <p className="text-xs text-white/35 mt-0.5">Empresa ABC Ltda · CNPJ 00.000.000/0001-00</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-dot" />
                      <span className="text-xs text-white/35">Atualizado há 2h</span>
                    </div>
                  </div>

                  {/* KPI grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { l: "Receita Bruta", v: "R$ 2,84M", c: "+12,4%", pos: true },
                      { l: "Margem EBITDA", v: "31,4%", c: "+2,1pp", pos: true },
                      { l: "Caixa", v: "R$ 1,12M", c: "-5,2%", pos: false },
                      { l: "Inadimplência", v: "3,2%", c: "-0,8pp", pos: true },
                    ].map((k, i) => (
                      <div key={i} className="rounded-xl p-3 border border-white/6" style={{ background: "#343438" }}>
                        <div className="text-[9px] text-white/40 mb-1.5">{k.l}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-bold text-white">{k.v}</div>
                        <div className={`text-[9px] mt-1 ${k.pos ? "text-[#10b981]" : "text-[#d97706]"}`}>{k.c}</div>
                      </div>
                    ))}
                  </div>

                  {/* Status list */}
                  <div className="rounded-xl border border-white/6 p-4" style={{ background: "#343438" }}>
                    <div className="text-xs font-medium text-white/70 mb-3">Status de Processamento — Mar/25</div>
                    <div className="space-y-2">
                      {statusItems.map((s, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-xs text-white/50">{s.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${s.color}18`, color: s.color }}>{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tudo que sua empresa precisa
              <br />
              <span className="gradient-text">em um só lugar</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div
                  className="p-6 rounded-2xl border border-white/7 bg-[#343438] h-full group"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${f.color}35`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15` }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Flow steps */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0d9488]/30 bg-[#0d9488]/10 text-[#0d9488] text-xs font-medium mb-4">
              O AGENTE INTERNO
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tecnologia que trabalha
              <br />
              <span className="gradient-text">enquanto você decide</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Nosso agente interno executa o trabalho pesado de leitura, classificação e estruturação dos dados. A DT Finance entra com a inteligência analítica e estratégica.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock size={24} className="text-[#3b82f6]" />, title: "Processamento Contínuo", desc: "Os documentos enviados são processados automaticamente, sem necessidade de intervenção manual da sua equipe.", color: "#3b82f6" },
              { icon: <Zap size={24} className="text-[#f0c040]" />, title: "Dados Estruturados", desc: "Informações brutas são convertidas em categorias, centros de custo e indicadores financeiros padronizados.", color: "#f0c040" },
              { icon: <Bot size={24} className="text-[#0d9488]" />, title: "Base para Análise", desc: "Com os dados organizados, a DT Finance realiza a análise estratégica que orienta as decisões do seu negócio.", color: "#0d9488" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl border border-white/7 bg-[#343438]">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${item.color}15` }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Planos que crescem
              <br />
              <span className="gradient-text">com a sua empresa</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">Cada empresa tem uma necessidade diferente. Nossos planos são desenhados para atender desde PMEs até grupos empresariais complexos.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className={`relative flex flex-col p-7 rounded-2xl border h-full ${plan.highlighted ? "border-[#f0c040]/40" : "border-white/7"}`}
                  style={{ background: plan.highlighted ? "linear-gradient(135deg, #070f20, #08122a)" : "#343438" }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#f0c040] text-[#2a2a2e] text-xs font-bold whitespace-nowrap">
                      Mais popular
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-white/45 mb-3">{plan.description}</p>
                    <div className="text-sm font-medium" style={{ color: plan.color }}>{plan.price}</div>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-white/65">
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { navigateTo("/"); setTimeout(() => document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" }), 400); }}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${plan.highlighted ? "btn-gold" : "border border-white/15 text-white/70 hover:bg-white/5"}`}
                  >
                    Solicitar Proposta <ArrowRight size={14} />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pronto para ver a plataforma <span className="gradient-text">funcionando?</span>
            </h2>
            <p className="text-white/50 mb-8">Acesse a demo visual e explore todas as funcionalidades sem precisar de login.</p>
            <button onClick={() => navigateTo("/dashboard")} className="btn-gold px-10 py-4 rounded-xl text-base font-semibold">
              Acessar Demo da Plataforma →
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
