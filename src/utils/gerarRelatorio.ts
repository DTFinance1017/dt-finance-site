import { jsPDF } from "jspdf";
import { historico, forecast } from "../components/dashboard/AnaliseAnual";

async function logoBase64(): Promise<string> {
  const res = await fetch("/logo-dt-v2.png");
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function tint(c: { r: number; g: number; b: number }, amount = 0.92) {
  return {
    r: Math.round(c.r + (255 - c.r) * amount),
    g: Math.round(c.g + (255 - c.g) * amount),
    b: Math.round(c.b + (255 - c.b) * amount),
  };
}

export type ReportType = "Executivo" | "DRE" | "Caixa" | "Alertas";

const reportTitles: Record<ReportType, string> = {
  Executivo: "Relatório Executivo",
  DRE: "DRE Gerencial",
  Caixa: "Análise de Caixa",
  Alertas: "Alertas Financeiros",
};

export async function gerarRelatorio(
  type: ReportType,
  periodo: string,
  _reportName: string
) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const navy    = hexToRgb("#040c1c");
  const navyMid = hexToRgb("#07132a");
  const blue    = hexToRgb("#3b82f6");
  const gold    = hexToRgb("#f0c040");
  const emerald = hexToRgb("#10b981");
  const amber   = hexToRgb("#d97706");
  const slate   = hexToRgb("#64748b");
  const red     = hexToRgb("#ef4444");

  /* ── Header background ── */
  doc.setFillColor(navy.r, navy.g, navy.b);
  doc.rect(0, 0, W, 42, "F");

  /* ── Accent bar ── */
  doc.setFillColor(blue.r, blue.g, blue.b);
  doc.rect(0, 42, W, 1.2, "F");

  /* ── Logo (905×323 px → ratio 2.8:1; render at 34×12 mm) ── */
  try {
    const logo = await logoBase64();
    doc.addImage(logo, "PNG", 14, 15, 34, 12);
  } catch (_) { /* skip if logo fails */ }

  /* ── Company name ── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text("DT Finance", 52, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 200, 220);
  doc.text("Dados e Tecnologia para Inteligência Financeira", 52, 24);

  /* ── Report title (right side) ── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(gold.r, gold.g, gold.b);
  doc.text(reportTitles[type], W - 14, 17, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(140, 170, 200);
  doc.text(periodo, W - 14, 23, { align: "right" });

  doc.setFontSize(6.5);
  doc.setTextColor(100, 130, 160);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`,
    W - 14, 37, { align: "right" }
  );

  let y = 52;

  /* ── Company info band ── */
  doc.setFillColor(navyMid.r, navyMid.g, navyMid.b);
  doc.roundedRect(14, y, W - 28, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("Empresa ABC Ltda", 20, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(150, 180, 210);
  doc.text("CNPJ 00.000.000/0001-00  ·  Março 2025  ·  CONFIDENCIAL — uso exclusivo da diretoria", 20, y + 9.5);
  y += 18;

  /* ── Helper: section title ── */
  function sectionTitle(title: string, yPos: number) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(blue.r, blue.g, blue.b);
    doc.text(title, 14, yPos);
    doc.setDrawColor(blue.r, blue.g, blue.b);
    doc.setLineWidth(0.4);
    doc.line(14, yPos + 1.5, W - 14, yPos + 1.5);
    return yPos + 8;
  }

  /* ── KPIs ── */
  y = sectionTitle("INDICADORES EXECUTIVOS — MARÇO 2025", y);

  const kpis = [
    { label: "Receita Bruta",          value: "R$ 2.840.000", change: "+12,4% vs mês anterior", color: blue,    good: true  },
    { label: "Margem EBITDA",           value: "31,4%",        change: "+2,1pp vs mês anterior", color: emerald, good: true  },
    { label: "Caixa Disponível",        value: "R$ 1.120.000", change: "-5,2% vs mês anterior",  color: amber,   good: false },
    { label: "Índice de Inadimplência", value: "3,2%",         change: "-0,8pp vs mês anterior", color: emerald, good: true  },
    { label: "Receita Recorrente (MRR)",value: "R$ 1.950.000", change: "+8,7% vs mês anterior",  color: blue,    good: true  },
    { label: "Custo Fixo Total",        value: "R$ 680.000",   change: "+1,2% vs mês anterior",  color: amber,   good: false },
    { label: "Ticket Médio",            value: "R$ 42.500",    change: "+3,8% vs mês anterior",  color: blue,    good: true  },
    { label: "Resultado Líquido",       value: "R$ 412.000",   change: "+18,3% vs mês anterior", color: emerald, good: true  },
  ];

  const colW = (W - 28 - 9) / 4;
  const kpiRows = [kpis.slice(0, 4), kpis.slice(4, 8)];

  for (const row of kpiRows) {
    for (let i = 0; i < row.length; i++) {
      const kpi = row[i];
      const x   = 14 + i * (colW + 3);
      const c   = kpi.color;
      const bg  = tint(c, 0.92);

      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.roundedRect(x, y, colW, 20, 2, 2, "F");

      const borderColor = tint(c, 0.75);
      doc.setDrawColor(borderColor.r, borderColor.g, borderColor.b);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, colW, 20, 2, 2, "S");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 120, 150);
      doc.text(kpi.label, x + 3, y + 5.5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(20, 30, 50);
      doc.text(kpi.value, x + 3, y + 12);

      const cc = kpi.good ? emerald : amber;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.setTextColor(cc.r, cc.g, cc.b);
      doc.text(kpi.change, x + 3, y + 17.5);
    }
    y += 24;
  }

  y += 4;

  /* ── DRE ── */
  if (type === "Executivo" || type === "DRE") {
    y = sectionTitle("DEMONSTRATIVO DE RESULTADO — DRE GERENCIAL", y);

    const dreRows = [
      { label: "Receita Bruta de Vendas",       mar: "2.840.000",   fev: "2.520.000",   jan: "2.380.000",   bold: false, indent: 0,  highlight: false },
      { label: "(-) Deduções e Impostos",        mar: "(284.000)",   fev: "(252.000)",   jan: "(238.000)",   bold: false, indent: 0,  highlight: false },
      { label: "Receita Líquida",                mar: "2.556.000",   fev: "2.268.000",   jan: "2.142.000",   bold: true,  indent: 0,  highlight: false },
      { label: "(-) Custo dos Produtos/Serviços",mar: "(1.024.000)", fev: "(924.000)",   jan: "(876.000)",   bold: false, indent: 0,  highlight: false },
      { label: "Lucro Bruto",                    mar: "1.532.000",   fev: "1.344.000",   jan: "1.266.000",   bold: true,  indent: 0,  highlight: true  },
      { label: "(-) Despesas Operacionais",      mar: "(988.000)",   fev: "(876.000)",   jan: "(834.000)",   bold: false, indent: 0,  highlight: false },
      { label: "Salários e Encargos",            mar: "(520.000)",   fev: "(490.000)",   jan: "(490.000)",   bold: false, indent: 6,  highlight: false },
      { label: "Despesas Comerciais",            mar: "(218.000)",   fev: "(196.000)",   jan: "(194.000)",   bold: false, indent: 6,  highlight: false },
      { label: "Despesas Administrativas",       mar: "(250.000)",   fev: "(190.000)",   jan: "(150.000)",   bold: false, indent: 6,  highlight: false },
      { label: "EBITDA",                         mar: "892.800",     fev: "781.200",     jan: "734.400",     bold: true,  indent: 0,  highlight: true  },
      { label: "Margem EBITDA",                  mar: "31,4%",       fev: "30,9%",       jan: "30,8%",       bold: true,  indent: 0,  highlight: true  },
      { label: "(-) Depreciação e Amortização",  mar: "(48.000)",    fev: "(48.000)",    jan: "(48.000)",    bold: false, indent: 0,  highlight: false },
      { label: "EBIT",                           mar: "844.800",     fev: "733.200",     jan: "686.400",     bold: false, indent: 0,  highlight: false },
      { label: "(-) Resultado Financeiro",       mar: "(82.000)",    fev: "(76.000)",    jan: "(68.000)",    bold: false, indent: 0,  highlight: false },
      { label: "Resultado Antes do IR",          mar: "762.800",     fev: "657.200",     jan: "618.400",     bold: false, indent: 0,  highlight: false },
      { label: "(-) IRPJ e CSLL",               mar: "(350.800)",   fev: "(309.400)",   jan: "(286.400)",   bold: false, indent: 0,  highlight: false },
      { label: "Resultado Líquido",              mar: "412.000",     fev: "347.800",     jan: "332.000",     bold: true,  indent: 0,  highlight: true  },
      { label: "Margem Líquida",                 mar: "14,5%",       fev: "13,8%",       jan: "13,9%",       bold: true,  indent: 0,  highlight: true  },
    ];

    const headers = ["", "Mar/25", "Fev/25", "Jan/25"];
    const cw      = [85, 28, 28, 28];
    const xs      = [14, 99, 127, 155];

    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(14, y, W - 28, 7, "F");
    headers.forEach((h, i) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(180, 200, 220);
      doc.text(h, xs[i] + (i > 0 ? cw[i] : 0), y + 4.5, { align: i > 0 ? "right" : "left" });
    });
    y += 7;

    dreRows.forEach((row, idx) => {
      const bg = row.highlight
        ? { r: 235, g: 245, b: 255 }
        : idx % 2 === 0
        ? { r: 250, g: 251, b: 255 }
        : { r: 244, g: 246, b: 252 };

      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.rect(14, y, W - 28, 6.5, "F");

      doc.setFont("helvetica", row.bold ? "bold" : "normal");
      doc.setFontSize(7);
      const tc = row.bold ? { r: 10, g: 20, b: 50 } : { r: 60, g: 80, b: 110 };
      doc.setTextColor(tc.r, tc.g, tc.b);
      doc.text(row.label, xs[0] + row.indent, y + 4.2);

      [row.mar, row.fev, row.jan].forEach((val, vi) => {
        const isNeg = val.startsWith("(") || val.startsWith("-");
        let vc = isNeg ? amber : (row.highlight ? emerald : (row.bold ? blue : { r: 50, g: 70, b: 100 }));
        doc.setTextColor(vc.r, vc.g, vc.b);
        doc.setFont("helvetica", row.bold ? "bold" : "normal");
        doc.text(val, xs[vi + 1] + cw[vi + 1], y + 4.2, { align: "right" });
      });

      doc.setDrawColor(220, 225, 235);
      doc.setLineWidth(0.1);
      doc.line(14, y + 6.5, W - 14, y + 6.5);
      y += 6.5;
    });
    y += 6;
  }

  /* ── Cash Flow ── */
  if (type === "Executivo" || type === "Caixa") {
    if (y > 230) { doc.addPage(); y = 20; }
    y = sectionTitle("ANÁLISE DE FLUXO DE CAIXA", y);

    const cfRows = [
      { label: "Saldo Inicial (01/03/2025)",      value: "R$ 1.218.400",  type: "neutral"  },
      { label: "Entradas Operacionais",            value: "+ R$ 2.640.000",type: "positive" },
      { label: "Saídas Operacionais",              value: "- R$ 1.892.000",type: "negative" },
      { label: "Resultado Operacional Líquido",    value: "R$ 748.000",    type: "positive" },
      { label: "Entradas Financeiras",             value: "+ R$ 12.400",   type: "positive" },
      { label: "Saídas Financeiras",               value: "- R$ 82.000",   type: "negative" },
      { label: "Amortizações e Financiamentos",    value: "- R$ 376.800",  type: "negative" },
      { label: "Saldo Final (31/03/2025)",         value: "R$ 1.120.000",  type: "total"    },
    ];

    cfRows.forEach((row) => {
      if (row.type === "total") {
        doc.setFillColor(navy.r, navy.g, navy.b);
        doc.roundedRect(14, y, W - 28, 8, 1.5, 1.5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(row.label, 20, y + 5.2);
        doc.setTextColor(gold.r, gold.g, gold.b);
        doc.text(row.value, W - 20, y + 5.2, { align: "right" });
        y += 10;
      } else {
        doc.setFillColor(250, 251, 255);
        doc.rect(14, y, W - 28, 6.5, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(60, 80, 110);
        doc.text(row.label, 20, y + 4.2);
        const vc = row.type === "positive" ? emerald : row.type === "negative" ? amber : slate;
        doc.setTextColor(vc.r, vc.g, vc.b);
        doc.setFont("helvetica", "bold");
        doc.text(row.value, W - 20, y + 4.2, { align: "right" });
        doc.setDrawColor(220, 225, 235);
        doc.setLineWidth(0.1);
        doc.line(14, y + 6.5, W - 14, y + 6.5);
        y += 6.5;
      }
    });
    y += 6;
  }

  /* ── Alerts ── */
  if (type === "Executivo" || type === "Alertas") {
    if (y > 230) { doc.addPage(); y = 20; }
    y = sectionTitle("ALERTAS E PONTOS DE ATENÇÃO", y);

    const alerts = [
      { level: "CRÍTICO",  color: red,     text: "Concentração de recebíveis: Grupo Alpha representa 38% da Receita Bruta — risco de concentração elevado. Recomenda-se diversificação comercial urgente." },
      { level: "ATENÇÃO",  color: amber,   text: "Caixa disponível recuou 5,2% em março. Projeção para abril indica necessidade de capital de giro adicional de R$ 180.000 caso inadimplência se mantenha." },
      { level: "ATENÇÃO",  color: amber,   text: "Despesas administrativas cresceram 31,6% vs janeiro/25. Revisão de contratos e fornecedores recomendada para o próximo trimestre." },
      { level: "POSITIVO", color: emerald, text: "Margem EBITDA atingiu 31,4% — melhor resultado dos últimos 6 meses. Eficiência operacional em expansão." },
      { level: "POSITIVO", color: emerald, text: "Inadimplência recuou para 3,2% (vs 4,0% em fevereiro). Ação de cobrança implementada em fevereiro apresentou resultado positivo." },
    ];

    alerts.forEach((alert) => {
      const bg = tint(alert.color, 0.90);
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.roundedRect(14, y, W - 28, 14, 2, 2, "F");

      doc.setFillColor(alert.color.r, alert.color.g, alert.color.b);
      doc.roundedRect(14, y, 3, 14, 0.5, 0.5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(alert.color.r, alert.color.g, alert.color.b);
      doc.text(alert.level, 21, y + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(40, 60, 90);
      const lines = doc.splitTextToSize(alert.text, W - 42);
      doc.text(lines, 21, y + 10);
      y += 17;
    });
    y += 4;
  }

  /* ── Análise Anual 2026 ── */
  if (type === "Executivo" || type === "DRE") {
    doc.addPage();
    y = 20;

    /* Page header stripe */
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, 0, W, 14, "F");
    doc.setFillColor(gold.r, gold.g, gold.b);
    doc.rect(0, 14, W, 0.8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gold.r, gold.g, gold.b);
    doc.text("ANÁLISE ANUAL 2026 — META VS REALIZADO + FORECAST", 14, 9.5);
    y = 22;

    /* Compute derived values */
    const ytdMeses = historico.filter((h) => h.tipo === "ytd");
    const ytdMeta  = ytdMeses.reduce((s, h) => s + h.meta, 0);
    const ytdReal  = ytdMeses.reduce((s, h) => s + h.real, 0);
    const ytdPct   = (ytdReal / ytdMeta) * 100;
    const metaAnual= historico.reduce((s, h) => s + h.meta, 0) + forecast.reduce((s, f) => s + f.meta, 0);
    const projTotal= ytdReal + forecast.reduce((s, f) => s + f.proj, 0);
    const projPct  = (projTotal / metaAnual) * 100;

    function fmtK(v: number) { return v >= 1000 ? `R$ ${(v / 1000).toFixed(2).replace(".", ",")}M` : `R$ ${v}K`; }

    /* Summary KPI boxes */
    const summaryKpis = [
      { label: "YTD Receita (Jan–Mar/26)", value: fmtK(ytdReal), sub: `${ytdPct.toFixed(1)}% da meta YTD`, color: blue },
      { label: "Projeção Anual 2026",      value: fmtK(projTotal), sub: "Realizado + Forecast",             color: emerald },
      { label: "Meta Anual 2026",          value: fmtK(metaAnual), sub: "12 meses consolidado",             color: gold },
      { label: "Ating. Projetado",         value: `${projPct.toFixed(1)}%`, sub: projPct >= 100 ? "Acima da meta" : "Abaixo da meta", color: projPct >= 100 ? emerald : amber },
    ];
    const kW = (W - 28 - 9) / 4;
    summaryKpis.forEach((k, i) => {
      const x  = 14 + i * (kW + 3);
      const bg = tint(k.color, 0.90);
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.roundedRect(x, y, kW, 20, 2, 2, "F");
      const border = tint(k.color, 0.75);
      doc.setDrawColor(border.r, border.g, border.b);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, kW, 20, 2, 2, "S");
      doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(80, 100, 130);
      doc.text(k.label, x + 3, y + 5);
      doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(k.color.r, k.color.g, k.color.b);
      doc.text(k.value, x + 3, y + 12);
      doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(100, 120, 150);
      doc.text(k.sub, x + 3, y + 17.5);
    });
    y += 25;

    /* Progress bar */
    doc.setFillColor(230, 235, 245);
    doc.roundedRect(14, y, W - 28, 7, 2, 2, "F");
    const barW = Math.min((projPct / 100) * (W - 28), W - 28);
    const barColor = projPct >= 100 ? emerald : blue;
    doc.setFillColor(barColor.r, barColor.g, barColor.b);
    doc.roundedRect(14, y, barW, 7, 2, 2, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.setTextColor(255, 255, 255);
    if (barW > 30) doc.text(`${projPct.toFixed(1)}% da meta anual`, 18, y + 4.5);
    y += 10;
    doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(60, 80, 110);
    const ritmoText = projPct >= 100
      ? `No ritmo atual, a empresa projeta encerrar 2026 com ${fmtK(projTotal)} — ${(projPct - 100).toFixed(1)}% acima da meta anual de ${fmtK(metaAnual)}.`
      : `Atenção: ritmo atual projeta ${fmtK(projTotal)}, ficando ${fmtK(metaAnual - projTotal)} abaixo da meta de ${fmtK(metaAnual)}. Aceleração comercial recomendada.`;
    doc.text(doc.splitTextToSize(ritmoText, W - 28), 14, y);
    y += 10;

    /* ── Line Chart: Receita Realizado vs Forecast ── */
    if (y > 195) { doc.addPage(); y = 20; }
    y = sectionTitle("GRÁFICO — RECEITA BRUTA: REALIZADO VS FORECAST (OUT/25 – DEZ/26)", y);

    {
      const cLeft  = 32;
      const cRight = W - 14;
      const cPW    = cRight - cLeft;   // plot width (mm)
      const cPH    = 42;               // plot height (mm)
      const cBot   = y + cPH;

      const allMeta = [...historico.map(h => h.meta), ...forecast.map(f => f.meta)];
      const steps   = allMeta.length - 1; // 14

      function gx(i: number) { return cLeft + (i / steps) * cPW; }
      function gy(v: number) { return cBot - ((v - 2000) / 1500) * cPH; }

      /* Shaded forecast zone */
      const divXp = (gx(historico.length - 1) + gx(historico.length)) / 2;
      const fcBg  = tint(emerald, 0.93);
      doc.setFillColor(fcBg.r, fcBg.g, fcBg.b);
      doc.rect(divXp, y, cRight - divXp, cPH, "F");

      /* Grid lines */
      [2000, 2400, 2800, 3200].forEach((v) => {
        const gy_v = gy(v);
        doc.setDrawColor(210, 220, 235); doc.setLineWidth(0.15); doc.setLineDash([1, 2], 0);
        doc.line(cLeft, gy_v, cRight, gy_v);
        doc.setLineDash([], 0);
        doc.setFont("helvetica", "normal"); doc.setFontSize(5.8); doc.setTextColor(100, 120, 155);
        doc.text(`${(v / 1000).toFixed(1)}M`, cLeft - 1.5, gy_v + 1.8, { align: "right" });
      });

      /* Divider */
      doc.setLineDash([1.2, 1.5], 0); doc.setDrawColor(140, 165, 200); doc.setLineWidth(0.5);
      doc.line(divXp, y - 2, divXp, cBot + 4);
      doc.setLineDash([], 0);

      /* Legend (top-right) */
      [
        { lbl: "Meta",      color: { r: 150, g: 175, b: 210 }, dash: true  },
        { lbl: "Realizado", color: blue,                        dash: false },
        { lbl: "Forecast",  color: { r: 13, g: 148, b: 136 },  dash: true  },
      ].forEach((leg, i) => {
        const lx = cRight - 84 + i * 29;
        doc.setDrawColor(leg.color.r, leg.color.g, leg.color.b); doc.setLineWidth(0.9);
        if (leg.dash) doc.setLineDash([1.5, 1.5], 0); else doc.setLineDash([], 0);
        doc.line(lx, y - 5, lx + 8, y - 5);
        doc.setLineDash([], 0);
        doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(80, 105, 140);
        doc.text(leg.lbl, lx + 10, y - 3.5);
      });

      /* Divider labels */
      doc.setFontSize(5.8); doc.setTextColor(90, 115, 155);
      doc.text("◀ Realizado", divXp - 1.5, y - 2, { align: "right" });
      doc.setTextColor(13, 148, 136);
      doc.text("Forecast ▶", divXp + 1.5, y - 2);

      /* Meta line (dashed gray) */
      doc.setLineDash([1.5, 1.5], 0); doc.setDrawColor(150, 175, 210); doc.setLineWidth(0.7);
      for (let i = 0; i < steps; i++) {
        doc.line(gx(i), gy(allMeta[i]), gx(i + 1), gy(allMeta[i + 1]));
      }
      doc.setLineDash([], 0);

      /* Realizado line (solid blue) */
      doc.setDrawColor(blue.r, blue.g, blue.b); doc.setLineWidth(1.3);
      for (let i = 0; i < historico.length - 1; i++) {
        doc.line(gx(i), gy(historico[i].real), gx(i + 1), gy(historico[i + 1].real));
      }

      /* Projetado line (dashed teal) */
      doc.setLineDash([2, 1.5], 0); doc.setDrawColor(13, 148, 136); doc.setLineWidth(1.3);
      doc.line(gx(historico.length - 1), gy(historico[historico.length - 1].real), gx(historico.length), gy(forecast[0].proj));
      for (let i = 0; i < forecast.length - 1; i++) {
        doc.line(gx(historico.length + i), gy(forecast[i].proj), gx(historico.length + i + 1), gy(forecast[i + 1].proj));
      }
      doc.setLineDash([], 0);

      /* Realizado dots */
      historico.forEach((h, i) => {
        doc.setFillColor(blue.r, blue.g, blue.b);
        doc.circle(gx(i), gy(h.real), 1.0, "F");
      });

      /* Forecast dots */
      forecast.forEach((f, i) => {
        doc.setFillColor(13, 148, 136);
        doc.circle(gx(historico.length + i), gy(f.proj), 0.9, "F");
      });

      /* X-axis labels */
      const xLabels = ["Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      xLabels.forEach((lbl, i) => {
        doc.setFont("helvetica", "normal"); doc.setFontSize(5.5);
        doc.setTextColor(i < historico.length ? 80 : 13, i < historico.length ? 105 : 148, i < historico.length ? 150 : 136);
        doc.text(lbl, gx(i), cBot + 5, { align: "center" });
      });

      /* Year labels below */
      doc.setFontSize(5); doc.setTextColor(120, 140, 170);
      doc.text("2025", gx(1), cBot + 9, { align: "center" });
      doc.text("2026", gx(8), cBot + 9, { align: "center" });

      /* Axis baseline */
      doc.setDrawColor(190, 205, 225); doc.setLineWidth(0.3);
      doc.line(cLeft, cBot, cRight, cBot);

      y = cBot + 14;
    }

    /* ── Histórico table ── */
    y = sectionTitle("HISTÓRICO — META VS REALIZADO (OUT/25 – MAR/26)", y);

    const histHeaders = ["Mês", "Meta (R$K)", "Realizado (R$K)", "Variação (R$K)", "% Ating.", "Status", "Tipo"];
    const histCW      = [28, 30, 34, 30, 22, 22, 14];
    const histX       = [14, 42, 72, 106, 136, 158, 180];

    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(14, y, W - 28, 7, "F");
    histHeaders.forEach((h, i) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.setTextColor(180, 200, 225);
      doc.text(h, i === 0 ? histX[i] + 1 : histX[i] + histCW[i], y + 4.5, { align: i === 0 ? "left" : "right" });
    });
    y += 7;

    historico.forEach((row, idx) => {
      const pct   = (row.real / row.meta) * 100;
      const delta = row.real - row.meta;
      const good  = pct >= 100;
      const bg    = row.tipo === "ytd"
        ? { r: 235, g: 245, b: 255 }
        : idx % 2 === 0 ? { r: 250, g: 251, b: 255 } : { r: 244, g: 246, b: 252 };
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.rect(14, y, W - 28, 6.5, "F");

      const vals = [
        { t: row.mes,              align: "left"  as const, color: { r: 30, g: 50, b: 80 },  bold: true  },
        { t: row.meta.toLocaleString("pt-BR"), align: "right" as const, color: { r: 80, g: 100, b: 130 }, bold: false },
        { t: row.real.toLocaleString("pt-BR"), align: "right" as const, color: { r: 20, g: 40, b: 70 },  bold: true  },
        { t: (delta >= 0 ? "+" : "") + delta.toLocaleString("pt-BR"), align: "right" as const, color: delta >= 0 ? emerald : red, bold: true },
        { t: `${pct.toFixed(1)}%`, align: "right" as const, color: good ? emerald : pct >= 95 ? amber : red, bold: true },
        { t: good ? "✓ Meta" : pct >= 95 ? "~ Perto" : "✗ Abaixo", align: "right" as const, color: good ? emerald : pct >= 95 ? amber : red, bold: false },
        { t: row.tipo === "ytd" ? "YTD" : "Hist.", align: "right" as const, color: row.tipo === "ytd" ? blue : slate, bold: false },
      ];
      vals.forEach((v, i) => {
        doc.setFont("helvetica", v.bold ? "bold" : "normal");
        doc.setFontSize(7);
        doc.setTextColor(v.color.r, v.color.g, v.color.b);
        doc.text(v.t, i === 0 ? histX[i] + 1 : histX[i] + histCW[i], y + 4.2, { align: v.align });
      });
      doc.setDrawColor(215, 225, 238); doc.setLineWidth(0.1);
      doc.line(14, y + 6.5, W - 14, y + 6.5);
      y += 6.5;
    });

    /* YTD total row */
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(14, y, W - 28, 8, "F");
    const ytdDelta = ytdReal - ytdMeta;
    [
      { t: "TOTAL YTD (Jan–Mar/26)", align: "left"  as const, color: { r: 255, g: 255, b: 255 }, x: histX[0] + 1 },
      { t: ytdMeta.toLocaleString("pt-BR"), align: "right" as const, color: { r: 180, g: 200, b: 225 }, x: histX[1] + histCW[1] },
      { t: ytdReal.toLocaleString("pt-BR"), align: "right" as const, color: { r: 255, g: 255, b: 255 }, x: histX[2] + histCW[2] },
      { t: (ytdDelta >= 0 ? "+" : "") + ytdDelta.toLocaleString("pt-BR"), align: "right" as const, color: ytdDelta >= 0 ? emerald : red, x: histX[3] + histCW[3] },
      { t: `${ytdPct.toFixed(1)}%`, align: "right" as const, color: gold, x: histX[4] + histCW[4] },
    ].forEach((v) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
      doc.setTextColor(v.color.r, v.color.g, v.color.b);
      doc.text(v.t, v.x, y + 5.2, { align: v.align });
    });
    y += 12;

    /* ── Forecast table ── */
    y = sectionTitle("FORECAST — PROJEÇÃO ABR–DEZ/26", y);

    const fcHeaders = ["Mês", "Meta (R$K)", "Forecast (R$K)", "% vs Meta", "Indicação"];
    const fcCW      = [30, 35, 38, 28, 35];
    const fcX       = [14, 44, 79, 117, 145];

    doc.setFillColor(tint(emerald, 0.15).r, tint(emerald, 0.15).g, tint(emerald, 0.15).b);
    doc.rect(14, y, W - 28, 7, "F");
    fcHeaders.forEach((h, i) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(6.5); doc.setTextColor(20, 70, 50);
      doc.text(h, i === 0 ? fcX[i] + 1 : fcX[i] + fcCW[i], y + 4.5, { align: i === 0 ? "left" : "right" });
    });
    y += 7;

    forecast.forEach((row, idx) => {
      const pct  = (row.proj / row.meta) * 100;
      const good = pct >= 100;
      const bg   = idx % 2 === 0 ? { r: 248, g: 252, b: 250 } : { r: 241, g: 248, b: 244 };
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.rect(14, y, W - 28, 6.5, "F");

      const vals = [
        { t: row.mes,    align: "left"  as const, color: { r: 30, g: 50, b: 80 },  bold: true  },
        { t: row.meta.toLocaleString("pt-BR"),  align: "right" as const, color: { r: 80, g: 100, b: 130 }, bold: false },
        { t: row.proj.toLocaleString("pt-BR"),  align: "right" as const, color: good ? emerald : amber, bold: true  },
        { t: `${pct.toFixed(1)}%`, align: "right" as const, color: good ? emerald : amber, bold: true },
        { t: good ? "▲ Acima da meta" : "▼ Abaixo da meta", align: "right" as const, color: good ? emerald : amber, bold: false },
      ];
      vals.forEach((v, i) => {
        doc.setFont("helvetica", v.bold ? "bold" : "normal");
        doc.setFontSize(7);
        doc.setTextColor(v.color.r, v.color.g, v.color.b);
        doc.text(v.t, i === 0 ? fcX[i] + 1 : fcX[i] + fcCW[i], y + 4.2, { align: v.align });
      });
      doc.setDrawColor(215, 235, 225); doc.setLineWidth(0.1);
      doc.line(14, y + 6.5, W - 14, y + 6.5);
      y += 6.5;
    });

    /* Forecast total row */
    const fcMetaTotal = forecast.reduce((s, f) => s + f.meta, 0);
    const fcProjTotal = forecast.reduce((s, f) => s + f.proj, 0);
    const fcPct       = (fcProjTotal / fcMetaTotal) * 100;
    doc.setFillColor(tint(emerald, 0.15).r, tint(emerald, 0.15).g, tint(emerald, 0.15).b);
    doc.rect(14, y, W - 28, 8, "F");
    [
      { t: "TOTAL FORECAST (Abr–Dez/26)", align: "left"  as const, color: { r: 20, g: 70, b: 50 }, x: fcX[0] + 1 },
      { t: fcMetaTotal.toLocaleString("pt-BR"), align: "right" as const, color: { r: 60, g: 100, b: 80 }, x: fcX[1] + fcCW[1] },
      { t: fcProjTotal.toLocaleString("pt-BR"), align: "right" as const, color: emerald, x: fcX[2] + fcCW[2] },
      { t: `${fcPct.toFixed(1)}%`, align: "right" as const, color: emerald, x: fcX[3] + fcCW[3] },
    ].forEach((v) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.5);
      doc.setTextColor(v.color.r, v.color.g, v.color.b);
      doc.text(v.t, v.x, y + 5.2, { align: v.align });
    });
    y += 12;

    /* Consolidated 2026 */
    if (y > 230) { doc.addPage(); y = 20; }
    y = sectionTitle("VISÃO CONSOLIDADA — RECEITA BRUTA 2026", y);

    const consItems = [
      { label: "Realizado YTD (Jan–Mar/26)", value: fmtK(ytdReal),     color: blue,    note: `${ytdPct.toFixed(1)}% da meta YTD` },
      { label: "Forecast Restante (Abr–Dez)", value: fmtK(fcProjTotal), color: emerald, note: "Baseado em tendência" },
      { label: "Projeção Total Anual",         value: fmtK(projTotal),  color: emerald, note: "Realizado + Forecast" },
      { label: "Meta Anual 2026",              value: fmtK(metaAnual),  color: gold,    note: `${projPct.toFixed(1)}% será atingido` },
    ];

    consItems.forEach((item, i) => {
      const x  = 14 + i * (kW + 3);
      const bg = tint(item.color, 0.88);
      doc.setFillColor(bg.r, bg.g, bg.b);
      doc.roundedRect(x, y, kW, 22, 2, 2, "F");
      const border = tint(item.color, 0.72);
      doc.setDrawColor(border.r, border.g, border.b);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, kW, 22, 2, 2, "S");
      doc.setFont("helvetica", "normal"); doc.setFontSize(5.5); doc.setTextColor(80, 100, 130);
      const lns = doc.splitTextToSize(item.label, kW - 4);
      doc.text(lns, x + 2, y + 4.5);
      doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(item.color.r, item.color.g, item.color.b);
      doc.text(item.value, x + 2, y + 14);
      doc.setFont("helvetica", "normal"); doc.setFontSize(5.5); doc.setTextColor(100, 130, 160);
      doc.text(item.note, x + 2, y + 19.5);
    });
    y += 26;

    /* Conclusion box */
    const concBg = projPct >= 100 ? tint(emerald, 0.88) : tint(amber, 0.88);
    const concColor = projPct >= 100 ? emerald : amber;
    doc.setFillColor(concBg.r, concBg.g, concBg.b);
    doc.roundedRect(14, y, W - 28, 14, 2, 2, "F");
    doc.setFillColor(concColor.r, concColor.g, concColor.b);
    doc.roundedRect(14, y, 3, 14, 0.5, 0.5, "F");
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(concColor.r, concColor.g, concColor.b);
    doc.text(projPct >= 100 ? "RITMO ATUAL: META ANUAL EM CURSO" : "ATENÇÃO: RITMO ABAIXO DA META", 21, y + 5.5);
    doc.setFont("helvetica", "normal"); doc.setFontSize(6.8); doc.setTextColor(40, 60, 90);
    const concText = projPct >= 100
      ? `Com base no desempenho de Jan–Mar/26 e na projeção para os demais meses, a empresa tende a encerrar 2026 com ${fmtK(projTotal)}, representando ${projPct.toFixed(1)}% de atingimento da meta anual de ${fmtK(metaAnual)}.`
      : `O desempenho de Jan–Mar/26 indica projeção de ${fmtK(projTotal)} para o ano completo, abaixo da meta anual de ${fmtK(metaAnual)}. Recomenda-se aceleração comercial no 2º trimestre.`;
    doc.text(doc.splitTextToSize(concText, W - 42), 21, y + 10.5);
    y += 18;
  }

  /* ── Footer on every page ── */
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(navy.r, navy.g, navy.b);
    doc.rect(0, 285, W, 12, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 150, 185);
    doc.text(
      "DT Finance — Inteligência Financeira · Documento CONFIDENCIAL gerado automaticamente pela plataforma · www.dtfinance.com.br",
      W / 2, 291, { align: "center" }
    );
    doc.setTextColor(80, 110, 150);
    doc.text(`Pág. ${p} / ${totalPages}`, W - 14, 291, { align: "right" });
  }

  /* ── Download ── */
  doc.save(`DT Finance — ${reportTitles[type]} ${periodo}.pdf`);
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATÓRIO COMPLETO 11 PÁGINAS — 1º Tri 2026
// ─────────────────────────────────────────────────────────────────────────────

function rgb2(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}
function fill2(d: jsPDF, h: string) { d.setFillColor(...rgb2(h)); }
function stroke2(d: jsPDF, h: string) { d.setDrawColor(...rgb2(h)); }
function color2(d: jsPDF, h: string) { d.setTextColor(...rgb2(h)); }

const N = "#040c1c", B = "#1e40af", LB = "#3b82f6", GD = "#92400e";
const GR = "#065f46", RD = "#991b1b", GY = "#64748b", LG = "#f1f5f9", WH = "#ffffff";
const LG2 = "#eff6ff", LG3 = "#f0fdf4";

function pageH(d: jsPDF) {
  fill2(d, N); d.rect(0,0,210,15,"F");
  color2(d, "#93c5fd"); d.setFontSize(7); d.setFont("helvetica","normal");
  d.text("DT Finance — Relatório Financeiro Gerencial",12,10);
  d.text("Empresa Confidencial | 1º Trimestre 2026",198,10,{align:"right"});
}
function pageF(d: jsPDF, n: number) {
  fill2(d, LG); d.rect(0,284,210,13,"F");
  color2(d, GY); d.setFontSize(6.5); d.setFont("helvetica","normal");
  d.text("DT Finance | Relatório Financeiro Gerencial | Dados Protegidos por LGPD",105,290,{align:"center"});
  d.text(`Página ${n}`,198,290,{align:"right"});
}
function secT(d: jsPDF, t: string, y: number): number {
  fill2(d, B); d.rect(12,y,3,7,"F");
  color2(d, N); d.setFontSize(12); d.setFont("helvetica","bold");
  d.text(t, 18, y+5.5); return y+14;
}
function card(d: jsPDF, x: number, y: number, w: number, label: string, val: string, sub: string, col: string) {
  fill2(d, LG); d.roundedRect(x,y,w,24,2,2,"F");
  fill2(d, col); d.roundedRect(x,y,3,24,1,1,"F");
  color2(d, GY); d.setFontSize(7); d.setFont("helvetica","normal"); d.text(label,x+6,y+7);
  color2(d, N); d.setFontSize(11); d.setFont("helvetica","bold"); d.text(val,x+6,y+15);
  color2(d, GY); d.setFontSize(6.5); d.setFont("helvetica","normal"); d.text(sub,x+6,y+21);
}
function grpBar(d: jsPDF, x: number, y: number, w: number, h: number, groups: {lbl:string;a:number;b:number;c?:number}[], cols: string[], maxV?: number) {
  const max = maxV ?? Math.max(...groups.flatMap(g=>[g.a,g.b,g.c??0]));
  const nc = cols.length;
  const gW = (w-8)/groups.length;
  const bW = Math.min((gW-4)/nc-1, 9);
  groups.forEach((g,i) => {
    const gx = x+4+i*gW+(gW-nc*(bW+1))/2;
    const vals = [g.a,g.b,...(g.c!==undefined?[g.c]:[])];
    vals.forEach((v,j) => {
      const bh = (v/max)*h; fill2(d, cols[j]);
      d.rect(gx+j*(bW+1),y+h-bh,bW,bh,"F");
    });
    color2(d, GY); d.setFontSize(6); d.setFont("helvetica","normal");
    d.text(g.lbl,x+4+i*gW+gW/2,y+h+5,{align:"center"});
  });
}
function hBar(d: jsPDF, x: number, y: number, tw: number, lbl: string, pct: number, col: string) {
  fill2(d, LG); d.rect(x,y,tw,5,"F");
  fill2(d, col); d.rect(x,y,(tw*pct)/100,5,"F");
  color2(d, N); d.setFontSize(7.5); d.setFont("helvetica","normal");
  d.text(lbl,x-2,y+4,{align:"right"});
  color2(d, GY); d.text(`${pct}%`,x+tw+2,y+4);
}

export async function gerarRelatorioQ1() {
  // ── Carregar logo ──────────────────────────────────────────────────────────
  let logoB64: string | null = null;
  try {
    const resp = await fetch("/logo-dt-v2.png");
    const blob = await resp.blob();
    logoB64 = await new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onloadend = () => res(reader.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });
  } catch { /* logo opcional */ }

  const doc = new jsPDF("p","mm","a4");

  // ──────────────────────────────────────────────────────────────────────────
  // P1 — CAPA
  // ──────────────────────────────────────────────────────────────────────────
  fill2(doc, N); doc.rect(0,0,210,297,"F");
  fill2(doc, LB); doc.rect(0,92,5,66,"F");
  if (logoB64) doc.addImage(logoB64,"PNG",80,38,50,18);
  color2(doc,"#93c5fd"); doc.setFontSize(8.5); doc.setFont("helvetica","normal");
  doc.text("DT FINANCE  |  CFO AS A SERVICE",105,68,{align:"center"});
  color2(doc,WH); doc.setFontSize(28); doc.setFont("helvetica","bold");
  doc.text("Relatório Financeiro",105,108,{align:"center"});
  doc.text("Gerencial",105,121,{align:"center"});
  fill2(doc,LB); doc.rect(58,128,94,0.8,"F");
  color2(doc,"#93c5fd"); doc.setFontSize(13); doc.setFont("helvetica","normal");
  doc.text("Modelo Demonstrativo",105,138,{align:"center"});
  color2(doc,"#475569"); doc.setFontSize(8.5);
  doc.text("1º Trimestre de 2026  ·  Janeiro · Fevereiro · Março",105,147,{align:"center"});
  fill2(doc,"#0f172a"); doc.roundedRect(40,165,130,54,3,3,"F");
  [{l:"Empresa",v:"Empresa Confidencial"},{l:"CNPJ",v:"XX.XXX.XXX/0001-XX"},{l:"Período",v:"Jan – Mar 2026"},{l:"Faturamento aprox.",v:"R$ 9.000.000 / ano"},{l:"Elaborado por",v:"DT Finance"}]
    .forEach((r,i)=>{
      color2(doc,"#64748b"); doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.text(r.l,68,179+i*9);
      color2(doc,WH); doc.setFont("helvetica","bold"); doc.text(r.v,120,179+i*9);
    });
  color2(doc,"#334155"); doc.setFontSize(6.5); doc.setFont("helvetica","normal");
  doc.text("Dados anonimizados para fins demonstrativos",105,280,{align:"center"});
  doc.text("© 2026 DT Finance. Todos os direitos reservados.",105,287,{align:"center"});

  // ──────────────────────────────────────────────────────────────────────────
  // P2 — RESUMO EXECUTIVO
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); let y=24; y=secT(doc,"Resumo Executivo",y);

  // Bloco de números principais
  fill2(doc,"#0f172a"); doc.roundedRect(12,y,186,22,2,2,"F");
  const resKpis=[
    {l:"Receita Total 1º Tri",v:"R$ 2.247.832"},{l:"Lucro Líquido 1º Tri",v:"R$ 271.394"},
    {l:"Margem Líquida",v:"13,1%"},{l:"Crescimento t/t",v:"+10,3%"},{l:"Crescimento a/a",v:"+18,9%"},
  ];
  resKpis.forEach((k,i)=>{
    const kx=14+i*37;
    color2(doc,"#64748b"); doc.setFontSize(6); doc.setFont("helvetica","normal"); doc.text(k.l,kx,y+8);
    color2(doc,WH); doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.text(k.v,kx,y+17);
  });
  y+=28;

  // 3 pontos positivos
  fill2(doc,"#f0fdf4"); doc.roundedRect(12,y,186,58,2,2,"F");
  fill2(doc,GR); doc.rect(12,y,3,58,"F");
  color2(doc,GR); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text("PONTOS POSITIVOS",18,y+9);
  const pos3=[
    {t:"Crescimento consistente de receita:", d:"Expansão de 7,6% de janeiro a março (+R$ 54.832 no período). Tendência de aceleração indica viabilidade de superar R$ 800K/mês no 2º Tri/26."},
    {t:"Fluxo de caixa positivo nos próximos 90 dias:", d:"Projeção de +R$ 319K (Abr–Jun/26): entradas de R$ 2.340K, saídas de R$ 2.021K. Sem evento extraordinário previsto, a empresa não necessita de captação externa no semestre."},
    {t:"Margem 1,1pp acima do mesmo periodo do ano anterior:", d:"13,1% no 1T26 vs 12,0% no 1T25. A diferenca vem de ticket medio mais alto, nao de reducao de custos: de janeiro a marco, custos subiram 11,6% enquanto receita subiu 7,6%. O crescimento ainda nao se converte em eficiencia."},
  ];
  pos3.forEach((p,i)=>{
    color2(doc,"#14532d"); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(`${i+1}. ${p.t}`,18,y+18+i*14);
    color2(doc,"#1e293b"); doc.setFont("helvetica","normal"); doc.setFontSize(7);
    doc.splitTextToSize(p.d,172).forEach((l:string,li:number)=>doc.text(l,18,y+24+i*14+li*4));
  });
  y+=64;

  // 3 pontos de atenção
  fill2(doc,"#fff7ed"); doc.roundedRect(12,y,186,58,2,2,"F");
  fill2(doc,GD); doc.rect(12,y,3,58,"F");
  color2(doc,GD); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text("PONTOS DE ATENÇÃO",18,y+9);
  const atc3=[
    {t:"Gap orçamentário recorrente:", d:"Os três meses ficaram abaixo da meta de R$ 800K (Jan: -R$ 77,6K · Fev: -R$ 51,8K · Mar: -R$ 22,7K). Embora decrescente, o desvio acumulado no trimestre é -R$ 152,2K (-6,3%)."},
    {t:"Concentração de clientes — risco real e imediato:", d:"Cliente A representa 25,3% da receita trimestral (R$ 568.702). Os 3 maiores somam 55,8% (R$ 1.254.291). Perder Cliente A elimina R$ 189K/mês de receita — equivale a zerar o lucro do trimestre inteiro."},
    {t:"Custos crescendo na mesma proporção da receita:", d:"Custos operacionais passaram de R$ 381K (jan) para R$ 425K (mar) — crescimento de 11,6% no período, próximo ao crescimento de receita (7,6%). Não há ainda ganho de escala significativo."},
  ];
  atc3.forEach((p,i)=>{
    color2(doc,"#92400e"); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(`${i+1}. ${p.t}`,18,y+18+i*14);
    color2(doc,"#1e293b"); doc.setFont("helvetica","normal"); doc.setFontSize(7);
    doc.splitTextToSize(p.d,172).forEach((l:string,li:number)=>doc.text(l,18,y+24+i*14+li*4));
  });
  y+=64;
  pageF(doc,2);

  // ──────────────────────────────────────────────────────────────────────────
  // P3 — KPIs DO TRIMESTRE
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"KPIs do Trimestre",y);
  const kpis2=[
    {l:"Receita Bruta",v:"R$ 2.247.832",s:"Jan + Fev + Mar 2026",c:LB},
    {l:"Receita Líquida",v:"R$ 2.064.105",s:"após deduções (8,2%)",c:"#0891b2"},
    {l:"Lucro Líquido",v:"R$ 271.394",s:"R$88,7K · R$91K · R$91,6K",c:GR},
    {l:"Margem Líquida",v:"13,1%",s:"+1,1 pp vs 1T25 (12,0%)",c:"#15803d"},
    {l:"Crescimento t/t",v:"+10,3%",s:"vs 4º Tri/2025 (R$ 2.038,5K)",c:B},
    {l:"Crescimento a/a",v:"+18,9%",s:"vs 1º Tri/2025 (R$ 1.891,2K)",c:"#1d4ed8"},
    {l:"Ticket Médio Mensal",v:"R$ 749.277",s:"média dos 3 meses realizados",c:GD},
    {l:"Forecast Anual 2026",v:"R$ 9,26M",s:"base tendência crescente 1º Tri",c:"#78350f"},
  ];
  kpis2.forEach((k,i)=>{
    const col=i%2===0?12:12+93; const row=Math.floor(i/2);
    card(doc,col,y+row*29,89,k.l,k.v,k.s,k.c);
  });
  y+=4*29+10;
  // Tabela resumo DRE compacta
  fill2(doc,"#0f172a"); doc.roundedRect(12,y,186,8,1,1,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  [["Linha",14],["Janeiro/26",72],["Fevereiro/26",107],["Março/26",142],["Total 1º Tri",177]].forEach(([h,x])=>doc.text(h as string,x as number,y+5.5));
  y+=9;
  [["Receita Bruta","722.419","748.162","777.251","2.247.832",false,false],
   ["(-) Deduções","(59.794)","(61.053)","(62.880)","(183.727)",true,false],
   ["(=) Rec. Líquida","662.625","687.109","714.371","2.064.105",false,true],
   ["(-) Custos","(381.240)","(403.817)","(425.412)","(1.210.469)",true,false],
   ["(-) Despesas","(192.664)","(192.249)","(197.329)","(582.242)",true,false],
   ["(=) Lucro Líquido","88.721","91.043","91.630","271.394",false,true],
  ].forEach((row,ri)=>{
    const isHL=row[6] as boolean; const isNeg=row[5] as boolean;
    if(isHL){fill2(doc,"#e0f2fe");}else if(ri%2===0){fill2(doc,LG);}else{doc.setFillColor(255,255,255);}
    doc.rect(12,y,186,7,"F");
    color2(doc,isHL?(isNeg?"#b91c1c":GR):isNeg?"#b91c1c":N);
    doc.setFontSize(7.5); doc.setFont("helvetica",isHL?"bold":"normal");
    doc.text(row[0] as string,14,y+5);
    [1,2,3,4].forEach(ci=>{
      const v=row[ci] as string; const neg=v.startsWith("(");
      color2(doc,neg?"#b91c1c":isHL?GR:N);
      doc.text(`R$ ${v}`,[72,107,142,177][ci-1]+18,y+5,{align:"center"});
    });
    y+=7;
  });
  // Margem
  fill2(doc,"#f0fdf4"); doc.rect(12,y,186,7,"F");
  color2(doc,GR); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text("Margem Liquida",14,y+5);
  ["13,4%","13,2%","12,8%","13,1%"].forEach((v,vi)=>{doc.text(v,[72,107,142,177][vi]+18,y+5,{align:"center"});});
  y+=7;
  pageF(doc,3);

  // ──────────────────────────────────────────────────────────────────────────
  // P4 — DRE MÊS A MÊS COMPLETO
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"DRE Gerencial — Mês a Mês (1º Trimestre 2026)",y);
  fill2(doc,N); doc.rect(12,y,186,8,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  [["Descrição",14],["Janeiro/26",76],["Fevereiro/26",111],["Março/26",146],["Total 1º Tri",181]].forEach(([h,x])=>doc.text(h as string,x as number,y+5.5));
  y+=9;
  const dreRows=[
    {l:"Receita Bruta de Vendas",j:722419,f:748162,m:777251,tot:2247832,bold:false,neg:false,hi:false},
    {l:"(-) Impostos / Deduções",j:-59794,f:-61053,m:-62880,tot:-183727,bold:false,neg:true,hi:false},
    {l:"(=) Receita Líquida",j:662625,f:687109,m:714371,tot:2064105,bold:true,neg:false,hi:true},
    {l:"(-) Custos dos Serviços",j:-381240,f:-403817,m:-425412,tot:-1210469,bold:false,neg:true,hi:false},
    {l:"(=) Lucro Bruto",j:281385,f:283292,m:288959,tot:853636,bold:true,neg:false,hi:true},
    {l:"(-) Despesas Operacionais",j:-192664,f:-192249,m:-197329,tot:-582242,bold:false,neg:true,hi:false},
    {l:"   Folha e Encargos",j:-105965,f:-105737,m:-108530,tot:-320232,bold:false,neg:true,hi:false},
    {l:"   Serviços de Terceiros",j:-60519,f:-60522,m:-62016,tot:-183057,bold:false,neg:true,hi:false},
    {l:"   Estrutura e Outros",j:-26180,f:-25990,m:-26783,tot:-78953,bold:false,neg:true,hi:false},
    {l:"(=) Lucro Líquido",j:88721,f:91043,m:91630,tot:271394,bold:true,neg:false,hi:false},
  ];
  const fV=(n:number)=>{const abs=Math.abs(n);const v=abs>=1000?`${(abs/1000).toFixed(0)}K`:`${abs}`;return n<0?`(${v})`:v;};
  dreRows.forEach((row,ri)=>{
    const isLL=row.l.includes("Lucro Líquido");
    if(isLL){fill2(doc,"#dcfce7");}else if(row.hi){fill2(doc,"#e0f2fe");}else if(ri%2===0){fill2(doc,LG);}else{doc.setFillColor(255,255,255);}
    doc.rect(12,y,186,7,"F");
    color2(doc,isLL?GR:row.neg?"#b91c1c":row.bold?N:"#334155");
    doc.setFontSize(7); doc.setFont("helvetica",row.bold?"bold":"normal");
    doc.text(row.l,14,y+5);
    [row.j,row.f,row.m,row.tot].forEach((v,vi)=>{
      color2(doc,v<0?"#b91c1c":isLL?GR:row.bold?N:"#334155");
      doc.text(`R$ ${fV(v)}`,[76,111,146,181][vi]+18,y+5,{align:"center"});
    });
    y+=7;
  });
  // Linha margem líquida
  fill2(doc,"#f0fdf4"); doc.rect(12,y,186,7,"F");
  color2(doc,GR); doc.setFontSize(7); doc.setFont("helvetica","bold"); doc.text("Margem Liquida",14,y+5);
  ["13,4%","13,2%","12,8%","13,1%"].forEach((v,vi)=>{
    doc.text(v,[76,111,146,181][vi]+18,y+5,{align:"center"});
  });
  y+=12;
  // Gráfico de barras receita vs lucro
  color2(doc,N); doc.setFontSize(8); doc.setFont("helvetica","bold");
  doc.text("Receita Bruta vs. Lucro Líquido — R$ mil",12,y); y+=8;
  grpBar(doc,12,y,186,52,[{lbl:"Janeiro",a:722,b:89},{lbl:"Fevereiro",a:748,b:91},{lbl:"Março",a:777,b:92}],[LB,GR],900);
  [{l:"■  Receita Bruta",c:LB},{l:"■  Lucro Líquido",c:GR}].forEach((leg,i)=>{
    color2(doc,leg.c); doc.setFontSize(6.5); doc.setFont("helvetica","normal"); doc.text(leg.l,62+i*44,y+61);
  });
  pageF(doc,4);

  // ──────────────────────────────────────────────────────────────────────────
  // P5 — COMPARATIVO TRIMESTRAL
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Comparativo Trimestral — 1T26 vs 4T25 vs 1T25",y);
  const comps=[
    {l:"1T26 (atual)",lc:271394,rc:2247832,c:LB,highlight:true},
    {l:"4T25 (trim. anterior)",lc:248400,rc:2038500,c:"#94a3b8",highlight:false},
    {l:"1T25 (mesmo trim. a/a)",lc:207900,rc:1891200,c:"#cbd5e1",highlight:false},
  ];
  comps.forEach((c,i)=>{
    const cx=12+i*63;
    fill2(doc,i===0?LG2:LG); doc.roundedRect(cx,y,59,58,2,2,"F");
    if(i===0){fill2(doc,LB);doc.rect(cx,y,59,3,"F");}
    color2(doc,i===0?B:GY); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
    doc.text(c.l,cx+29.5,y+10,{align:"center"});
    color2(doc,i===0?B:GY); doc.setFontSize(13); doc.text(`R$ ${(c.lc/1000).toFixed(1)}K`,cx+29.5,y+23,{align:"center"});
    color2(doc,GY); doc.setFontSize(7); doc.setFont("helvetica","normal");
    doc.text("Lucro Líquido",cx+29.5,y+30,{align:"center"});
    stroke2(doc,"#e2e8f0"); doc.setLineWidth(0.1); doc.line(cx+6,y+34,cx+53,y+34);
    doc.text(`Receita: R$ ${(c.rc/1000).toFixed(1)}K`,cx+29.5,y+41,{align:"center"});
    const mg=((c.lc/(c.rc*0.918))*100).toFixed(1);
    doc.text(`Margem: ${mg}%`,cx+29.5,y+48,{align:"center"});
  });
  y+=65;
  // Variações calculadas
  const vLtt=(((271394-248400)/248400)*100).toFixed(1);
  const vLaa=(((271394-207900)/207900)*100).toFixed(1);
  const vRtt=(((2247832-2038500)/2038500)*100).toFixed(1);
  const vRaa=(((2247832-1891200)/1891200)*100).toFixed(1);
  fill2(doc,LG2); doc.roundedRect(12,y,186,14,2,2,"F");
  color2(doc,B); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  doc.text(`▲ Lucro t/t: +${vLtt}%   ·   ▲ Lucro a/a: +${vLaa}%`,105,y+6,{align:"center"});
  color2(doc,GY); doc.setFont("helvetica","normal"); doc.setFontSize(7);
  doc.text(`▲ Receita t/t: +${vRtt}%   ·   ▲ Receita a/a: +${vRaa}%`,105,y+11,{align:"center"});
  y+=20;
  // Tabela comparativa
  fill2(doc,N); doc.rect(12,y,186,8,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  [["Indicador",14],["1T26",100],["4T25",130],["1T25",160],["Var. a/a",185]].forEach(([h,x])=>doc.text(h as string, x as number,y+5.5));
  y+=9;
  [["Receita Bruta","R$ 2.247.832","R$ 2.038.500","R$ 1.891.200",`+${vRaa}%`],
   ["Lucro Líquido","R$ 271.394","R$ 248.400","R$ 207.900",`+${vLaa}%`],
   ["Margem Líquida","13,1%","13,2%","12,0%","+1,1 pp"],
  ].forEach((row,ri)=>{
    fill2(doc,ri%2===0?LG:WH); doc.rect(12,y,186,8,"F");
    color2(doc,N); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(row[0],14,y+5.5);
    [row[1],row[2],row[3]].forEach((v,vi)=>{ color2(doc,vi===0?B:GY); doc.setFont("helvetica",vi===0?"bold":"normal"); doc.text(v,[100,130,160][vi],y+5.5); });
    color2(doc,GR); doc.text(row[4],185,y+5.5,{align:"right"});
    y+=8;
  });
  y+=10;
  color2(doc,N); doc.setFontSize(8); doc.setFont("helvetica","bold");
  doc.text("Evolução — Receita Bruta e Lucro Líquido (R$ mil)",12,y); y+=8;
  grpBar(doc,12,y,186,55,[{lbl:"1T25",a:1891,b:208},{lbl:"4T25",a:2038,b:248},{lbl:"1T26",a:2248,b:271}],[LB,GR],2500);
  [{l:"■  Receita Bruta",c:LB},{l:"■  Lucro Líquido",c:GR}].forEach((leg,i)=>{
    color2(doc,leg.c); doc.setFontSize(6.5); doc.setFont("helvetica","normal"); doc.text(leg.l,62+i*44,y+63);
  });
  pageF(doc,5);

  // ──────────────────────────────────────────────────────────────────────────
  // P6 — RECEITA POR CLIENTE
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Receita por Cliente — 1º Trimestre 2026",y);
  // Valores: 25.3% · 18.1% · 12.4% · 44.2% de R$ 2.247.832
  const clts=[
    {n:"Cliente A",p:25.3,v:568702,c:LB},
    {n:"Cliente B",p:18.1,v:406858,c:GR},
    {n:"Cliente C",p:12.4,v:278731,c:GD},
    {n:"Outros (carteira diversificada)",p:44.2,v:993541,c:"#94a3b8"},
  ];
  clts.forEach((c,i)=>{ hBar(doc,60,y+i*17,110,c.n,c.p,c.c); });
  y+=clts.length*17+6;
  // Tabela de valores
  fill2(doc,N); doc.rect(12,y,186,8,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  [["Cliente",14],["Participação",100],["Receita 1º Tri",145],["Risco",178]].forEach(([h,x])=>doc.text(h as string,x as number,y+5.5));
  y+=9;
  clts.forEach((c,i)=>{
    fill2(doc,i%2===0?LG:WH); doc.rect(12,y,186,7,"F");
    color2(doc,N); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(c.n,14,y+5);
    color2(doc,c.p>20?"#b91c1c":c.p>15?"#d97706":GR); doc.text(`${c.p}%`,100,y+5);
    color2(doc,N); doc.setFont("helvetica","normal"); doc.text(`R$ ${c.v.toLocaleString("pt-BR")}`,145,y+5);
    const isOthers=c.n.startsWith("Outros");
    const risk=isOthers?"BAIXO":c.p>25?"ALTO":c.p>18?"MEDIO":c.p>12?"BAIXO":"OK";
    const rc=isOthers?GR:c.p>25?"#b91c1c":c.p>18?"#d97706":GR;
    color2(doc,rc); doc.text(risk,178,y+5);
    y+=7;
  });
  y+=10;
  // Análise
  fill2(doc,"#fff7ed"); doc.roundedRect(12,y,186,40,2,2,"F");
  fill2(doc,GD); doc.rect(12,y,3,40,"F");
  color2(doc,GD); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text("Análise de Concentração e Risco",18,y+9);
  color2(doc,"#78350f"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  ["• Concentração dos 3 maiores clientes: 55,8% da receita trimestral (R$ 1.254K).",
   "• Cliente A em 25,3% (R$ 568.702): saída desse cliente elimina R$ 189.567/mês — equivale a zerar o lucro líquido do trimestre.",
   "• Recomendação: reduzir participação de Cliente A para <20% nos próximos 12 meses via crescimento de outros clientes.",
   "• Ação prática: prospectar 3 novos clientes na faixa R$ 80–150K/mês — sem cancelamentos, concentração cai para <20%.",
  ].forEach((l,i)=>doc.text(l,18,y+17+i*5.5));
  pageF(doc,6);

  // ──────────────────────────────────────────────────────────────────────────
  // P7 — COMPOSIÇÃO DE DESPESAS
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Composição de Despesas Operacionais",y);
  const desps=[
    {l:"Folha de Pagamento e Encargos",p:35,v:"R$ 106K / mês (média)",c:LB,
     nota:"Principal componente. Crescimento de 2,4% no trimestre. Monitorar admissões e horas extras."},
    {l:"Serviços de Terceiros",p:20,v:"R$ 61K / mês (média)",c:GR,
     nota:"Consultores, tecnologia e contratações pontuais. Avaliar renovações de contrato no 2º Tri/26."},
    {l:"Estrutura e Ocupação",p:15,v:"R$ 26K / mês (média)",c:"#0891b2",
     nota:"Aluguel, utilities e manutenção. Custo estável — sem variação relevante no trimestre."},
    {l:"Marketing e Comercial",p:10,v:"R$ 19K / mês (média)",c:GD,
     nota:"Abaixo do mínimo recomendado para o segmento (12-15%). Oportunidade de investir mais."},
    {l:"Outros / Variáveis",p:20,v:"R$ 19K / mês (média)",c:"#94a3b8",
     nota:"Viagens, eventos, materiais. Categoria com maior variabilidade — requer controle detalhado."},
  ];
  desps.forEach((d,i)=>{ hBar(doc,68,y+i*17,102,d.l,d.p,d.c); });
  y+=desps.length*17+6;
  // Gráfico de barras verticais
  color2(doc,N); doc.setFontSize(8); doc.setFont("helvetica","bold");
  doc.text("Distribuição Percentual das Despesas",12,y); y+=8;
  const maxBV=50; const bW2=(176-8)/desps.length-3;
  desps.forEach((b,i)=>{
    const bx=12+4+i*(bW2+4); const bh=(b.p/maxBV)*44;
    fill2(doc,b.c); doc.rect(bx,y+44-bh,bW2,bh,"F");
    color2(doc,GY); doc.setFontSize(5.5);
    const firstWord=b.l.split(" ")[0];
    doc.text(`${firstWord} ${b.p}%`,bx+bW2/2,y+52,{align:"center"});
  });
  y+=60;
  // Análise por categoria
  fill2(doc,LG); doc.roundedRect(12,y,186,30,2,2,"F");
  fill2(doc,B); doc.rect(12,y,3,30,"F");
  color2(doc,B); doc.setFontSize(8); doc.setFont("helvetica","bold"); doc.text("Diagnóstico de Despesas",18,y+8);
  color2(doc,"#1e293b"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  ["• Folha (35%) é o maior custo — saudável para empresa de serviços, mas exige controle de headcount.",
   "• Marketing em apenas 10% abaixo do ideal para crescimento — aumentar para 12-15% pode acelerar receita.",
   "• 'Outros' em 20% merece detalhamento — categorias vagas dificultam a gestão eficiente.",
  ].forEach((l,i)=>doc.text(l,18,y+16+i*5));
  pageF(doc,7);

  // ──────────────────────────────────────────────────────────────────────────
  // P8 — ORÇADO VS REALIZADO
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Orçado vs. Realizado — 1º Trimestre 2026",y);
  fill2(doc,N); doc.rect(12,y,186,8,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  [["Mês",14],["Orçado",58],["Realizado",98],["Diferença R$",135],["Diferença %",168]].forEach(([h,x])=>doc.text(h as string,x as number,y+5.5));
  y+=9;
  const orcs=[
    {m:"Janeiro/26",o:800000,r:722419,nota:"Mês inicial com sazonalidade típica de 1º Tri. Carteira ainda em reativação pós-férias."},
    {m:"Fevereiro/26",o:800000,r:748162,nota:"Recuperação de 3,6% vs jan. Desvio reduzindo — indicação positiva de tendência."},
    {m:"Março/26",o:800000,r:777251,nota:"Melhor mês do trimestre. Gap de apenas R$ 22,7K — dentro da margem de flutuação normal."},
  ];
  orcs.forEach((row,ri)=>{
    fill2(doc,ri%2===0?LG:WH); doc.rect(12,y,186,7,"F");
    const dif=row.r-row.o; const pct=(dif/row.o)*100;
    color2(doc,N); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(row.m,14,y+5);
    color2(doc,GY); doc.setFont("helvetica","normal"); doc.text(`R$ ${(row.o/1000).toFixed(0)}K`,58,y+5);
    color2(doc,pct<0?"#b91c1c":GR); doc.text(`R$ ${(row.r/1000).toFixed(0)}K`,98,y+5);
    color2(doc,"#b91c1c"); doc.text(`R$ ${(Math.abs(dif)/1000).toFixed(1)}K abaixo`,135,y+5);
    doc.text(`${pct.toFixed(1)}%`,170,y+5);
    y+=7;
  });
  // Total trimestre
  fill2(doc,"#0f172a"); doc.rect(12,y,186,8,"F");
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  doc.text("Total 1º Tri/2026",14,y+5.5);
  color2(doc,"#93c5fd"); doc.text("R$ 2.400.000",58,y+5.5);
  color2(doc,WH); doc.text("R$ 2.247.832",98,y+5.5);
  color2(doc,"#fca5a5"); doc.text("R$ 152.168 abaixo",135,y+5.5);
  doc.text("-6,3%",170,y+5.5);
  y+=14;
  // Análise do desvio
  fill2(doc,"#eff6ff"); doc.roundedRect(12,y,186,42,2,2,"F");
  fill2(doc,LB); doc.rect(12,y,3,42,"F");
  color2(doc,B); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text("Análise do Desvio Orçamentário",18,y+9);
  color2(doc,"#1e293b"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  ["• O gap de -6,3% no trimestre é decrescente mês a mês: -9,7% (jan) → -6,5% (fev) → -2,8% (mar).",
   "  Tendência positiva — a empresa está se aproximando da meta.",
   "• O desvio não é fruto de problema estrutural, mas de ramp-up comercial mais lento no 1º Tri/26.",
   "• Meta de R$ 800K/mês foi definida sem considerar a sazonalidade de janeiro — revisão recomendada.",
   "• Recomendação: manter meta de R$ 800K mas ajustar orçamento de 1º Tri/27 para R$ 740–760K em janeiro.",
   "• Forecast para 2º Tri/26: projeção de R$ 790K–810K/mês, convergindo para a meta.",
  ].forEach((l,i)=>doc.text(l,18,y+17+i*4.5));
  y+=50;
  // Barras comparativas orçado vs realizado
  color2(doc,N); doc.setFontSize(8); doc.setFont("helvetica","bold");
  doc.text("Orçado vs. Realizado — Visualização Mensal (R$ mil)",12,y); y+=8;
  grpBar(doc,12,y,186,48,[{lbl:"Janeiro",a:800,b:722},{lbl:"Fevereiro",a:800,b:748},{lbl:"Março",a:800,b:777}],["#94a3b8",LB],900);
  [{l:"■  Orçado",c:"#94a3b8"},{l:"■  Realizado",c:LB}].forEach((leg,i)=>{
    color2(doc,leg.c); doc.setFontSize(6.5); doc.setFont("helvetica","normal"); doc.text(leg.l,62+i*44,y+56);
  });
  pageF(doc,8);

  // ──────────────────────────────────────────────────────────────────────────
  // P9 — FLUXO DE CAIXA + FORECAST 90 DIAS
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Fluxo de Caixa + Forecast — 90 Dias (Abr–Jun 2026)",y);
  const fl=[{mes:"Abril/26",e:763,s:659,r:104},{mes:"Maio/26",e:778,s:672,r:106},{mes:"Junho/26",e:799,s:690,r:109}];
  // Cards mensais
  fl.forEach((f,i)=>{
    const fx=12+i*63;
    fill2(doc,LG); doc.roundedRect(fx,y,59,60,2,2,"F");
    fill2(doc,B); doc.rect(fx,y,59,5,"F");
    color2(doc,WH); doc.setFontSize(8); doc.setFont("helvetica","bold");
    doc.text(f.mes,fx+29.5,y+9,{align:"center"});
    [{l:"Entradas",v:f.e,c:B},{l:"Saídas",v:f.s,c:RD},{l:"Resultado",v:f.r,c:GR}].forEach((r,ri)=>{
      color2(doc,GY); doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.text(r.l,fx+7,y+20+ri*14);
      color2(doc,r.c); doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.text(`R$ ${r.v}K`,fx+7,y+27+ri*14);
    });
  });
  y+=68;
  // Consolidado
  fill2(doc,"#1e3a5f"); doc.roundedRect(12,y,186,18,2,2,"F");
  color2(doc,WH); doc.setFontSize(8.5); doc.setFont("helvetica","bold");
  doc.text("CONSOLIDADO 90 DIAS",105,y+7,{align:"center"});
  doc.setFontSize(8); doc.setFont("helvetica","normal");
  [{l:"Entradas Totais:",v:"R$ 2.340K",c:"#93c5fd"},{l:"Saídas Totais:",v:"R$ 2.021K",c:"#fca5a5"},{l:"Resultado:",v:"+R$ 319K",c:"#86efac"}].forEach((s,i)=>{
    color2(doc,s.c); doc.text(`${s.l} ${s.v}`,20+i*63,y+14);
  });
  y+=24;
  // Premissas
  fill2(doc,"#f0fdf4"); doc.roundedRect(12,y,186,38,2,2,"F");
  fill2(doc,GR); doc.rect(12,y,3,38,"F");
  color2(doc,GR); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text("Premissas do Forecast",18,y+9);
  color2(doc,"#1e293b"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  ["• Entradas: crescimento mensal de +2,1% sobre a média de março/26 (R$ 777K), com prazo médio de recebimento de 18 dias.",
   "• Saídas: folha estável, reajuste de 1,5% a.m. em serviços variáveis, sem investimentos extraordinários previstos.",
   "• Cenário conservador: não inclui novos contratos ou inadimplência acima de 3%.",
   "• Resultado positivo em todos os 3 meses confirma solvência operacional para o semestre.",
  ].forEach((l,i)=>doc.text(l,18,y+17+i*5));
  y+=44;
  // Gráfico entradas vs saídas
  color2(doc,N); doc.setFontSize(8); doc.setFont("helvetica","bold");
  doc.text("Entradas vs. Saídas Projetadas (R$ mil)",12,y); y+=8;
  grpBar(doc,12,y,186,46,fl.map(f=>({lbl:f.mes.split("/")[0],a:f.e,b:f.s})),[LB,"#ef4444"],900);
  [{l:"■  Entradas",c:LB},{l:"■  Saídas",c:"#ef4444"}].forEach((leg,i)=>{
    color2(doc,leg.c); doc.setFontSize(6.5); doc.setFont("helvetica","normal"); doc.text(leg.l,62+i*44,y+54);
  });
  pageF(doc,9);

  // ──────────────────────────────────────────────────────────────────────────
  // P10 — DIAGNÓSTICO EXECUTIVO
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Diagnóstico Executivo",y);
  const diag=[
    {t:"Pontos Positivos",c:GR,bg:LG3,items:[
      "Receita crescendo 7,6% no trimestre (Jan R$722K → Mar R$777K): ritmo consistente, não pontual — base para atingir R$800K em abril.",
      "Lucro líquido estável: R$88,7K (jan) · R$91K (fev) · R$91,6K (mar). Empresa gera caixa operacional mês a mês sem surpresas.",
      "Gap orçamentário fechando mês a mês: -9,7% (jan) → -6,5% (fev) → -2,8% (mar). Se tendência continuar, meta é atingível em maio.",
      "Caixa projetado positivo em todos os meses de 2º Tri/26 (+R$319K acumulado). Não há necessidade de captação no curto prazo.",
    ]},
    {t:"Pontos de Atenção",c:"#d97706",bg:"#fff7ed",items:[
      "Custo cresceu 11,6% de janeiro a marco, enquanto receita cresceu 7,6% no mesmo periodo. Escala nao reduz custo — margem nao expande.",
      "Meta de R$800K/mês não atingida em nenhum dos 3 meses. Desvio total: -R$152.168 no trimestre. Meta precisa ser calibrada ou comercial precisa acelerar.",
      "Marketing em 10% das despesas: abaixo dos 12-15% típicos do setor. Restrição de investimento comercial em momento de crescimento.",
      "Categoria 'Outros / Variáveis' soma R$19K/mês sem detalhamento: impossível identificar cortes sem transparência por subcategoria.",
    ]},
    {t:"Riscos",c:RD,bg:"#fef2f2",items:[
      "Cliente A em 25,3% (R$568.702 no 1º Tri · R$189.567/mês): saída ou redução elimina mais de 2x o lucro líquido médio mensal.",
      "Top 3 clientes em 55,8% (R$1.254.291): qualquer movimento em qualquer um deles requer resposta comercial imediata.",
      "Custos sem controle por centro de custo: sem visibilidade por área, não é possível saber onde a margem está sendo comprimida.",
      "Sem reserva de capital identificada: crescimento acelerado em 2º Tri/26 pode gerar necessidade de caixa não prevista.",
    ]},
    {t:"Oportunidades",c:B,bg:LG2,items:[
      "Reajuste de 5% em contratos com +12 meses: adiciona R$56K–R$80K na receita anual sem custo incremental — margem sobe direto.",
      "3 novos contratos de R$80–100K/mês: reduz concentração de Cliente A de 25,3% para <20% e adiciona R$3M ao forecast anual.",
      "Linha de capital de giro (CDI+0,8–1,2%): viabiliza investimento em comercial e tecnologia sem comprometer fluxo operacional.",
      "Detalhamento de despesas 'Outros': identificação de R$3–5K/mês em gastos desnecessários equivale a +R$36–60K de margem/ano.",
    ]},
  ];
  diag.forEach(s=>{
    const bH=9+s.items.length*6.5+3;
    if(y+bH>275){doc.addPage();pageH(doc);y=24;}
    fill2(doc,s.bg); doc.roundedRect(12,y,186,bH,2,2,"F");
    fill2(doc,s.c); doc.rect(12,y,3,bH,"F");
    color2(doc,s.c); doc.setFontSize(8.5); doc.setFont("helvetica","bold"); doc.text(s.t,18,y+8);
    color2(doc,"#1e293b"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
    s.items.forEach((item,ii)=>doc.text(`• ${item}`,18,y+15+ii*6.5));
    y+=bH+6;
  });
  // Insight estratégico de alto impacto
  if(y+30>275){doc.addPage();pageH(doc);y=24;}
  fill2(doc,"#1e1b4b"); doc.roundedRect(12,y,186,26,2,2,"F");
  fill2(doc,"#818cf8"); doc.rect(12,y,4,26,"F");
  color2(doc,"#a5b4fc"); doc.setFontSize(7.5); doc.setFont("helvetica","bold");
  doc.text("INSIGHT ESTRATEGICO",18,y+8);
  color2(doc,WH); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  doc.text("A empresa cresce em faturamento, mas ainda nao transforma esse crescimento em ganho de eficiencia.",18,y+14);
  doc.text("De janeiro a marco, cada R$1 de receita nova custou mais do que o anterior para ser gerado.",18,y+19);
  doc.text("Sem ajuste de estrutura de custos, crescimento adicional nao aumenta geracao de valor — apenas aumenta volume.",18,y+24);
  y+=28;
  pageF(doc,(doc as any).internal.getNumberOfPages());

  // ──────────────────────────────────────────────────────────────────────────
  // P11 — PLANO DE AÇÃO 30/60/90 DIAS
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage(); pageH(doc); y=24; y=secT(doc,"Plano de Ação — 30 / 60 / 90 Dias",y);
  const planos=[
    {prazo:"30 DIAS",sub:"Até final de abril/2026",c:RD,bg:"#fef2f2",items:[
      {acao:"Revisar orçamento de 2º Tri/26", det:"Atualizar metas com base real de R$ 750K/mês (jan–mar). Definir meta realista de R$ 790K para abril."},
      {acao:"Mapear despesas 'Outros'", det:"Detalhar a categoria de 20% das despesas por subcategoria para identificar o que pode ser cortado."},
      {acao:"Reunião com Cliente A", det:"Entender perspectiva de contrato e volume para os próximos 6 meses. Avaliar risco de redução/saída."},
      {acao:"Definir alvo de prospecção", det:"Listar 10 prospects na faixa R$ 80–150K/mês para reduzir dependência dos 3 maiores clientes."},
    ]},
    {prazo:"60 DIAS",sub:"Até final de maio/2026",c:GD,bg:"#fff7ed",items:[
      {acao:"Implementar CFO Meeting quinzenal", det:"Reuniões fixas de 45 min com a diretoria para revisão de margem por área e acompanhamento de KPIs."},
      {acao:"Revisar precificação de contratos antigos", det:"Identificar contratos com mais de 12 meses sem reajuste e propor atualização de 5-8%."},
      {acao:"Estruturar plano de marketing", det:"Aumentar investimento em marketing de 10% para 13% do total de despesas — R$ 25K/mês."},
      {acao:"Avaliar linha de crédito capital de giro", det:"Solicitar proposta de 3 bancos para linha rotativa de R$ 300-500K a CDI+0,8-1,2%."},
    ]},
    {prazo:"90 DIAS",sub:"Até final de junho/2026",c:GR,bg:LG3,items:[
      {acao:"Atingir meta de R$ 800K/mês em junho", det:"Com base no pipeline comercial ativo e revisão de preços — foco em fechar pelo menos 1 contrato novo."},
      {acao:"Reduzir 'Cliente A' para <23%", det:"Via crescimento de outros clientes — não cancelamento. Monitorar mensalmente a participação."},
      {acao:"Entregar relatório 2º Tri/2026", det:"Relatório completo com comparativo 1º Tri vs 2º Tri, DRE atualizado e forecast revisado para 2º Sem/26."},
      {acao:"Rever orçamento anual 2026", det:"Com dados reais de 1º Sem/26, recalibrar projeção anual e apresentar cenários conservador / base / otimista."},
    ]},
  ];
  planos.forEach(p=>{
    const lH=9+p.items.length*16+4;
    if(y+lH>275){doc.addPage();pageH(doc);y=24;}
    fill2(doc,p.bg); doc.roundedRect(12,y,186,lH,2,2,"F");
    fill2(doc,p.c); doc.rect(12,y,4,lH,"F");
    color2(doc,p.c); doc.setFontSize(9); doc.setFont("helvetica","bold"); doc.text(p.prazo,20,y+7);
    color2(doc,GY); doc.setFontSize(7); doc.setFont("helvetica","normal"); doc.text(p.sub,20,y+12);
    p.items.forEach((it,ii)=>{
      const iy=y+18+ii*16;
      color2(doc,p.c); doc.setFontSize(7.5); doc.setFont("helvetica","bold"); doc.text(`${ii+1}. ${it.acao}`,20,iy);
      color2(doc,"#1e293b"); doc.setFont("helvetica","normal"); doc.setFontSize(7);
      doc.splitTextToSize(it.det,164).forEach((l:string,li:number)=>doc.text(l,20,iy+5+li*4));
    });
    y+=lH+6;
  });
  pageF(doc,(doc as any).internal.getNumberOfPages());

  // ──────────────────────────────────────────────────────────────────────────
  // P12 — POSICIONAMENTO FINAL
  // ──────────────────────────────────────────────────────────────────────────
  doc.addPage();
  fill2(doc,N); doc.rect(0,0,210,297,"F");
  fill2(doc,LB); doc.rect(0,104,5,62,"F");
  if(logoB64) doc.addImage(logoB64,"PNG",80,36,50,18);
  color2(doc,"#93c5fd"); doc.setFontSize(8.5); doc.setFont("helvetica","normal");
  doc.text("DT FINANCE  |  CFO AS A SERVICE",105,66,{align:"center"});
  color2(doc,WH); doc.setFontSize(22); doc.setFont("helvetica","bold");
  doc.text("Relatório Demonstrativo",105,118,{align:"center"});
  fill2(doc,LB); doc.rect(52,126,106,0.8,"F");
  color2(doc,"#64748b"); doc.setFontSize(8); doc.setFont("helvetica","normal");
  [
    "Este relatório é um modelo demonstrativo, com dados anonimizados,",
    "desenvolvido para ilustrar o nível de análise e acompanhamento",
    "gerencial realizado pela DT Finance.",
    "",
    "A DT Finance entrega relatórios desta natureza todo início de mês,",
    "com inteligência financeira e suporte estratégico contínuo.",
    "",
    "Nosso trabalho transforma dados em decisões executivas.",
  ].forEach((l,i)=>doc.text(l,105,142+i*7.5,{align:"center"}));
  fill2(doc,"#0f172a"); doc.roundedRect(42,224,126,38,3,3,"F");
  color2(doc,"#93c5fd"); doc.setFontSize(11); doc.setFont("helvetica","bold");
  doc.text("Quer isso na sua empresa?",105,237,{align:"center"});
  color2(doc,"#94a3b8"); doc.setFontSize(8); doc.setFont("helvetica","normal");
  doc.text("Entre em contato:",105,246,{align:"center"});
  color2(doc,WH); doc.setFontSize(8.5); doc.setFont("helvetica","bold");
  doc.text("www.dtfinance.com.br",105,254,{align:"center"});
  color2(doc,"#64748b"); doc.setFontSize(7.5); doc.setFont("helvetica","normal");
  doc.text("contato@dtfinance.com.br",105,260,{align:"center"});
  color2(doc,"#1e3a5f"); doc.setFontSize(7);
  doc.text("© 2026 DT Finance. Todos os direitos reservados. Documento Confidencial.",105,280,{align:"center"});

  doc.save("DT-Finance-Relatorio-Gerencial-1º Tri-2026.pdf");
}
