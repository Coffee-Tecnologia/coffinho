# Pedidos de Venda - Apollo

Atualizado em 03/11/2026

**Só para empresas com Protheus.** Os pedidos de venda nascem no Protheus. O Apollo não cria nem edita pedidos de venda: ele traz os pedidos para cá, guarda o anexo e controla a aprovação do fiscal. **O fluxo termina na aprovação fiscal**; não há etapa no financeiro.

Não confunda com **Orçamentos** (menu "Orçamentos"), que são propostas comerciais criadas no próprio Apollo e existem só na nuvem.

## Quem faz o quê
| Etapa | Quem | Onde |
|---|---|---|
| Trazer, anexar e enviar | Usuário de vendas | **Documentos › Pedidos de Venda** |
| Aprovar ou reprovar | Fiscal | **Fiscal › Pedidos de Venda** (abre na aba "Ag. Fiscal") |

## Status (como aparecem na tela)
| Status | Significado |
|---|---|
| Ag. Usuário | Pedido trazido do Protheus, ainda não enviado ao fiscal |
| Ag. Fiscal | Enviado; esperando o fiscal |
| Finalizado | Aprovado pelo fiscal (no detalhe aparece "Aprovado"). Fim do fluxo |
| Reprovado | O fiscal reprovou; volta para o usuário de vendas |

O fiscal vê só as abas Todos, Ag. Fiscal e Finalizado.

## Como trazer os pedidos do Protheus
1. Menu **Documentos › Pedidos de Venda**.
2. Confira se a empresa certa está selecionada no topo.
3. Clique em **"Sincronizar"**. Aparece "Pedidos de venda sincronizados com sucesso".

- Os pedidos trazidos são os do seu usuário no Protheus. Peça ao administrador da sua empresa para conferir se o seu código do Protheus está no seu cadastro.
- Pedido excluído no Protheus some do Apollo na sincronização seguinte.
- **Atenção:** a sincronização só atualiza os itens (quantidade e preço) quando algum dado do cabeçalho também mudou: cliente, loja, vendedor, usuário, emissão ou condição de pagamento. Se você corrigiu só um item no Protheus, a mudança pode não aparecer no Apollo. Nesse caso, fale com o suporte.

## Como enviar um pedido ao fiscal
1. Na coluna **"Anexo"**, clique para anexar o documento ("Anexar arquivo" → "Anexar"). O anexo é obrigatório.
2. Abra o menu da linha → **"Enviar para Fiscal"** → "Confirmar".
3. O status passa para "Ag. Fiscal".

"Enviar para Fiscal" fica desabilitado enquanto não houver anexo.

## Como o fiscal analisa
1. Menu **Fiscal › Pedidos de Venda**.
2. Abra o detalhe pela seta (›) no fim da linha. Ali aparecem o cabeçalho, os itens (Produto, Qtd, Unit., CFOP, Total), os anexos e o Histórico.
3. No menu da linha:
   - **"Aprovar"** → "Aprovar". O pedido fica "Finalizado".
   - **"Reprovar"** → preencha a "Observação" (obrigatória) → "Reprovar".

## Pedido reprovado: como reenviar
1. Leia a observação do fiscal no detalhe do pedido.
2. Corrija o que for preciso: o anexo no Apollo, ou o pedido no Protheus e depois "Sincronizar". Veja o aviso sobre itens na sincronização.
3. Menu da linha → **"Reenviar"** → "Confirmar". O reenvio também exige anexo e apaga a observação anterior do fiscal.

Não há limite de reenvios.

## Outros recursos
- Filtros "Filial" e "Cliente", e busca por número, cliente ou observação.
- A coluna **"Setor"** mostra o setor do dono do pedido. Os setores são configurados em **Configuração › Setores**.
- No detalhe, "Adicionar anexo" e remoção de anexos.
- O **Histórico** registra envio, aprovação, reprovação, reenvio e troca de responsável.

## Quem pode
- Usuário de vendas: SALES_ORDER (ou administrador Protheus da empresa). Só ele vê "Sincronizar", "Enviar para Fiscal" e "Reenviar".
- Fiscal: ACCOUNTABILITY. Só ele vê "Aprovar" e "Reprovar".

Se faltar acesso, peça ao administrador da sua empresa.

## Problemas comuns (mensagens reais)
| Mensagem | O que fazer |
|---|---|
| "É necessário anexar ao menos um arquivo antes de enviar para o fiscal." | Anexe o documento na coluna "Anexo". |
| "Observação é obrigatória para reprovar o pedido." | Preencha a observação. |
| "Operação inválida: status atual é '…', esperado '…'." | O pedido mudou de status (outra pessoa já agiu). Recarregue a tela. |
| "Erro ao remover anexo" | Tente de novo; se persistir, fale com o suporte. |

## Perguntas frequentes
- **Posso criar ou editar um pedido de venda no Apollo?** Não. Isso é feito no Protheus.
- **Depois de aprovado, vai para o financeiro?** Não. O fluxo termina na aprovação fiscal.
- **O pedido não aparece.** Clique em "Sincronizar" e confira o seu código de usuário do Protheus e a empresa selecionada.
- **Qual a diferença para Orçamento?** O pedido de venda vem do Protheus e passa pelo fiscal. O orçamento é criado no Apollo (só na nuvem) e é aprovado pelo cliente por link.
