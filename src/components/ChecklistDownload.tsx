import { Mail, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { useModal } from "@/context/ModalContext";

const SECOES = [
  {
    cor: "#10b981",
    titulo: "DRE — Visão de Resultado",
    itens: [
      {
        subtitulo: "Faturamento e Impostos",
        docs: [
          "Relatório detalhado de todas as Notas Fiscais (NF-e / NFS-e) emitidas no período",
          "Extrato de impostos sobre as vendas (Guia do Simples Nacional ou extrato do regime tributário)",
        ],
      },
      {
        subtitulo: "Custos de Operação (CPV/CMV)",
        docs: [
          "Notas fiscais de compra de mercadorias para revenda ou insumos do serviço",
          "Gastos diretos com fretes de compra e embalagens",
        ],
      },
      {
        subtitulo: "Despesas Operacionais",
        docs: [
          "Comprovantes de gastos fixos: aluguel, condomínio, internet, softwares e contabilidade",
          "Comprovantes de despesas variáveis: comissões, taxas de cartão/maquininha e marketing",
        ],
      },
    ],
  },
  {
    cor: "#7099e8",
    titulo: "Fluxo de Caixa — Visão de Movimentação",
    itens: [
      {
        subtitulo: "Extratos e Saldos",
        docs: [
          "Extratos bancários em PDF e OFX de todas as contas da empresa",
          "Saldo inicial e final do caixinha físico (dinheiro em espécie), se houver",
        ],
      },
      {
        subtitulo: "Entradas e Saídas Reais",
        docs: [
          "Relatório de recebimentos efetivos: vendas à vista e parcelas de meses anteriores",
          "Comprovantes de pagamentos: boletos de fornecedores, contas de consumo e tributos pagos",
        ],
      },
      {
        subtitulo: "Folha de Pagamento",
        docs: [
          "Resumo da folha: salários líquidos, pró-labore e guias de encargos (FGTS, INSS) quitadas",
        ],
      },
      {
        subtitulo: "Movimentações de Capital",
        docs: [
          "Comprovantes de aportes de sócios, empréstimos tomados ou parcelas de financiamentos",
        ],
      },
    ],
  },
  {
    cor: "#f0c040",
    titulo: "Informações de Apoio para Gestão",
    itens: [
      {
        subtitulo: "",
        docs: [
          "Listagem de Contas a Receber: valores em aberto com datas previstas de recebimento",
          "Listagem de Contas a Pagar: boletos e compromissos agendados para meses futuros",
          "Valor atualizado do estoque no último dia do mês (para empresas de comércio)",
        ],
      },
    ],
  },
];

export function ChecklistDownload() {
  const { openModal } = useModal();

  return (
    <section id="checklist" className="py-20 bg-white relative overflow-hidden">

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative">
        <FadeIn>
          <div
            className="rounded-3xl overflow-hidden border"
            style={{
              borderColor: "rgba(27,65,88,0.08)",
              background: "#f5f7f9",
            }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 sm:p-14 lg:p-16">

              {/* Texto */}
              <div className="flex-1 max-w-lg">
                <div className="text-xs font-semibold text-[#1B4158]/32 uppercase tracking-widest mb-7">
                  Lista de Documentos
                </div>

                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl sm:text-4xl font-bold text-[#1B4158] mb-4 leading-tight"
                >
                  O que precisamos
                  <br />
                  <span className="gradient-text">de você</span>
                </h2>

                <p className="text-[#1B4158]/75 text-sm leading-relaxed">
                  Lista completa dos documentos para montarmos o DRE e o Fluxo de Caixa da sua empresa. Receba direto no seu e-mail — totalmente gratuito.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
                <button
                  onClick={() => openModal("checklist")}
                  className="btn-gold px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
                >
                  <Mail size={15} />
                  Receber a lista no meu e-mail
                  <ArrowRight size={14} />
                </button>
                <p className="text-xs text-[#1B4158]/27">Enviamos o PDF gratuitamente para você</p>
              </div>

            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
