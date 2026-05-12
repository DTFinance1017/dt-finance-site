import { useParams } from "wouter";
import { InternoLayout } from "@/components/interno/InternoLayout";
import { VisaoGeralInterno } from "@/components/interno/VisaoGeralInterno";
import { UploadDocsInterno } from "@/components/interno/UploadDocsInterno";
import { ClassificacaoIA } from "@/components/interno/ClassificacaoIA";
import { ProcessamentoDRE } from "@/components/interno/ProcessamentoDRE";
import { ClientesInterno } from "@/components/interno/ClientesInterno";

const sectionMap: Record<string, string> = {
  upload: "upload",
  classificacao: "classificacao",
  processamento: "processamento",
  clientes: "clientes",
};

export default function Interno() {
  const params = useParams<{ section?: string }>();
  const section = params.section ? (sectionMap[params.section] || "visao-geral") : "visao-geral";

  return (
    <InternoLayout activeSection={section}>
      {section === "visao-geral"   && <VisaoGeralInterno />}
      {section === "upload"        && <UploadDocsInterno />}
      {section === "classificacao" && <ClassificacaoIA />}
      {section === "processamento" && <ProcessamentoDRE />}
      {section === "clientes"      && <ClientesInterno />}
    </InternoLayout>
  );
}
