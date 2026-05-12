const kpiGroups = [
  {
    title: "Resultado",
    color: "#3b82f6",
    items: [
      { label: "Receita Bruta", value: "R$ 2.840.000", prev: "R$ 2.527.000", change: "+12,4%", pos: true },
      { label: "Custos Totais", value: "R$ 1.945.000", prev: "R$ 1.780.000", change: "+9,3%", pos: false },
      { label: "Lucro Bruto", value: "R$ 895.000", prev: "R$ 747.000", change: "+19,8%", pos: true },
      { label: "Lucro Líquido", value: "R$ 412.000", prev: "R$ 380.000", change: "+8,4%", pos: true },
    ],
  },
  {
    title: "Margens",
    color: "#10b981",
    items: [
      { label: "Margem Bruta", value: "31,5%", prev: "29,6%", change: "+1,9pp", pos: true },
      { label: "Margem EBITDA", value: "31,4%", prev: "29,3%", change: "+2,1pp", pos: true },
      { label: "Margem Líquida", value: "14,5%", prev: "15,0%", change: "-0,5pp", pos: false },
      { label: "ROE", value: "18,2%", prev: "17,1%", change: "+1,1pp", pos: true },
    ],
  },
  {
    title: "Caixa e Liquidez",
    color: "#f0c040",
    items: [
      { label: "Caixa Disponível", value: "R$ 1.120.000", prev: "R$ 1.181.000", change: "-5,2%", pos: false },
      { label: "Liquidez Corrente", value: "1,84", prev: "1,96", change: "-0,12", pos: false },
      { label: "Liquidez Imediata", value: "0,62", prev: "0,71", change: "-0,09", pos: false },
      { label: "Ciclo Financeiro", value: "38 dias", prev: "41 dias", change: "-3 dias", pos: true },
    ],
  },
  {
    title: "Endividamento",
    color: "#d97706",
    items: [
      { label: "Endividamento Total", value: "38,2%", prev: "35,1%", change: "+3,1pp", pos: false },
      { label: "Dívida Líquida", value: "R$ 920K", prev: "R$ 800K", change: "+15,0%", pos: false },
      { label: "Dívida/EBITDA", value: "1,2x", prev: "1,0x", change: "+0,2x", pos: false },
      { label: "Cobertura de Juros", value: "4,8x", prev: "5,2x", change: "-0,4x", pos: false },
    ],
  },
  {
    title: "Clientes",
    color: "#0d9488",
    items: [
      { label: "Concentração Top-1", value: "38%", prev: "32%", change: "+6pp", pos: false },
      { label: "Concentração Top-5", value: "74%", prev: "68%", change: "+6pp", pos: false },
      { label: "Inadimplência", value: "3,2%", prev: "4,0%", change: "-0,8pp", pos: true },
      { label: "Ticket Médio", value: "R$ 45.800", prev: "R$ 41.200", change: "+11,2%", pos: true },
    ],
  },
];

export function KPIs() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-sm text-white/40">Competência: Março 2025</div>
        <span className="text-white/20">·</span>
        <div className="text-sm text-white/40">Comparativo: Fevereiro 2025</div>
      </div>

      {kpiGroups.map((group, gi) => (
        <div key={gi} className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/7 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
          </div>
          <div className="divide-y divide-white/5">
            {group.items.map((item, ii) => (
              <div key={ii} className="flex items-center justify-between px-5 py-3 hover:bg-white/2 transition-colors">
                <div className="text-sm text-white/65">{item.label}</div>
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block text-xs text-white/30">{item.prev}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-sm font-semibold text-white min-w-[5rem] text-right">{item.value}</div>
                  <div className={`text-xs font-medium min-w-[4rem] text-right ${item.pos ? "text-[#10b981]" : "text-[#d97706]"}`}>{item.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
