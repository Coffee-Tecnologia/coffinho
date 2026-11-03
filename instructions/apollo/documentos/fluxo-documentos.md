# Documentos (avulsos, A pagar, A receber e Sincronização) — Apollo
Atualizado em 03/11/2026

O menu **Documentos** agrupa várias telas. Esta doc cobre só as telas de **documentos avulsos** e a **Sincronização por e-mail**. As outras têm doc própria:
- Documentos › Pedidos e Documentos › Pedidos de Venda: ver docs de Pedidos de Compra e Pedidos de Venda (só Protheus).
- Documentos › Caixinha (Manutenção, Movimentos, Resumos): ver doc da Caixinha.
- Documentos › Caixa geral: ver doc do Caixa Geral.

## Qual tela a sua empresa usa
- **Empresa com Protheus:** Documentos › **Documentos** (documentos avulsos: despesas sem pedido de compra). Quem aprova é o Fiscal, em Fiscal › Documentos.
- **Empresa na nuvem (sem Protheus):** Documentos › **A pagar** e Documentos › **A receber**. Quem aprova (dá a baixa) é o Financeiro, em Financeiro › A pagar / A receber.
- Se o usuário não vê o item no menu, a empresa usa o outro modo ou ele não tem a permissão.

## Lançar um documento
1. Documentos › Documentos (ou A pagar / A receber) › "Novo".
2. Preencha:
   - "Filial: *" e "Número: *";
   - "Fornecedor: *" (ou "Cliente: *" em A receber), escolhido da lista;
   - "Vencimento: *", "Valor: *" e "Observação";
   - "Contexto:" (obra/projeto), se a empresa usar contextos.
3. **Parcelas:** com o parâmetro "Usar Parcelamento" ligado, informe "Parcela:" (até 12). Para cada parcela, preencha "Vencimento" e "Valor Parcela".
4. **Já pago?** Marque "Documento ja baixado?" e informe a "Data da baixa*". O documento já nasce finalizado e **não passa por aprovação**.
5. "Salvar". O documento fica **Pendente** (ainda não enviado).
6. Anexe o comprovante (nota, boleto) e use **"Enviar"** no menu da linha. Sem anexo, o envio é bloqueado.

**Provisão, Taxas e guias** (só Protheus, com o parâmetro "Usar Provisão" ligado): o "Novo" abre as abas "Documento", "Provisão" e "Taxas e guias". A provisão pode ser enviada sem anexo.

## Acompanhar
- Abas: Todos / Pendentes / Finalizados / Rejeitados.
- Menu da linha: "Detalhes", "Enviar", "Deletar".
- A coluna Status mostra uma bolinha por etapa. Passe o mouse para ver a etapa e a situação (Aguardando / Pendente / Finalizado / Rejeitado):
  - a primeira é a sua;
  - a segunda é a da aprovação ("fiscal").
- Abas:
  - **Pendentes:** salvos e ainda não enviados.
  - **Finalizados:** você já enviou. Veja na segunda bolinha se a aprovação está pendente ou finalizada (baixado).
  - **Rejeitados:** reprovados com observação. Corrija o que foi pedido e use "Enviar" de novo.
- Não há edição depois de salvo. Se o dado estiver errado, delete e lance outro (enquanto estiver pendente) ou reenvie após a rejeição.
- "Exportar": PDF ou XLS da lista.

## Sincronização (documentos recebidos por e-mail)
Documentos › Sincronização ("Documentos Sincronizados").
- Lê a caixa de e-mail configurada e transforma cada anexo em um registro com Assunto, E-mail, Valor e Vencimento.
- A leitura **não é automática**: clique em "Sincronizar".
- Abas: Todos / Aguardando / Aprovado / Rejeitado. Na coluna Ações, aprovar cria um documento avulso com o anexo; rejeitar descarta o registro.
- A caixa de e-mail é configurada pelo administrador. A tela de configuração não está no menu: peça ao administrador da sua empresa ou ao suporte.
- Valor e vencimento são lidos do PDF quando ele tem texto. Confira antes de aprovar.

## Quem pode
- Protheus: lançar e enviar com MATERIALS ou PURCHASE_ORDER; aprovar com ACCOUNTABILITY (Fiscal).
- Nuvem: lançar com SINGLE_DOCUMENT; aprovar com SINGLE_DOCUMENT_FINANCIAL.
- Sincronização: SYNCHRONIZE_DOCUMENTS.
- Administradores da empresa (ADMIN_BASIC / ADMIN_PROTHEUS) acessam tudo. Sem acesso, peça ao administrador da sua empresa.

## Perguntas frequentes
- **Onde lanço uma conta a pagar?** Nuvem: Documentos › A pagar › "Novo". Protheus: Documentos › Documentos › "Novo".
- **Lancei, mas o financeiro não vê.** Falta "Enviar" no menu da linha (com anexo).
- **Já paguei, preciso de aprovação?** Não. Marque "Documento ja baixado?" ao lançar.
- **Posso parcelar?** Sim, até 12 parcelas, se o parâmetro de parcelamento estiver ligado.
- **Os e-mails não viraram documentos sozinhos.** É preciso clicar em "Sincronizar" na tela Sincronização.

## Problemas comuns
- "Documento sem anexo": anexe o comprovante antes de "Enviar".
- "Fornecedor inválido: Selecione um fornecedor da lista disponível" / "Cliente inválido: Selecione um cliente da lista disponível": escolha da lista em vez de só digitar. Se não existir, cadastre em Cadastros.
- "Filial é obrigatória.": escolha a filial.
- "O registro ja existe": já há documento com o mesmo número e parcela. Confira o número.
- "Informe a data da baixa": marcou "Documento ja baixado?" sem a data.
