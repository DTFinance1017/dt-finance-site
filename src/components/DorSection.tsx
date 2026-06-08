import { FadeIn } from "./FadeIn";
import { AlertTriangle, HelpCircle, Shuffle, FileSpreadsheet, Gauge, TrendingDown } from "lucide-react";

const dores = [
  {
    icon: <HelpCircle size={18} />,
    title: "Faturamento cresce. Lucro, não.",
    description: "O caixa não reflete o que entra. Você sabe quanto fatura, mas não entende para onde vai o dinheiro — e isso é um risco que cresce todo mês.",
  },
  {
    icon: <Gauge size={18} />,
    title: "Sem previsibilidade de caixa",
    description: "Cada mês é uma incógnita. Planejar contratações, investimentos ou expansão fica inviável sem saber o que o próximo trimestre vai exigir.",
  },
  {
    icon: <Shuffle size={18} />,
    title: "Pessoa física misturada com jurídica",
    description: "Gastos pessoais e empresariais no mesmo extrato. Isso distorce a margem real e impede qualquer análise confiável do negócio.",
  },
  {
    icon: <FileSpreadsheet size={18} />,
    title: "Planilhas que ninguém entende",
    description: "Dados em arquivos dispersos, atualização manual e sem padrão. Quanto mais a empresa cresce, mais o controle fica para trás.",
  },
  {
    icon: <TrendingDown size={18} />,
    title: "Decisões baseadas em sensação",
    description: "\"Acho que está indo bem.\" Sem dados estruturados, as decisões são baseadas em intuição — e o risco cresce junto com a empresa.",
  },
  {
    icon: <AlertTriangle size={18} />,
    title: "Crescimento sem estrutura financeira",
    description: "A empresa cresce, a complexidade aumenta e o controle não acompanha. Escalar sem estrutura pode custar mais caro do que parece.",
  },
];

export function DorSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">

        <div className="flex flex-col md:flex-row md:items-end md:gap-16 mb-12 md:mb-14">
          <FadeIn className="md:w-1/2 mb-8 md:mb-0">
            <p className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-5">Você se identifica?</p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B4158] leading-tight"
            >
              A maioria das PMEs opera
              <br />
              <span className="gradient-text">no escuro financeiro</span>
            </h2>
          </FadeIn>

          <FadeIn delay={80} className="md:w-1/2">
            <p className="text-[#1B4158]/72 text-base lg:text-lg leading-relaxed mb-4">
              Não por falta de esforço — por falta de estrutura. E isso tem consequências reais no crescimento e na rentabilidade do negócio.
            </p>
            <div className="p-5 rounded-xl border border-[#1B4158]/8 bg-[#f5f7f9]">
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-base text-[#1B4158]/90 font-semibold mb-1">
                O resultado?
              </p>
              <p className="text-[#1B4158]/72 text-sm leading-relaxed">
                Margem sendo consumida sem que ninguém perceba. Risco de caixa que aparece de surpresa. Decisões que custam o que poderiam render.{" "}
                <span className="text-[#1B4158]/78 font-medium">Isso tem solução.</span>
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dores.map((d, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="card-lift p-5 lg:p-6 rounded-xl border border-[#1B4158]/8 bg-[#f5f7f9] h-full">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 bg-[#1B4158]/5 text-[#1B4158]/72">
                  {d.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#1B4158] mb-2 leading-snug">{d.title}</h3>
                <p className="text-sm text-[#1B4158]/68 leading-relaxed">{d.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
