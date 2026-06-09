import { Factory, ShoppingCart, Truck, GraduationCap, Briefcase, Tractor } from "lucide-react";

const segmentos = [
  { icon: Factory,       label: "Indústria" },
  { icon: ShoppingCart,  label: "Comércio" },
  { icon: Truck,         label: "Distribuição" },
  { icon: GraduationCap, label: "Educação" },
  { icon: Briefcase,     label: "Serviços" },
  { icon: Tractor,       label: "Agronegócio" },
];

export function Segmentos() {
  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: "#F7F4EE" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow block mb-5">Atuação</span>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", color: "#0D1F3C" }}
            className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2]"
          >
            Segmentos atendidos.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {segmentos.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-4 py-8 px-4 rounded-xl border transition-all duration-200 cursor-default"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "rgba(13,31,60,0.08)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(13,31,60,0.08)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(13,31,60,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(13,31,60,0.05)" }}
                >
                  <Icon size={22} style={{ color: "#0D1F3C" }} />
                </div>
                <span
                  className="text-sm font-semibold text-center"
                  style={{ color: "#0D1F3C" }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Nota */}
        <p className="text-center mt-10 text-sm" style={{ color: "#5B6470" }}>
          Atendemos empresas com faturamento entre{" "}
          <strong style={{ color: "#0D1F3C" }}>R$ 2 milhões e R$ 50 milhões</strong>{" "}
          em todo o Brasil.
        </p>

      </div>
    </section>
  );
}
