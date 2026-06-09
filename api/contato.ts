import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Vercel Serverless Function — POST /api/contato
// Recebe o lead do formulário, salva no Supabase e envia e-mail via Resend.
//
// Variáveis de ambiente esperadas (configurar no Vercel → Settings → Environment Variables):
//   RESEND_API_KEY              (obrigatória)  chave da API do Resend
//   RESEND_FROM                 (opcional)     remetente verificado. Ex.: "DT Finance <contato@dtfinance.com.br>"
//   CONTATO_TO                  (opcional)     destino dos leads. Default: contato@dtfinance.com.br
//   SUPABASE_URL                (opcional)     URL do projeto Supabase
//   SUPABASE_SERVICE_ROLE_KEY   (opcional)     service role key (server-side)
//   SUPABASE_TABLE              (opcional)     tabela de leads. Default: leads

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { nome, email, whatsapp, empresa, faturamento, dor, source } = body;

    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
    }

    const tipo = source === "checklist" ? "Lista de documentos" : "Diagnóstico";
    const TO = process.env.CONTATO_TO || "contato@dtfinance.com.br";

    // 1) Salva no Supabase (se configurado) — não bloqueia o e-mail em caso de erro
    const supaUrl = process.env.SUPABASE_URL;
    const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supaUrl && supaKey) {
      try {
        const supabase = createClient(supaUrl, supaKey);
        const table = process.env.SUPABASE_TABLE || "leads";
        const { error } = await supabase
          .from(table)
          .insert([{ nome, email, whatsapp, empresa, faturamento, dor, source }]);
        if (error) console.error("Supabase insert error:", error.message);
      } catch (e) {
        console.error("Supabase exception:", e);
      }
    }

    // 2) Envia o e-mail via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return res.status(500).json({ error: "RESEND_API_KEY não configurada no servidor." });
    }

    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM || "DT Finance <contato@dtfinance.com.br>";

    const row = (k: string, v: any) =>
      `<tr><td style="padding:6px 12px;color:#5B6470;font-size:13px">${k}</td>` +
      `<td style="padding:6px 12px;color:#0D1F3C;font-size:14px;font-weight:600">${v || "—"}</td></tr>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0D1F3C">Novo lead — ${tipo}</h2>
        <table style="width:100%;border-collapse:collapse;background:#F7F4EE;border-radius:8px;overflow:hidden">
          ${row("Nome", nome)}
          ${row("E-mail", email)}
          ${row("WhatsApp", whatsapp)}
          ${row("Empresa", empresa)}
          ${row("Faturamento", faturamento)}
          ${row("Principal dor", dor)}
          ${row("Origem", source)}
        </table>
        <p style="color:#9aa3ad;font-size:12px;margin-top:16px">Enviado automaticamente pelo site dtfinance.com.br</p>
      </div>`;

    const { error: mailError } = await resend.emails.send({
      from,
      to: [TO],
      replyTo: email,
      subject: `Novo lead (${tipo}) — ${empresa || nome}`,
      html,
    });

    if (mailError) {
      console.error("Resend error:", mailError);
      return res.status(502).json({ error: "Falha ao enviar o e-mail." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro /api/contato:", err);
    return res.status(500).json({ error: "Erro interno." });
  }
}
