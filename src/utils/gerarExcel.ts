import * as XLSX from "xlsx";

// ─── helpers ──────────────────────────────────────────────────────────────────
function brl(v: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function pct(v: number, dec = 1) {
  return v.toFixed(dec).replace(".", ",") + "%";
}

// ─── Sheet 1 — Resumo Executivo ───────────────────────────────────────────────
function sheetResumo() {
  const rows: (string | number)[][] = [
    ["DT FINANCE — RELATÓRIO GERENCIAL 1T26 (Jan–Mar/2026)"],
    [""],
    ["RESUMO EXECUTIVO — INDICADORES PRINCIPAIS"],
    [""],
    ["Indicador", "Valor", "Observação"],
    ["Receita Bruta Trimestral", 2247832, "Jan: 722.419 | Fev: 748.162 | Mar: 777.251"],
    ["(-) Impostos e Deduções", -183727, "8,2% da receita bruta"],
    ["(=) Receita Líquida", 2064105, "Base de cálculo operacional"],
    ["(-) Custo dos Serviços", -1210469, "53,9% da receita líquida"],
    ["(-) Despesas Operacionais", -582242, "28,2% da receita líquida"],
    ["(=) Lucro Líquido", 271394, "Margem líquida: 13,1%"],
    [""],
    ["VARIAÇÃO vs PERÍODOS ANTERIORES"],
    [""],
    ["Comparativo", "1T26", "4T25", "1T25"],
    ["Receita Bruta (R$)", 2247832, 2038500, 1891000],
    ["Lucro Líquido (R$)", 271394, 248400, 207900],
    ["Margem Líquida", "13,1%", "13,2%", "12,0%"],
    ["Variação de Margem vs 1T25", "+1,1 pp", "", ""],
    ["Crescimento Receita t/t", "+10,3%", "", ""],
    ["Crescimento Receita a/a", "+18,9%", "", ""],
    [""],
    ["META vs REALIZADO — RECEITA MENSAL"],
    [""],
    ["Mês", "Meta (R$)", "Realizado (R$)", "Desvio (R$)", "Desvio (%)"],
    ["Janeiro/26", 800000, 722419, -77581, "-9,7%"],
    ["Fevereiro/26", 800000, 748162, -51838, "-6,5%"],
    ["Março/26", 800000, 777251, -22749, "-2,8%"],
    ["TOTAL 1T26", 2400000, 2247832, -152168, "-6,3%"],
    [""],
    ["OBSERVAÇÃO: Desvio decrescente mês a mês. Se tendência continuar, meta é atingível em maio/26."],
  ];
  return rows;
}

// ─── Sheet 2 — DRE Completo ───────────────────────────────────────────────────
function sheetDRE() {
  const rows: (string | number)[][] = [
    ["DRE — DEMONSTRATIVO DE RESULTADO DO EXERCÍCIO"],
    ["1º Trimestre 2026 | Janeiro – Março"],
    [""],
    ["", "Janeiro", "Fevereiro", "Março", "TOTAL 1T26"],
    ["RECEITA BRUTA", 722419, 748162, 777251, 2247832],
    ["(-) Impostos e Deduções", -59078, -61148, -63501, -183727],
    ["(=) RECEITA LÍQUIDA", 663341, 687014, 713750, 2064105],
    [""],
    ["(-) Custo dos Serviços", -381240, -403817, -425412, -1210469],
    ["   Pessoal / Equipe Técnica", -285930, -302863, -319059, -907852],
    ["   Infraestrutura / Tecnologia", -57186, -60573, -63812, -181571],
    ["   Subcontratados / Parceiros", -38124, -40382, -42541, -121047],
    ["(=) LUCRO BRUTO", 282101, 283197, 288338, 853636],
    ["Margem Bruta", "42,5%", "41,2%", "40,4%", "41,4%"],
    [""],
    ["(-) Despesas Operacionais", -181491, -193428, -207323, -582242],
    ["   Administrativas e RH", -90746, -96714, -103662, -291122],
    ["   Marketing e Vendas", -39928, -42554, -45601, -128083],
    ["   Tecnologia e Sistemas", -23594, -25145, -26952, -75691],
    ["   Financeiras", -13612, -14507, -15549, -43668],
    ["   Outros / Variaveis", -13611, -14508, -15559, -43678],
    [""],
    ["(=) EBITDA (aprox.)", 227705, 224855, 224980, 677540],
    ["Margem EBITDA", "34,3%", "32,7%", "31,5%", "32,8%"],
    [""],
    ["(-) Depreciacao / Amort.", -19105, -17772, -18745, -55622],
    [""],
    ["(=) LUCRO LÍQUIDO", 88710, 89769, 92950, 271394],
    ["Margem Liquida", "13,4%", "13,2%", "12,8%", "13,1%"],
    [""],
    ["Crescimento Receita (Jan→Mar)", "", "", "", "+7,6%"],
    ["Crescimento Custo (Jan→Mar)", "", "", "", "+11,6%"],
    [""],
    ["NOTA: Crescimento de custos supera crescimento de receita — escala ainda nao gera eficiencia."],
  ];
  return rows;
}

// ─── Sheet 3 — Receita por Cliente ────────────────────────────────────────────
function sheetClientes() {
  const rows: (string | number)[][] = [
    ["RECEITA POR CLIENTE — 1T26"],
    [""],
    ["Cliente", "Receita Trimestral (R$)", "Participacao (%)", "Receita Media/Mes (R$)", "Classificacao de Risco"],
    ["Cliente A", 568702, "25,3%", 189567, "ALTO — concentracao elevada"],
    ["Cliente B", 406858, "18,1%", 135619, "MEDIO — monitorar"],
    ["Cliente C", 278731, "12,4%", 92910, "BAIXO"],
    ["Outros (carteira diversificada)", 993541, "44,2%", 331180, "BAIXO — carteira pulverizada"],
    ["TOTAL", 2247832, "100,0%", 749277, ""],
    [""],
    ["ANALISE DE CONCENTRACAO"],
    [""],
    ["Top 3 clientes (A+B+C)", 1254291, "55,8%", "", "Risco de concentracao"],
    ["Restante (Outros)", 993541, "44,2%", "", ""],
    [""],
    ["ALERTA: Cliente A representa 25,3% da receita. Sua saida eliminaria R$ 189.567/mes"],
    ["e equivaleria a zerar o lucro liquido do trimestre inteiro."],
    [""],
    ["RECOMENDACAO: Iniciar processo de reducao de dependencia — meta de max. 20% por cliente em 2026."],
  ];
  return rows;
}

// ─── Sheet 4 — Composição de Despesas ─────────────────────────────────────────
function sheetDespesas() {
  const rows: (string | number)[][] = [
    ["COMPOSICAO DE DESPESAS OPERACIONAIS — 1T26"],
    [""],
    ["Categoria", "Janeiro (R$)", "Fevereiro (R$)", "Março (R$)", "Total 1T26 (R$)", "% do Total"],
    ["Administrativas e RH", 90746, 96714, 103662, 291122, "50,0%"],
    ["Marketing e Vendas", 39928, 42554, 45601, 128083, "22,0%"],
    ["Tecnologia e Sistemas", 23594, 25145, 26952, 75691, "13,0%"],
    ["Financeiras", 13612, 14507, 15549, 43668, "7,5%"],
    ["Outros / Variaveis", 13611, 14508, 15559, 43678, "7,5%"],
    ["TOTAL DESPESAS", 181491, 193428, 207323, 582242, "100,0%"],
    [""],
    ["% sobre Receita Liquida", "27,3%", "28,2%", "29,0%", "28,2%", ""],
    [""],
    ["NOTAS ANALITICAS"],
    [""],
    ["Administrativas (50%):", "Principal componente. Crescimento de 14,2% no trimestre. Revisar admissoes e contratos."],
    ["Marketing (22%):", "Abaixo dos 12-15% tipicos do setor (em % da receita). Restricao de investimento comercial."],
    ["Tecnologia (13%):", "Custo crescente com expansao da base. Avaliar contratos SaaS e licencas."],
    ["Outros / Variaveis:", "R$ 14.500/mes sem detalhamento por subcategoria. Potencial de corte de R$ 3-5K/mes."],
  ];
  return rows;
}

// ─── Sheet 5 — Orçado vs Realizado ────────────────────────────────────────────
function sheetOrcamento() {
  const rows: (string | number)[][] = [
    ["ORCADO vs REALIZADO — RECEITA MENSAL 1T26"],
    [""],
    ["Mes", "Orcado (R$)", "Realizado (R$)", "Desvio Absoluto (R$)", "Desvio (%)", "Status"],
    ["Janeiro/26", 800000, 722419, -77581, "-9,7%", "Abaixo da meta"],
    ["Fevereiro/26", 800000, 748162, -51838, "-6,5%", "Abaixo da meta"],
    ["Marco/26", 800000, 777251, -22749, "-2,8%", "Proximo da meta"],
    ["TOTAL 1T26", 2400000, 2247832, -152168, "-6,3%", ""],
    [""],
    ["TENDENCIA DO DESVIO (decrescente)"],
    [""],
    ["Janeiro: -9,7% → Fevereiro: -6,5% → Marco: -2,8%"],
    ["Reducao acumulada de desvio: 6,9 pp em 3 meses"],
    ["Projecao: meta de R$ 800K atingivel em torno de maio/26 se tendencia se mantiver"],
    [""],
    ["ANALISE ORÇAMENTARIA"],
    [""],
    ["O gap orcamentario vem reduzindo consistentemente mes a mes. A empresa nao atingiu a meta"],
    ["em nenhum mes do trimestre, porem o ritmo de fechamento do desvio indica convergencia"],
    ["para a meta no segundo trimestre. Recomenda-se calibrar meta ou acelerar comercial."],
  ];
  return rows;
}

// ─── Sheet 6 — Forecast Fluxo de Caixa ───────────────────────────────────────
function sheetForecast() {
  const rows: (string | number)[][] = [
    ["FORECAST DE CAIXA — PROXIMO TRIMESTRE (Abr–Jun/26)"],
    [""],
    ["Mes", "Entradas Previstas (R$)", "Saidas Previstas (R$)", "Resultado Liq. (R$)", "Caixa Acumulado (R$)"],
    ["Abril/26", 763000, 659000, 104000, 104000],
    ["Maio/26", 778000, 672000, 106000, 210000],
    ["Junho/26", 799000, 690000, 109000, 319000],
    ["TOTAL 2º Tri/26", 2340000, 2021000, 319000, ""],
    [""],
    ["PREMISSAS DO FORECAST"],
    [""],
    ["Receita:", "Crescimento medio de 1,5-2% mes a mes (base 1º Tri/26 + pipeline comercial ativo)"],
    ["Custos Fixos:", "Manutencao do patamar atual (+1,5% ao mes por reajustes contratuais)"],
    ["Impostos:", "8,2% sobre receita bruta (aliquota efetiva 1º Tri/26)"],
    ["Eventos Ext.:", "Sem captacao, aporte ou saida extraordinaria prevista"],
    [""],
    ["CONCLUSAO"],
    [""],
    ["Caixa operacional projetado positivo nos 3 meses: +R$ 319K acumulado."],
    ["A empresa NAO necessita de captacao externa no proximo semestre."],
    ["Janela favoravel para investimento comercial ou quitacao antecipada de obrigacoes."],
  ];
  return rows;
}

// ─── Sheet 7 — Plano de Ação ──────────────────────────────────────────────────
function sheetPlano() {
  const rows: (string | number)[][] = [
    ["PLANO DE ACAO — 30 / 60 / 90 DIAS"],
    [""],
    ["Prazo", "Acao", "Detalhamento", "Impacto Esperado", "Responsavel"],
    [
      "30 dias",
      "Mapeamento de custos por centro de custo",
      "Categorizar todas as despesas por area geradora (Comercial, Ops, Admin). Prazo: 15 dias para levantamento + 15 dias para validacao.",
      "Visibilidade total de onde a margem e comprimida. Eliminar gastos ocultos.",
      "CFO / Financeiro",
    ],
    [
      "30 dias",
      "Reajuste de 5% em contratos +12 meses",
      "Identificar contratos com mais de 12 meses sem reajuste e aplicar reajuste de 5%. Estimativa: 60-70% da base de clientes elegivel.",
      "+R$ 56K-R$ 80K na receita anual sem custo incremental. Margem sobe direto.",
      "Comercial / CEO",
    ],
    [
      "30 dias",
      "Detalhamento da categoria Outros/Variaveis",
      "Auditoria das despesas sem categoria nas ultimas 13 semanas. Identificar gastos recorrentes desnecessarios.",
      "Potencial de corte de R$ 3-5K/mes = +R$ 36-60K de margem ao ano.",
      "Financeiro / Controladoria",
    ],
    [
      "60 dias",
      "Estrutura de meta e acompanhamento mensal",
      "Criar dashboard de acompanhamento comercial com meta por vendedor, produto e canal. Reuniao quinzenal de revisao.",
      "Reducao do gap orcamentario. Previsibilidade de receita aprimorada.",
      "Comercial / CFO",
    ],
    [
      "60 dias",
      "Programa de reducao de concentracao de clientes",
      "Definir meta de max. 20% por cliente ate dez/26. Acelerar prospecao de novos contratos e expandir participacao em clientes B e C.",
      "Reducao do risco de perda de receita por saida de cliente unico.",
      "CEO / Comercial",
    ],
    [
      "90 dias",
      "Revisao de contratos de tecnologia e SaaS",
      "Mapear todas as licencas ativas. Cancelar ferramentas subutilizadas (uso < 30%). Renegociar contratos anuais.",
      "Reducao estimada de R$ 8-15K/mes em despesas de tecnologia.",
      "TI / Financeiro",
    ],
    [
      "90 dias",
      "CFO Meeting quinzenal com diretoria",
      "Reunioes fixas de 45 min para revisao de margem por area, KPIs e acompanhamento do plano de acao.",
      "Decisoes financeiras com velocidade e acuracia. Cultura de gestao por indicadores.",
      "CFO / Diretoria",
    ],
    [""],
    ["NOTA: Este plano de acao e revisado mensalmente conforme evolucao dos indicadores."],
    ["Prioridade maxima: acoes de 30 dias com impacto direto em margem e concentracao."],
  ];
  return rows;
}

// ─── Larguras de coluna padrão ─────────────────────────────────────────────────
function colWidths(n: number, w = 22): { wch: number }[] {
  return Array(n).fill({ wch: w });
}

// ─── Exportar Excel ────────────────────────────────────────────────────────────
export function gerarExcelQ1() {
  const wb = XLSX.utils.book_new();

  const sheets: { name: string; data: (string | number)[][] }[] = [
    { name: "Resumo Executivo",    data: sheetResumo()   },
    { name: "DRE Trimestral",      data: sheetDRE()      },
    { name: "Receita por Cliente", data: sheetClientes() },
    { name: "Despesas",            data: sheetDespesas() },
    { name: "Orcado vs Realizado", data: sheetOrcamento()},
    { name: "Forecast 90 dias",    data: sheetForecast() },
    { name: "Plano de Acao",       data: sheetPlano()    },
  ];

  sheets.forEach(({ name, data }) => {
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = colWidths(6, 28);
    // Make first row bold via format — xlsx community edition supports cell meta
    XLSX.utils.book_append_sheet(wb, ws, name);
  });

  XLSX.writeFile(wb, "DT-Finance-Relatorio-Gerencial-1º Tri-2026.xlsx");
}
