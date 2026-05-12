import { Zap, Tag, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const SETORES = ["Serviços", "Comércio / Varejo", "Indústria"];

const ITEMS_CLASSIFICADOS = [
  { doc: "NF-e 001234 — Venda de serviços de consultoria", valor: "R$ 45.000", categoria: "Receita Bruta", subcategoria: "NF-e Serviços", dre: "Receita Bruta de Vendas", confianca: 99, cor: "#3b82f6" },
  { doc: "Extrato Bradesco — Crédito 10/03", valor: "R$ 32.500", categoria: "Receita Bruta", subcategoria: "Recebimento", dre: "Receita Bruta de Vendas", confianca: 95, cor: "#3b82f6" },
  { doc: "NF Energia Elétrica — CPFL", valor: "R$ 8.420", categoria: "Despesa Operacional", subcategoria: "Conta Fixa", dre: "Despesas Operacionais", confianca: 98, cor: "#d97706" },
  { doc: "Folha de Pagamento — Mar/25", valor: "R$ 98.500", categoria: "Despesa Operacional", subcategoria: "Salários e Encargos", dre: "Despesas Operacionais", confianca: 100, cor: "#d97706" },
  { doc: "DAS Simples Nacional — Mar/25", valor: "R$ 18.200", categoria: "Tributos", subcategoria: "Imposto sobre venda", dre: "Deduções e Impostos", confianca: 97, cor: "#10b981" },
  { doc: "NF Compra Insumos — Fornec. ABC", valor: "R$ 124.800", categoria: "Custo Direto (CMV)", subcategoria: "Compra de mercadoria", dre: "CMV / CPV", confianca: 94, cor: "#8b5cf6" },
  { doc: "Conta Aluguel — Mar/25 (débito auto.)", valor: "R$ 12.000", categoria: "Despesa Operacional", subcategoria: "Aluguel e Ocupação", dre: "Despesas Operacionais", confianca: 100, cor: "#d97706" },
  { doc: "IOF / Tarifas bancárias — Mar/25", valor: "R$ 1.340", categoria: "Resultado Financeiro", subcategoria: "Taxas financeiras", dre: "Resultado Financeiro", confianca: 91, cor: "#0d9488" },
];

const REGRAS_SETOR: Record<string, string[]> = {
  "Serviços": ["Mão de obra como principal CMV", "NFS-e como receita dominante", "Sem controle de estoque", "Despesas com viagem e consultoria separadas"],
  "Comércio / Varejo": ["CMV calculado por NF de compra vs. venda", "Controle de estoque obrigatório", "ICMS destacado nas entradas e saídas", "Devoluções e descontos monitorados"],
  "Indústria": ["CMV inclui matéria-prima + mão de obra direta + overhead", "Separação entre produção e administração", "Depreciação de máquinas como custo direto", "Controle de insumos e perdas produtivas"],
};

export function ClassificacaoIA() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-white">Classificação Inteligente</h2>
        <p className="text-xs text-white/40 mt-0.5">Motor de IA · Empresa ABC Ltda · Março 2025</p>
      </div>

      {/* AI status */}
      <div className="rounded-xl border border-[#f0c040]/20 bg-[#f0c040]/5 p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#f0c040]/15 flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-[#f0c040]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Motor de classificação ativo</div>
          <div className="text-xs text-white/45 mt-0.5">
            {ITEMS_CLASSIFICADOS.length} lançamentos classificados · Confiança média: 96,8%
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-white/35">Taxa de acerto</div>
          <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[#f0c040]">96,8%</div>
        </div>
      </div>

      {/* Classification table */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Lançamentos Classificados</h3>
          <div className="flex gap-4 text-[10px] text-white/35">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" />Receita</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#d97706]" />Despesa</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />CMV</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]" />Tributo</span>
          </div>
        </div>
        <div className="divide-y divide-white/4">
          {ITEMS_CLASSIFICADOS.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors flex-wrap">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.cor }} />

              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/75 truncate">{item.doc}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{item.subcategoria}</p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/40">
                <Tag size={10} style={{ color: item.cor }} />
                <span style={{ color: item.cor }} className="font-medium">{item.categoria}</span>
                <ArrowRight size={10} className="text-white/20" />
                <span className="text-white/50">{item.dre}</span>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-medium text-white/70">{item.valor}</span>
                <div className="flex items-center gap-1">
                  {item.confianca >= 95
                    ? <CheckCircle2 size={12} className="text-[#10b981]" />
                    : <AlertCircle size={12} className="text-[#d97706]" />}
                  <span className="text-[10px] text-white/35">{item.confianca}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector adaptation */}
      <div className="rounded-xl border border-white/7 bg-[#343438] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/7">
          <h3 className="text-sm font-semibold text-white">Adaptação por Setor</h3>
          <p className="text-xs text-white/35 mt-0.5">O motor ajusta as regras de classificação conforme o perfil da empresa</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {SETORES.map((setor, si) => (
            <div key={si} className="p-5">
              <div className="text-xs font-semibold text-white/70 mb-3 uppercase tracking-wide">{setor}</div>
              <div className="space-y-2">
                {REGRAS_SETOR[setor].map((r, ri) => (
                  <div key={ri} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#f0c040]/60 mt-1.5 flex-shrink-0" />
                    <p className="text-[11px] text-white/45 leading-snug">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
