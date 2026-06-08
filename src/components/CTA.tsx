import { FadeIn } from "./FadeIn";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const checks = [
  "Diagnóstico financeiro sem custo",
  "Análise da situação atual da empresa",
  "Identificação dos principais gargalos",
  "Proposta apenas se fizer sentido",
  "Confidencialidade total garantida",
];

const steps = [
  { num: "01", label: "Você preenche o formulário" },
  { num: "02", label: "Agendamos uma conversa rápida" },
  { num: "03", label: "Entregamos o diagnóstico" },
];

export function CTA() {
  const { openModal } = useModal();

  return (
    <>
      <section id="cta" className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-[#1B4158]/10 bg-[#f5f7f9]">
              <div className="flex flex-col lg:flex-row">

                {/* LEFT */}
                <div className="flex-1 p-10 sm:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#1B4158]/8">
                  <p className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-8">
                    Diagnóstico Gratuito · Sem Compromisso
                  </p>

                  <h2
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4158] mb-5 leading-tight"
                  >
                    Entenda a situação
                    <br />
                    financeira real
                    <br />
                    <span className="gradient-text">da sua empresa.</span>
                  </h2>

                  <p className="text-[#1B4158]/72 text-base lg:text-lg mb-8 max-w-md leading-relaxed">
                    Uma conversa direta com um especialista: analisamos sua realidade atual e mostramos com clareza o que é possível melhorar — e como.
                  </p>

                  <button
                    className="btn-gold px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2"
                    onClick={() => openModal()}
                  >
                    Agendar diagnóstico financeiro
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex items-center gap-2 mt-4">
                    <Clock size={12} className="text-[#1B4158]/27" />
                    <span className="text-xs text-[#1B4158]/32">Retorno em até 24h em horário comercial</span>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-5 flex-wrap">
                    {steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold border border-[#1B4158]/12 text-[#1B4158]/72">
                          {step.num}
                        </div>
                        <span className="text-xs text-[#1B4158]/68">{step.label}</span>
                        {i < steps.length - 1 && (
                          <ArrowRight size={12} className="text-white/15 hidden sm:block flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="lg:w-80 xl:w-96 p-10 sm:p-12 lg:p-14 flex flex-col justify-center border-t border-[#1B4158]/8 lg:border-t-0">

                  <div className="mb-8">
                    <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-5">
                      O que acontece na conversa
                    </div>
                    <div className="space-y-3">
                      {checks.map((tag) => (
                        <div key={tag} className="flex items-center gap-3 text-sm text-[#1B4158]/75">
                          <CheckCircle2 size={14} className="text-[#1B4158]/32 flex-shrink-0" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#1B4158]/8 my-6" />

                  <div>
                    <p
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-[#1B4158]/78 text-sm leading-relaxed italic mb-3"
                    >
                      "Unimos direito, tecnologia e finanças para entregar algo que o mercado ainda não tinha: um CFO completo, acessível e orientado a dados."
                    </p>
                    <span className="text-xs text-[#B5891A]/60 font-medium">— Fundadores da DT Finance</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {["CFP® — Certified Financial Planner", "OAB", "+15 anos de mercado"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg border border-[#1B4158]/10 text-[#1B4158]/38"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-[11px] text-white/18 leading-relaxed">
                    Seus dados não são compartilhados com terceiros. Apenas a equipe da DT Finance terá acesso às informações fornecidas.
                  </p>
                </div>

              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
