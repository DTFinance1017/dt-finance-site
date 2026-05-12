import { useParams } from "wouter";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { VisaoGeral } from "@/components/dashboard/VisaoGeral";
import { UploadDocs } from "@/components/dashboard/UploadDocs";
import { Processamento } from "@/components/dashboard/Processamento";
import { KPIs } from "@/components/dashboard/KPIs";
import { Dashboards } from "@/components/dashboard/Dashboards";
import { Relatorios } from "@/components/dashboard/Relatorios";
import { Alertas } from "@/components/dashboard/Alertas";
import { Configuracoes } from "@/components/dashboard/Configuracoes";

const sectionMap: Record<string, string> = {
  "upload": "upload",
  "processamento": "processamento",
  "kpis": "kpis",
  "dashboards": "dashboards",
  "relatorios": "relatorios",
  "alertas": "alertas",
  "configuracoes": "configuracoes",
};

export default function Dashboard() {
  const params = useParams<{ section?: string }>();
  const section = params.section ? (sectionMap[params.section] || "visao-geral") : "visao-geral";

  return (
    <DashboardLayout activeSection={section}>
      {section === "visao-geral" && <VisaoGeral />}
      {section === "upload" && <UploadDocs />}
      {section === "processamento" && <Processamento />}
      {section === "kpis" && <KPIs />}
      {section === "dashboards" && <Dashboards />}
      {section === "relatorios" && <Relatorios />}
      {section === "alertas" && <Alertas />}
      {section === "configuracoes" && <Configuracoes />}
    </DashboardLayout>
  );
}
