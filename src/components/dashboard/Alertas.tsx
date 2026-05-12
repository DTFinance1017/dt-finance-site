import { AlertTriangle, TrendingDown, Users, CreditCard, ArrowLeftRight, DollarSign } from "lucide-react";

const alerts = [
  {
    icon: <Users size={18} />,
    severity: "high",
    title: "Concentração excessiva em cliente",
    description: "Grupo Alpha representa 38% da receita bruta de Mar/25. Alta concentração em um único cliente expõe a empresa a risco operacional significativo em caso de perda ou renegociação contratual.",
    action: "Diversificar carteira de clientes. Meta recomendada: nenhum cliente acima de 25% da receita.",
    date: "01/04/2025",
    label: "Alto Risco",
    color: "#d97706",
  },
  {
    icon: <CreditCard size={18} />,
    severity: "high",
    title: "Dependência de factoring",
    description: "Volume de antecipações de recebíveis via factoring aumentou 42% em comparação ao trimestre anterior, indicando possível pressão de caixa de curto prazo.",
    action: "Avaliar condições de crédito bancário como alternativa menos custosa ao factoring.",
    date: "01/04/2025",
    label: "Alto Risco",
    color: "#d97706",
  },
  {
    icon: <TrendingDown size={18} />,
    severity: "medium",
    title: "Queda de margem líquida",
    description: "Margem líquida recuou de 15,0% para 14,5% no mês, influenciada pelo crescimento das despesas administrativas acima da receita.",
    action: "Revisar estrutura de custos fixos. Análise detalhada de despesas administrativas recomendada.",
    date: "01/04/2025",
    label: "Atenção",
    color: "#f0c040",
  },
  {
    icon: <DollarSign size={18} />,
    severity: "medium",
    title: "Aumento do endividamento",
    description: "Índice de endividamento subiu de 35,1% para 38,2% no mês, impactado por renovação de crédito de capital de giro. Dívida/EBITDA em 1,2x.",
    action: "Monitorar evolução do endividamento. Nível atual ainda saudável, mas tendência merece atenção.",
    date: "01/04/2025",
    label: "Atenção",
    color: "#f0c040",
  },
  {
    icon: <ArrowLeftRight size={18} />,
    severity: "low",
    title: "Descasamento de prazos",
    description: "Prazo médio de recebimento (38 dias) está superior ao prazo médio de pagamento (31 dias), gerando pressão no capital de giro.",
    action: "Negociar prazos de pagamento com fornecedores ou antecipar recebimentos de clientes estratégicos.",
    date: "01/04/2025",
    label: "Monitorar",
    color: "#3b82f6",
  },
];

const severityOrder = { high: 0, medium: 1, low: 2 };

export function Alertas() {
  const sorted = [...alerts].sort((a, b) => severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <span className="w-2 h-2 rounded-full bg-[#d97706]" />2 alto risco
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <span className="w-2 h-2 rounded-full bg-[#f0c040]" />2 atenção
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/45">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />1 monitorar
        </div>
      </div>

      {sorted.map((alert, i) => (
        <div
          key={i}
          className="rounded-xl border p-5"
          style={{ borderColor: `${alert.color}25`, background: `${alert.color}06` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${alert.color}18`, color: alert.color }}
            >
              {alert.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                <h3 className="text-sm font-semibold text-white">{alert.title}</h3>
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                  style={{ background: `${alert.color}20`, color: alert.color }}
                >
                  {alert.label}
                </span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed mb-3">{alert.description}</p>
              <div className="flex items-start gap-2 p-3 rounded-lg border" style={{ borderColor: `${alert.color}18`, background: `${alert.color}08` }}>
                <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" style={{ color: alert.color }} />
                <p className="text-xs leading-relaxed" style={{ color: `${alert.color}cc` }}>
                  <strong>Ação recomendada:</strong> {alert.action}
                </p>
              </div>
              <p className="text-[10px] text-white/25 mt-2">Identificado em {alert.date} · DT Finance</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
