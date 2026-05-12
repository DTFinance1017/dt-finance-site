export type Pacote = "diagnostico" | "cfo-light" | "cfo-plus" | "cfo-full";

export interface DemoCliente {
  id: string;
  nome: string;
  setor: string;
  porte: string;
  funcionarios: number;
  faturamento: string;
  pacote: Pacote;
  pacoteLabel: string;
  valor: string;
  cor: string;
  corBg: string;
  sigla: string;
}

export const DEMO_CLIENTES: DemoCliente[] = [
  {
    id: "diagnostico",
    nome: "Artesanal Bordados Ltda",
    setor: "Confecção / Serviços",
    porte: "Microempresa",
    funcionarios: 4,
    faturamento: "R$ 480K/ano",
    pacote: "diagnostico",
    pacoteLabel: "Diagnóstico",
    valor: "R$ 2.500",
    cor: "#0d9488",
    corBg: "#0d948818",
    sigla: "AB",
  },
  {
    id: "cfo-light",
    nome: "Moreira & Lima Advocacia",
    setor: "Serviços Jurídicos",
    porte: "Pequena empresa",
    funcionarios: 12,
    faturamento: "R$ 1,2M/ano",
    pacote: "cfo-light",
    pacoteLabel: "CFO Light",
    valor: "R$ 3.000 – 5.000",
    cor: "#3b82f6",
    corBg: "#3b82f618",
    sigla: "ML",
  },
  {
    id: "cfo-plus",
    nome: "Grupo Nutrivida",
    setor: "Alimentação / Distribuição",
    porte: "Média empresa",
    funcionarios: 42,
    faturamento: "R$ 4,8M/ano",
    pacote: "cfo-plus",
    pacoteLabel: "CFO Plus",
    valor: "R$ 7.500 – 10.000",
    cor: "#8b5cf6",
    corBg: "#8b5cf618",
    sigla: "GN",
  },
  {
    id: "cfo-full",
    nome: "Construtora Horizonte S/A",
    setor: "Construção Civil",
    porte: "Média/grande empresa",
    funcionarios: 115,
    faturamento: "R$ 18M/ano",
    pacote: "cfo-full",
    pacoteLabel: "CFO Full",
    valor: "R$ 15.000 – 25.000",
    cor: "#f0c040",
    corBg: "#f0c04018",
    sigla: "CH",
  },
];

export const getClienteById = (id: string): DemoCliente =>
  DEMO_CLIENTES.find((c) => c.id === id) ?? DEMO_CLIENTES[0];

export const NAV_POR_PACOTE: Record<Pacote, { id: string; label: string }[]> = {
  diagnostico: [
    { id: "visao-geral", label: "Diagnóstico" },
    { id: "relatorios", label: "Downloads" },
  ],
  "cfo-light": [
    { id: "visao-geral", label: "Resumo Mensal" },
    { id: "relatorios", label: "DRE Gerencial" },
    { id: "alertas", label: "Reunião Mensal" },
  ],
  "cfo-plus": [
    { id: "visao-geral", label: "Resumo" },
    { id: "kpis", label: "DRE Orç. vs Real." },
    { id: "dashboards", label: "Fluxo de Caixa" },
    { id: "relatorios", label: "KPIs" },
  ],
  "cfo-full": [
    { id: "visao-geral", label: "Visão Executiva" },
    { id: "kpis", label: "DRE & Indicadores" },
    { id: "dashboards", label: "Fluxo de Caixa" },
    { id: "relatorios", label: "Custos & Vendas" },
    { id: "alertas", label: "Gestão Bancária" },
    { id: "configuracoes", label: "Orçamento" },
  ],
};
