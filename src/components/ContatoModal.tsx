import { useState, useEffect } from "react";
import { X, Mail, CheckCircle2, FileText, ArrowLeft } from "lucide-react";
import type { ModalSource } from "@/context/ModalContext";

interface Props {
  open: boolean;
  onClose: () => void;
  source?: ModalSource;
}

const faturamentoOptions = [
  { label: "Até R$ 1M/ano", value: "Até R$ 1M/ano" },
  { label: "R$ 1M – R$ 5M/ano", value: "R$ 1M – R$ 5M/ano" },
  { label: "Acima de R$ 5M/ano", value: "Acima de R$ 5M/ano" },
];

const dorOptions = [
  { label: "💸 Não sei pra onde vai o dinheiro", value: "Não sei pra onde vai o dinheiro" },
  { label: "📊 Preciso de dados pra decidir", value: "Preciso de dados pra decidir" },
  { label: "🚀 Quero crescer com controle", value: "Quero crescer com controle" },
];

const inputClass =
  "w-full bg-[#1B4158]/5 border border-[#1B4158]/15 rounded-[10px] px-4 py-3 text-sm text-[#1B4158] placeholder-[#1B4158]/30 focus:outline-none focus:border-[#B5891A]/40 focus:bg-[#1B4158]/8 transition-colors";

const labelClass =
  "block text-[11px] text-[#1B4158]/55 mb-1.5 font-medium uppercase tracking-[0.1em]";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function ProgressDots({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-7">
      {[1, 2].map((s) => (
        <div
          key={s}
          className="rounded-full transition-all duration-300"
          style={{
            width: s === step ? 24 : 8,
            height: 8,
            background: s === step ? "#B5891A" : "rgba(27,65,88,0.18)",
          }}
        />
      ))}
    </div>
  );
}

export function ContatoModal({ open, onClose, source = "diagnostico" }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [faturamento, setFaturamento] = useState("");
  const [dor, setDor] = useState("");
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "", empresa: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(false);

  const isChecklist = source === "checklist";

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    setErro(false);
    setEnviando(true);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, faturamento, dor, source }),
      });
      if (res.ok) {
        setEnviado(true);
        if (!isChecklist) {
          setTimeout(() => handleClose(), 3000);
        }
      } else {
        setErro(true);
      }
    } catch {
      setErro(true);
    } finally {
      setEnviando(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFaturamento("");
      setDor("");
      setForm({ nome: "", whatsapp: "", email: "", empresa: "" });
      setEnviado(false);
      setErro(false);
    }, 300);
  };

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setFaturamento("");
    setDor("");
    setForm({ nome: "", whatsapp: "", email: "", empresa: "" });
    setEnviado(false);
    setErro(false);
  }, [open]);

  if (!open) return null;

  const step1Valid = faturamento !== "" && dor !== "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(27,65,88,0.45)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full flex flex-col"
        style={{
          maxWidth: 460,
          background: "#f5f7f9",
          borderRadius: 20,
          border: "1px solid rgba(27,65,88,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          animation: "modal-in 350ms cubic-bezier(0.16,1,0.3,1) both",
          maxHeight: "92vh",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes modal-in {
            from { opacity: 0; transform: translateY(32px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(27,65,88,0.10)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(27,65,88,0.18)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(27,65,88,0.10)")}
        >
          <X size={15} style={{ color: "rgba(27,65,88,0.70)" }} />
        </button>

        {/* ── SUCCESS ── */}
        {enviado && (
          <div className="flex flex-col items-center justify-center py-16 px-10 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(181,137,26,0.12)", border: "1px solid rgba(181,137,26,0.3)" }}
            >
              <CheckCircle2 size={28} style={{ color: "#B5891A" }} />
            </div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-bold text-[#1B4158] mb-3"
            >
              {isChecklist ? "Lista enviada!" : "Diagnóstico agendado!"}
            </h3>
            <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: "rgba(27,65,88,0.65)" }}>
              {isChecklist
                ? `Verifique sua caixa de entrada — a lista de documentos foi enviada para ${form.email}.`
                : "Nossa equipe entrará em contato em até 24h pelo WhatsApp informado."}
            </p>
            {!isChecklist && (
              <p className="text-xs mb-6" style={{ color: "rgba(27,65,88,0.30)" }}>
                Fechando automaticamente…
              </p>
            )}
            <button onClick={handleClose} className="btn-gold px-8 py-3 rounded-xl text-sm font-semibold">
              Fechar
            </button>
          </div>
        )}

        {/* ── CHECKLIST (single step) ── */}
        {!enviado && isChecklist && (
          <form onSubmit={handleEnviar} className="flex flex-col overflow-hidden">
            <div className="px-8 pt-8 pb-5 flex-shrink-0" style={{ borderBottom: "1px solid rgba(27,65,88,0.10)" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4" style={{ borderColor: "rgba(181,137,26,0.25)", background: "rgba(181,137,26,0.08)", color: "#B5891A" }}>
                <FileText size={11} /> RECEBER LISTA DE DOCUMENTOS
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#1B4158] mb-1">
                Receba a lista no seu e-mail.
              </h2>
              <p className="text-sm" style={{ color: "rgba(27,65,88,0.50)" }}>
                Preencha abaixo e enviaremos a lista direto para você.
              </p>
            </div>
            <div className="overflow-y-auto px-8 py-6 space-y-4 flex-1">
              <div>
                <label className={labelClass}>Nome completo *</label>
                <input required className={inputClass} placeholder="Seu nome" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Seu melhor e-mail *</label>
                <input required type="email" className={inputClass} placeholder="nome@empresa.com.br" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp (com DDD) *</label>
                <input required className={inputClass} placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => set("whatsapp", formatPhone(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Nome da empresa *</label>
                <input required className={inputClass} placeholder="Razão social ou nome fantasia" value={form.empresa} onChange={(e) => set("empresa", e.target.value)} />
              </div>
              {erro && <p className="text-red-400 text-xs text-center">Erro ao enviar. Tente novamente.</p>}
            </div>
            <div className="px-8 pb-8 pt-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(27,65,88,0.10)" }}>
              <button type="submit" disabled={enviando} className="w-full btn-gold py-[14px] rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50">
                <Mail size={15} />
                {enviando ? "ENVIANDO..." : "ENVIAR LISTA PARA MEU E-MAIL"}
              </button>
              <p className="mt-3 text-center text-xs" style={{ color: "rgba(27,65,88,0.25)" }}>Sem compromisso</p>
            </div>
          </form>
        )}

        {/* ── DIAGNÓSTICO — STEP 1 ── */}
        {!enviado && !isChecklist && step === 1 && (
          <div className="flex flex-col px-8 pt-8 pb-8">
            <ProgressDots step={1} />
            <div className="mb-6">
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl sm:text-2xl font-bold text-[#1B4158] mb-2">
                Antes de começar, me conta um pouco sobre sua empresa.
              </h2>
              <p className="text-sm" style={{ color: "rgba(27,65,88,0.60)" }}>
                Isso nos ajuda a preparar um diagnóstico mais preciso pra você.
              </p>
            </div>

            {/* Faturamento */}
            <div className="mb-5">
              <label className={labelClass}>Faturamento anual</label>
              <div className="grid grid-cols-1 gap-2">
                {faturamentoOptions.map((opt) => {
                  const selected = faturamento === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFaturamento(opt.value)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                      style={{
                        border: selected ? "1px solid #B5891A" : "1px solid rgba(27,65,88,0.15)",
                        background: selected ? "rgba(181,137,26,0.10)" : "rgba(27,65,88,0.05)",
                        color: selected ? "#B5891A" : "rgba(27,65,88,0.80)",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dor */}
            <div className="mb-7">
              <label className={labelClass}>Principal dor</label>
              <div className="grid grid-cols-1 gap-2">
                {dorOptions.map((opt) => {
                  const selected = dor === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDor(opt.value)}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                      style={{
                        border: selected ? "1px solid #B5891A" : "1px solid rgba(27,65,88,0.15)",
                        background: selected ? "rgba(181,137,26,0.10)" : "rgba(27,65,88,0.05)",
                        color: selected ? "#B5891A" : "rgba(27,65,88,0.80)",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="w-full py-[14px] rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
              style={{
                background: step1Valid ? "#B5891A" : "rgba(181,137,26,0.25)",
                color: step1Valid ? "#1a1a1a" : "rgba(255,255,255,0.3)",
                cursor: step1Valid ? "pointer" : "not-allowed",
              }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* ── DIAGNÓSTICO — STEP 2 ── */}
        {!enviado && !isChecklist && step === 2 && (
          <form onSubmit={handleEnviar} className="flex flex-col overflow-hidden">
            <div className="px-8 pt-8 pb-5 flex-shrink-0">
              <ProgressDots step={2} />
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm mb-5 transition-colors"
                style={{ color: "rgba(27,65,88,0.50)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(27,65,88,0.80)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <ArrowLeft size={14} /> Voltar
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-4" style={{ borderColor: "rgba(181,137,26,0.25)", background: "rgba(181,137,26,0.08)", color: "#B5891A" }}>
                DIAGNÓSTICO GRATUITO
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-[#1B4158] mb-1">
                Fale com um especialista.
              </h2>
              <p className="text-sm" style={{ color: "rgba(27,65,88,0.50)" }}>
                Preencha os dados abaixo para agendar seu diagnóstico.
              </p>
            </div>

            <div className="overflow-y-auto px-8 py-5 space-y-4 flex-1">
              <div>
                <label className={labelClass}>Nome completo *</label>
                <input required className={inputClass} placeholder="Seu nome" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp (com DDD) *</label>
                <input required className={inputClass} placeholder="(11) 99999-9999" value={form.whatsapp} onChange={(e) => set("whatsapp", formatPhone(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Seu melhor e-mail *</label>
                <input required type="email" className={inputClass} placeholder="nome@empresa.com.br" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Nome da empresa *</label>
                <input required className={inputClass} placeholder="Razão social ou nome fantasia" value={form.empresa} onChange={(e) => set("empresa", e.target.value)} />
              </div>
              {erro && <p className="text-red-400 text-xs text-center">Erro ao enviar. Tente novamente.</p>}
            </div>

            <div className="px-8 pb-8 pt-4 flex-shrink-0">
              <button
                type="submit"
                disabled={enviando}
                className="w-full py-[14px] rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                style={{ background: "#B5891A", color: "#1a1a1a", height: 52 }}
              >
                <Mail size={15} />
                {enviando ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
              </button>
              <p className="mt-3 text-center text-xs" style={{ color: "rgba(27,65,88,0.30)" }}>Sem compromisso</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
