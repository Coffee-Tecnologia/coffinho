# Financeiro - Apollo

Atualizado em 03/11/2026

O menu **Financeiro** é onde o financeiro dá a aprovação final. As telas mudam conforme o tipo de empresa:

| Tela | Para que serve | Onde existe |
|---|---|---|
| Financeiro › Documentos | Aprovar ou reprovar os títulos a pagar gerados pelos pedidos de compra | Só para empresas com Protheus |
| Financeiro › Caixinha | Aprovação final do resumo (prestação de contas) da caixinha | Protheus e nuvem |
| Financeiro › A pagar / A receber | Aprovar (dar baixa) ou reprovar as contas lançadas pela equipe | Só na nuvem |

Se uma dessas telas não aparece no seu menu, ou a sua empresa não usa aquele modo, ou você não tem a permissão. Para liberar, peça ao administrador da sua empresa.

---

## Como aprovar um título de pedido de compra (Financeiro › Documentos, só Protheus)
O título aparece aqui quando o Fiscal aprova o pedido de compra.
1. Acesse **Financeiro › Documentos**. A tela abre na aba "Pendentes" (as outras são "Todos" e "Finalizados").
2. Use a busca, o chip "Vencimento" ou a pesquisa avançada para achar o título.
3. Na linha, abra "Detalhes" para ver os pedidos vinculados, ou use o menu de ações e escolha "Aprovar" ou "Reprovar".
4. **Aprovar**: confirme em "Sim". A observação é opcional. O título fica "Finalizado" e o pedido é concluído.
5. **Reprovar**: a "Observação" é obrigatória. O pedido **volta para o Fiscal** e aparece na aba "Rejeitados Fin" da tela Fiscal › Pedidos. Ele não volta direto para o solicitante.

Os dados de liberação, vencimento e baixa vêm do Protheus. Usuários administradores têm o botão "Sincronizar com o Protheus" para atualizar a lista. Esta tela não tem exportação.

## Como aprovar contas a pagar ou a receber (Financeiro › A pagar / A receber, só nuvem)
A equipe lança as contas em Documentos › A pagar ou A receber e envia. Elas chegam aqui como pendentes.
1. Acesse **Financeiro › A pagar** (ou **A receber**). As abas são "Todos", "Pendentes" e "Finalizados".
2. Na coluna "Aprovar" de cada linha há um ✓ (aprovar) e um ✗ (reprovar). Os botões ficam apagados quando o documento já foi finalizado.
3. **Aprovar** dá a baixa: o documento fica "Finalizado" com a data de hoje como data de pagamento.
4. **Reprovar** exige "Observação". O documento volta para quem lançou, que pode corrigir o anexo e enviar de novo.
5. Para conferir o comprovante, use a coluna "Anexo".

Em A receber, a coluna "Fornecedor" vira "Cliente", e a coluna "Recebido em" mostra a data da baixa.

**Exportar** (cabeçalho da tela): "Exportar PDF", "Exportar XLS" e "Pagos por Prazo", que separa o que foi pago antes, perto ou depois do vencimento.

## Como aprovar o resumo da caixinha (Financeiro › Caixinha)
É a última etapa da prestação de contas da caixinha. Antes de chegar aqui, o resumo passa pela Central de Serviço, pelo gestor e pelo Fiscal.
1. Acesse **Financeiro › Caixinha**. A aba "Pendentes" mostra os resumos com status "Aguardando financeiro".
2. No menu da linha: "Detalhes" (títulos do resumo), "Historico", "Aprovar" ou "Reprovar".
3. Ao aprovar, o resumo fica "Finalizado". Ao reprovar, fica "Rejeitado" e a Central de Serviço precisa tratar os títulos.

Para o fluxo completo da caixinha, veja a documentação da Caixinha.

---

## Quem pode
- Financeiro › Documentos: permissão FINANCIAL (ou administrador da empresa com Protheus).
- Financeiro › A pagar / A receber: permissão SINGLE_DOCUMENT_FINANCIAL (ou administrador da empresa).
- Financeiro › Caixinha: permissão FINANCIAL ou FINANCIAL_LITTLE_BOX.

## Perguntas frequentes
**Reprovei um título no Financeiro › Documentos. Para onde ele foi?**
Para o Fiscal, na aba "Rejeitados Fin" de Fiscal › Pedidos. O Fiscal confere e decide o que fazer.

**A aprovação do financeiro gera lançamento no Caixa Geral?**
Não. O Caixa Geral é lançado à mão, em Documentos › Caixa geral.

**Posso exportar a lista de Financeiro › Documentos?**
Não. A exportação existe só em A pagar e A receber, que são telas da nuvem.

**Não vejo A pagar / A receber.**
Essas telas existem só em empresas na nuvem. Em empresas com Protheus, as contas vêm dos títulos dos pedidos (Financeiro › Documentos).

**O botão de aprovar está apagado.**
O documento já foi finalizado, ou ainda não foi enviado por quem lançou.

## Problemas comuns
- **"Observação: *" em vermelho ao reprovar**: a observação é obrigatória para reprovar. Escreva o motivo.
- **O título não aparece em Financeiro › Documentos**: ele só é criado quando o Fiscal aprova o pedido. Se o título foi excluído no Protheus, ele some do Apollo na próxima sincronização e o pedido volta a ficar pendente no financeiro.
- **A tela diz que você não tem permissão**: peça ao administrador da sua empresa para liberar o acesso ao Financeiro.
