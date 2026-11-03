# Pedidos de Compra - Apollo

Atualizado em 03/11/2026

**Só para empresas com Protheus.** Os pedidos de compra nascem no Protheus. O Apollo não cria pedidos; ele traz os pedidos para o Apollo e controla a conferência deles até o financeiro. Empresas só na nuvem não têm esta tela; elas usam "A pagar" (Documentos › A pagar).

## Quem faz o quê (três telas)

| Etapa | Quem | Onde |
|---|---|---|
| 1. Preparar e enviar | Solicitante / comprador | **Documentos › Pedidos** |
| 2. Conferência fiscal | Fiscal | **Fiscal › Pedidos** |
| 3. Aprovação do título | Financeiro | **Financeiro › Documentos** |

O pedido termina quando o financeiro aprova o título gerado na etapa 2.

## Como trazer meus pedidos do Protheus
1. Menu **Documentos › Pedidos**.
2. Clique em **"Sincronizar"**, no topo da tela.
3. O Apollo traz os pedidos em aberto do Protheus que pertencem ao seu usuário no Protheus.

- Sem o código de usuário do Protheus no seu cadastro do Apollo, nada é trazido. Peça ao administrador da sua empresa para preencher.
- Quem cuida só de materiais vê só os pedidos de material.
- Pedido excluído, eliminado por resíduo ou já totalmente entregue no Protheus some do Apollo na sincronização seguinte.

## Como preparar o pedido (solicitante)
Em **Documentos › Pedidos**, abra o menu da linha do pedido:
1. **"Atualizar"** abre "Atualizar pedido", com estes campos:
   - "Primeiro vencimento" (obrigatório);
   - "Espécie" (obrigatório);
   - "Emissão da NF" (obrigatório): informe a data **ou** marque "Não tenho a nota". Quando a nota for lançada no Protheus, a data é preenchida sozinha. A data não pode ser futura;
   - "Forma de pagamento" (obrigatório);
   - "Replicar informações para todos os itens do pedido?": Sim aplica os dados a todos os itens do mesmo pedido;
   - "Observação do pedido" ou "Acrescentar observação".

   Clique em "Salvar".
2. Na coluna **"Anexo"**, anexe a nota ou o comprovante. O anexo é obrigatório.

## Como enviar um pedido ao fiscal
1. Menu da linha → **"Enviar ao Fiscal"** (ou o botão "Enviar" da linha).
2. Escolha uma das abas:
   - **"Enviar item"**: responda "Pedido **parcialmente** atendido?" (Sim/Não) e, se quiser, escreva uma observação.
   - **"Enviar pedido"**: envia vários itens; selecione os itens parcialmente atendidos.
3. Clique em "Sim". A mensagem "Pedido enviado com sucesso" confirma o envio.

O parcial é marcado por **quem envia**, não pelo fiscal.

### Por que o botão "Enviar ao Fiscal" está desabilitado?
O botão só libera com **anexo + primeiro vencimento + espécie**. Passando o mouse, aparece "Falta informações" (falta algum desses) ou "Pedido finalizado" (já foi enviado). Use "Atualizar" e a coluna "Anexo" para completar.

## Conferência fiscal (fiscal)
Menu **Fiscal › Pedidos**. As abas são Todos, Pendentes, Rejeitados Fin, Rejeitados Fis, Finalizados e Parcial. Os filtros são Filial, Espécie, Solicitante, Vencimento, F. pagamento, Recebido em e Emissão NF. Na coluna "Emissão NF", "Sem nota" quer dizer que o solicitante marcou "Não tenho a nota".

- **"Aprovar"**: pede só uma observação opcional. Ao aprovar, o Apollo busca no Protheus a nota de entrada e o título a pagar, e o pedido segue para o Financeiro.
- **"Reprovar"**: a "Observação" é obrigatória. O pedido volta ao solicitante (aba "Rejeitados" dele, e "Rejeitados Fis" no fiscal). O solicitante recebe um e-mail.
- "Aprovar" fica desabilitado quando o pedido já foi aprovado pelo fiscal ou ainda não foi enviado.
- "Parcial" é só uma aba de filtro: mostra os pedidos que o solicitante enviou como parcialmente atendidos.

## Aprovação no financeiro
Menu **Financeiro › Documentos**. Aqui aparecem os **títulos a pagar** gerados pela aprovação fiscal, e não os pedidos. As abas são Todos, Pendentes e Finalizados.
- **"Aprovar"**: o pedido fica finalizado no financeiro. Fim do fluxo.
- **"Reprovar"**: o pedido volta para o **Fiscal**, na aba "Rejeitados Fin". Não volta para o solicitante.

## Como acompanhar meu pedido
- A coluna "Status" mostra um ícone por etapa. Passe o mouse para ver, por exemplo, "Pendente fiscal" ou "Finalizado - financeiro".
- Abas do solicitante: Todos, Pendentes, Rejeitados, Finalizados e Parcial.
- **"Detalhes"** (menu da linha): mostra os dados do pedido, os status, as observações, os "Documentos vinculados" (títulos) e o "Histórico".
- **"Info Envio"**: mostra o que foi informado no envio (só depois de enviado).

## Setores
- Filtro **"Visão"**: "Meus pedidos" ou "Pedidos do setor". Filtro **"Setor"**: um setor específico. As colunas "Usuário" e "Setor" mostram de quem é cada pedido.
- Você vê os pedidos do setor a que pertence ou a que tem acesso. Quem configura é o administrador ou o responsável pelo setor, em **Configuração › Setores**.
- Se o dono do pedido mudar no Protheus, o pedido muda de setor junto, e isso aparece no Histórico.

## Exportar
O botão **"Exportar"**, no topo, tem três opções: "Exportar PDF", "Exportar XLS" e "Download anexos" (ZIP com no máximo 100 pedidos).

## Quem pode
- Solicitante: permissão de pedidos de compra (PURCHASE_ORDER) ou de materiais (MATERIALS).
- Fiscal: ACCOUNTABILITY.
- Financeiro: FINANCIAL.

Os administradores Protheus da empresa veem tudo. Se faltar acesso, peça ao administrador da sua empresa.

## Problemas comuns (mensagens reais)
| Mensagem | O que fazer |
|---|---|
| "O pedido X/Y está sem anexo." | Anexe o arquivo na coluna "Anexo" e envie de novo. |
| "O pedido X/Y está bloqueado no Protheus." | O pedido não está liberado (aprovado) no Protheus. Peça a liberação no Protheus e tente de novo. |
| "O pedido X/Y nao foi enviado, reveja espécie, vencimento, forma de pagamento." | Complete esses campos em "Atualizar". |
| "O pedido X/Y, filial Z nao foi encontrado na origem." | O pedido foi excluído ou alterado no Protheus. Clique em "Sincronizar". |
| "Informe a data de emissão da NF ou marque "Não tenho a nota"." | Preencha "Emissão da NF" ou marque a opção. |
| "A data de emissão da NF não pode ser futura." | Corrija a data. |
| "Não existe documento de entrada lançado para o documento X/Y" (fiscal) | A nota de entrada ainda não foi lançada no Protheus. Lance a nota e aprove de novo. |
| "Aguardando atualização da pre-nota" (fiscal) | A pré-nota existe, mas ainda não foi classificada no Protheus. Classifique e tente de novo. |
| "Nenhum título financeiro encontrado no Protheus para a nota…" (fiscal) | A nota não gerou título a pagar no Protheus. Verifique a nota no Protheus. |
| "permitido no maximo 100 notas por download, teste novamente" | Filtre menos pedidos antes de "Download anexos". |

## Perguntas frequentes
- **Posso criar um pedido no Apollo?** Não. O pedido nasce no Protheus; depois use "Sincronizar".
- **Meu pedido não aparece.** Clique em "Sincronizar". Confira se o seu código de usuário do Protheus está no seu cadastro e se o pedido está em aberto no Protheus. Confira também o filtro "Visão" e a aba selecionada.
- **O financeiro reprovou. E agora?** O pedido está com o fiscal, na aba "Rejeitados Fin". O fiscal revisa e aprova de novo.
- **O fiscal reprovou. E agora?** Leia a observação em "Detalhes", corrija (anexo ou dados em "Atualizar") e use "Enviar ao Fiscal" de novo.
- **Quem decide se o pedido foi parcial?** O solicitante, na hora do envio.
- **Existe sincronização automática?** Não. Use o botão "Sincronizar".
