# Fiscal (aprovação fiscal) - Apollo

Atualizado em 03/11/2026

O menu **Fiscal** é onde a equipe fiscal confere e aprova o que os solicitantes enviaram. Ele tem quatro telas: **Pedidos**, **Pedidos de Venda**, **Documentos** e **Caixinha**.

- Pedidos, Pedidos de Venda e Documentos existem **só em empresas com Protheus**.
- Caixinha existe nos dois modos.

**Não confunda com "Gestão Fiscal".** Gestão Fiscal é outro menu, com Visão Geral, NF-e Recebidas e Emitidas, CT-e, NFS-e, Certificados, Regularidade, Fechamento mensal, Fornecedores etc. Ele cuida dos documentos fiscais eletrônicos capturados na SEFAZ e tem documentação própria. Perguntas sobre notas, manifestação, certificados ou certidões são de Gestão Fiscal, não deste menu.

---

## Pedidos de compra (Fiscal › Pedidos, só Protheus)
O fluxo do pedido de compra tem três etapas:
1. O solicitante atualiza o pedido em Documentos › Pedidos e clica em "Enviar ao Fiscal".
2. O Fiscal confere e aprova aqui.
3. O Financeiro aprova o título em Financeiro › Documentos.

O atendimento total ou parcial é escolhido **pelo solicitante, no envio**, não pelo Fiscal.

### Abas
- "Todos".
- "Pendentes": enviados pelo solicitante e ainda não aprovados, incluindo os devolvidos pelo Financeiro.
- "Rejeitados Fin": devolvidos pelo Financeiro.
- "Rejeitados Fis": reprovados pelo Fiscal, aguardando o solicitante reenviar.
- "Finalizados".
- "Parcial": pedidos que o solicitante enviou como parcialmente atendidos. É só um filtro.

### Colunas e filtros
Colunas principais: Número, Filial, Fornecedor, Solicitante, **Setor**, Espécie, F. pagamento, Vencimento, **Emissão NF** e "Data de envio do solicitante". A coluna Emissão NF mostra "Sem nota" quando o solicitante marcou "Não tenho a nota".

Em "Abrir filtros" há os chips Solicitante, Emissão NF, Espécie, F. pagamento, Vencimento, "Recebido em" e Filial. A pesquisa avançada busca por números de pedido.

### Como aprovar
1. No menu da linha, escolha "Detalhes" para conferir os itens e os anexos.
2. Escolha "Aprovar". A observação é opcional. Clique em "Sim".
3. Antes de aprovar, o Apollo confere no Protheus:
   - se a nota de entrada foi lançada;
   - se a pré-nota foi classificada;
   - se o título a pagar existe.
4. Se tudo estiver certo, o pedido fica "Finalizado" no Fiscal e o título vai para **Financeiro › Documentos**.

### Como reprovar
Escolha "Reprovar" e escreva a "Observação" (obrigatória). O pedido volta ao solicitante, que recebe um e-mail, corrige e envia de novo.

## Pedidos de venda (Fiscal › Pedidos de Venda, só Protheus)
A tela abre na aba "Ag. Fiscal". As outras abas são "Ag. Usuário", "Finalizado" e "Reprovado".
- "Aprovar" finaliza o pedido. O fluxo termina no Fiscal, sem etapa no Financeiro.
- "Reprovar" exige observação. O vendedor ajusta e clica em "Reenviar".

## Documentos avulsos (Fiscal › Documentos, só Protheus)
São as despesas sem pedido (provisão, taxa, guia, a pagar) lançadas em Documentos › Documentos.
- Abas: "Todos", "Pendentes" e "Finalizados".
- **"Aprovar" já dá a baixa.** O fluxo termina aqui, sem etapa no Financeiro.
- "Reprovar" exige observação. O documento volta para quem lançou, que reenvia.

## Caixinha (Fiscal › Caixinha)
É a terceira aprovação do resumo da caixinha, depois da Central de Serviço e do gestor. A aba "Pendentes" mostra os resumos "Aguardando fiscal". No menu da linha há "Detalhes", "Historico", "Aprovar" e "Reprovar". Ao aprovar, o resumo vai para o Financeiro (status "Aguardando financeiro"). Mais detalhes na documentação da Caixinha.

---

## Quem pode
Permissão ACCOUNTABILITY (Fiscal) ou administrador da empresa com Protheus. Fiscal › Caixinha aceita também a permissão LITTLE_BOX_BILLING. Se o menu não aparece, peça ao administrador da sua empresa.

## Perguntas frequentes
**O Fiscal pode aprovar só parte do pedido?**
Não. Quem informa "Pedido parcialmente atendido?" é o solicitante, no envio. O Fiscal aprova ou reprova o que foi enviado.

**Aprovei o pedido. O que acontece agora?**
O título a pagar vai para o Financeiro (Financeiro › Documentos). O pedido só é concluído quando o Financeiro aprova.

**O que significa "Rejeitados Fin"?**
O Financeiro reprovou o título e o pedido voltou para o Fiscal conferir.

**A coluna Emissão NF mostra "Sem nota".**
O solicitante informou que não tem a nota. Confira com ele antes de aprovar.

**Onde manifesto ou baixo o XML de uma NF-e?**
Em Gestão Fiscal › NF-e Recebidas, não no menu Fiscal.

## Problemas comuns
- **"Não existe documento de entrada lançado para algum item do pedido"**: a nota de entrada ainda não foi lançada no Protheus. Lance a nota e aprove de novo.
- **"Aguardando atualização da pre-nota"**: a pré-nota existe, mas ainda não foi classificada no Protheus. Classifique-a e tente de novo.
- **"Nenhum título financeiro encontrado no Protheus para a nota ..."**: a nota foi lançada, mas o título a pagar não foi gerado no Protheus. Verifique a nota ou o título no ERP.
- **"Observação é obrigatória para reprovar o pedido."**: escreva o motivo da reprovação.
- **O botão "Aprovar" está apagado**: o pedido já foi finalizado no Fiscal ou ainda está aguardando outra etapa.
