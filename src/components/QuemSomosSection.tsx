const numbers = [
  { value: "+15", label: "anos de experiência" },
  { value: "100+", label: "empresas estruturadas" },
  { value: "R$ 2M–50M", label: "faturamento dos clientes" },
];

export function QuemSomosSection() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#F7F4EE" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Coluna esquerda — Números */}
          <div className="order-2 lg:order-1">
            <div
              className="rounded-2xl p-10 lg:p-12"
              style={{ backgroundColor: "#0D1F3C" }}
            >
              {numbers.map((n, i) => (
                <div
                  key={i}
                  className={`${i < numbers.length - 1 ? "border-b pb-8 mb-8" : ""}`}
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    style={{ fontFamily: "'Playfair Display', serif", color: "#C9A84C" }}
                    className="text-4xl font-bold mb-1"
                  >
                    {n.value}
                  </div>
                  <div className="text-sm" style={{ color: "#C7D2E2" }}>
                    {n.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita — Texto */}
          <div className="order-1 lg:order-2">
            <span className="eyebrow block mb-5">Quem Somos</span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
              className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] mb-6"
            >
              Muito além da consultoria financeira.
            </h2>

            <div className="space-y-5" style={{ color: "#1A2230" }}>
              <p className="text-base leading-relaxed">
                A DT Finance nasceu para ajudar empresas a se estruturarem através de gestão, processos, indicadores e inteligência financeira.
              </p>
              <p className="text-base leading-relaxed">
                Após mais de 15 anos de experiência no mercado financeiro e empresarial, desenvolvemos uma metodologia própria para transformar empresas em organizações mais eficientes, previsíveis e preparadas para crescer.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#5B6470" }}>
                Atuamos junto às lideranças, entendendo a fundo o negócio e entregando não apenas diagnósticos — mas transformação real e mensurável.
              </p>
            </div>

            {/* Linha dourada decorativa */}
            <div className="mt-10 flex items-center gap-4">
              <span className="gold-line" />
              <span className="text-sm font-medium" style={{ color: "#5B6470" }}>
                DT Finance — Estruturação Empresarial &amp; Inteligência Financeira
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
