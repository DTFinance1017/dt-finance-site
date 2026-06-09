import { useModal } from "@/context/ModalContext";
import { Check } from "lucide-react";

const competencias = [
  {
    title: "Gestão",
    description: "Estruturação de processos, governança e rotinas de gestão que geram previsibilidade.",
  },
  {
    title: "Operações",
    description: "Mapeamento e melhoria operacional com foco em eficiência, escala e eliminação de retrabalho.",
  },
  {
    title: "Tecnologia",
    description: "Uso estratégico de ferramentas e dados para apoiar decisões e automatizar controles.",
  },
  {
    title: "Inteligência Financeira",
    description: "Controle financeiro, DRE gerencial, fluxo de caixa e indicadores de performance.",
  },
];

export function DiferencialSection() {
  const { openModal } = useModal();

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#0D1F3C" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Coluna esquerda — Texto */}
          <div>
            <span className="eyebrow block mb-5">Por que a DT Finance?</span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
              className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-6"
            >
              Por que a DT Finance?
            </h2>

            <p className="text-base leading-relaxed mb-6" style={{ color: "#C7D2E2" }}>
              Unimos competências raramente encontradas em uma única empresa:
            </p>

            <div className="space-y-5 mb-10">
              {competencias.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                  >
                    <Check size={12} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {c.title}
                      {" "}
                    </span>
                    <span className="text-sm" style={{ color: "#C7D2E2" }}>
                      — {c.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => openModal()}
              className="btn-primary px-7 py-3.5 rounded-lg text-sm font-semibold"
            >
              Quero Conhecer a DT Finance
            </button>
          </div>

          {/* Coluna direita — Bloco de destaque */}
          <div>
            <div
              className="rounded-2xl p-10 lg:p-12 border"
              style={{
                backgroundColor: "#13294F",
                borderColor: "rgba(201,168,76,0.15)",
              }}
            >
              {/* Linha dourada */}
              <span className="gold-line block mb-8" />

              <p
                style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}
                className="text-2xl sm:text-3xl font-bold leading-[1.3] mb-6"
              >
                Não entregamos apenas relatórios.
              </p>
              <p
                style={{ fontFamily: "'Playfair Display', serif", color: "#C9A84C" }}
                className="text-2xl sm:text-3xl font-bold leading-[1.3]"
              >
                Entregamos transformação empresarial.
              </p>

              <div
                className="mt-10 pt-8 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#C7D2E2" }}>
                  Cada projeto é conduzido com presença executiva, responsabilidade pelos resultados e comprometimento com o crescimento real da sua empresa.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
