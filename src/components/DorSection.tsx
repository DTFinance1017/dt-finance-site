const problems = [
  "Falta de indicadores confiáveis",
  "Processos desorganizados e não documentados",
  "Dependência excessiva dos sócios nas decisões",
  "Falta de previsibilidade financeira",
  "Retrabalho entre áreas e times",
  "Dificuldade para escalar com controle",
];

export function DorSection() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Coluna esquerda — Título */}
          <div>
            <span className="eyebrow block mb-5">O Problema</span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
              className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-6"
            >
              Sua empresa está crescendo, mas a gestão acompanha esse crescimento?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#5B6470" }}>
              O crescimento sem estrutura gera complexidade. E complexidade sem gestão gera caos.
            </p>

            {/* Frase de impacto */}
            <div
              className="mt-10 border-l-4 pl-6 py-1"
              style={{ borderColor: "#C9A84C" }}
            >
              <p
                style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
                className="text-lg sm:text-xl font-semibold leading-snug"
              >
                O resultado é perda de eficiência, lucro e controle.
              </p>
            </div>
          </div>

          {/* Coluna direita — Lista de problemas */}
          <div>
            <p className="text-sm font-medium mb-7" style={{ color: "#5B6470" }}>
              Os principais desafios de empresas em crescimento:
            </p>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-1.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                    style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#C9A84C" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base leading-relaxed" style={{ color: "#1A2230" }}>
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
