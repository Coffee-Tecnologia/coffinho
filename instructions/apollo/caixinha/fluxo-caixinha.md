# Caixinha (fundo fixo) - Apollo

Atualizado em 03/11/2026

A **Caixinha** é o fundo para pequenas despesas. A pessoa lança o gasto, a **Central de Serviço** aprova e dá a baixa, e de tempos em tempos a Central fecha a caixinha. O fechamento gera um **resumo** (prestação de contas), que passa pelo gestor, pelo Fiscal e pelo Financeiro.

Menu: **Documentos › Caixinha › Manutenção | Movimentos | Resumos**. Depois vêm as etapas em **Fiscal › Caixinha** e **Financeiro › Caixinha**.

O fluxo é parecido nos dois modos, com estas diferenças:
- **Na nuvem**: a caixinha tem saldo no Apollo. Aprovar um título debita o saldo. Não existe estorno.
- **Em empresas com Protheus**: o título aprovado é gravado no Protheus e recebe um "Num Doc". O estorno é possível. O saldo não é controlado pelo Apollo.

---

## Como cadastrar uma caixinha e dar acesso (Manutenção)
Só administradores da empresa veem Documentos › Caixinha › Manutenção.
1. Clique em "Nova caixinha" e informe "Nome" e "Sigla". A sigla diferencia caixinhas com o mesmo nome.
2. Para dar acesso, clique em "Adicionar aprovador". O assistente tem 3 passos: **Usuário → Caixinhas → Permissões**.
   - "Visualizar movimentos" está sempre incluído.
   - Ligue "Aprovar movimentos" para a pessoa poder dar baixa e aprovar lançamentos.
   - Se a pessoa já tinha acesso, o novo acesso substitui o anterior.
3. Os cards do topo mostram "Caixinhas", "Com aprovador", "Sem aprovador" e "Usuários". Uma caixinha "Sem aprovador" não tem ninguém que possa aprovar.
4. Em cada caixinha há os ícones "Editar caixinha", "Excluir caixinha" e, **só na nuvem**, "Adicionar saldo" (reposição do fundo).

## Como lançar uma despesa (Movimentos)
1. Acesse **Documentos › Caixinha › Movimentos** e clique em "Novo".
2. Preencha "Filial", "Número", "Emissão", "Caixinha", "Fornecedor", "Vencimento" e "Valor". Todos são obrigatórios. A "Observação" é opcional.
3. Clique em "Salvar". O título fica "Pendente".
4. Anexe o comprovante na coluna "Anexo".
5. No menu da linha, clique em **"Enviar"**. O botão só habilita depois que houver anexo. Só depois do envio o título chega à Central de Serviço.

Natureza, Centro de custo e Classe de valor **não** são preenchidos por quem lança. Quem preenche é a Central de Serviço, na aprovação (só no Protheus).

## Como aprovar, rejeitar ou estornar um título (Central de Serviço)
Em Movimentos, a Central de Serviço tem as abas extras "Ag. baixa", "Ag. resumo" e "Resumo rej.". No menu da linha:
- **"Aprovar"**: aprova e dá a baixa.
  - No Protheus, informe "Natureza", "Centro de custo" e "Classe de valor". O título é gravado no Protheus e ganha o "Num Doc".
  - Na nuvem, o valor é debitado do saldo da caixinha.
- **"Rejeitar"**: a "Observação" é obrigatória. O título volta para quem lançou, que corrige e envia de novo.
- **"Estornar"**: desfaz a baixa. Só existe no Protheus (precisa do "Num Doc") e só para título fora de resumo, ou num resumo rejeitado.
- **"Retornar ao resumo"**: devolve ao resumo um título que estava num resumo rejeitado.

## Como fechar a caixinha (gerar o resumo)
1. Em **Documentos › Caixinha › Movimentos**, a Central de Serviço clica em **"Fechar Caixinha"**.
2. Informe a "Caixinha" e a "Data do fechamento" e confirme.
3. O Apollo junta **todos os títulos finalizados até essa data** num resumo, com status "Aguardando Central de serviços". Não é preciso escolher os títulos um a um.

## Como aprovar o resumo (prestação de contas)
O resumo passa por quatro aprovações, nesta ordem:

| Status | Quem aprova | Onde |
|---|---|---|
| Aguardando Central de serviços | Central de Serviço | Documentos › Caixinha › Resumos |
| Aguardando gestor | Gestor (aprovador da caixinha) | Documentos › Caixinha › Resumos |
| Aguardando fiscal | Fiscal | Fiscal › Caixinha |
| Aguardando financeiro | Financeiro | Financeiro › Caixinha |
| Finalizado | Fim do fluxo | |

Em cada tela, o menu da linha tem "Detalhes", "Historico", "Aprovar" e "Reprovar". Reprovar deixa o resumo "Rejeitado". Em Documentos › Caixinha › Resumos, aprovar um resumo rejeitado o manda de novo para o gestor.

## Saldo negativo (só na nuvem)
Por padrão, a Central de Serviço não consegue aprovar um título maior que o saldo da caixinha. Se a empresa quiser permitir, o administrador pode ligar o parâmetro **"Permitir Saldo Negativo na Caixinha"** em Configuração › Sistema › Parâmetros do Sistema.

---

## Quem pode
- Manutenção: administradores da empresa (ADMIN_BASIC, ADMIN_PROTHEUS).
- Lançar e enviar: permissão LITTLE_BOX (ou AREA_MANAGER).
- Aprovar títulos e fechar a caixinha: Central de Serviço (permissão CS).
- Resumos: Central de Serviço e gestor. Fiscal › Caixinha: ACCOUNTABILITY ou LITTLE_BOX_BILLING. Financeiro › Caixinha: FINANCIAL ou FINANCIAL_LITTLE_BOX.

## Perguntas frequentes
**Lancei a despesa, mas ninguém aprova.** Confira se você clicou em "Enviar" (com anexo). Um título só salvo fica "Pendente" e a Central não o recebe.

**Onde fica o botão "Fechar Caixinha"?** Em Movimentos, no cabeçalho, e só para a Central de Serviço. Não fica em Resumos.

**Como cancelo uma baixa?** Com "Estornar", na Central de Serviço, só em empresas com Protheus. Na nuvem não há estorno.

**Como recarrego o saldo?** Em Manutenção, pelo ícone "Adicionar saldo" (só na nuvem).

**Quem é o "gestor"?** É o usuário com acesso "Aprovar movimentos" na caixinha, definido em Manutenção.

## Problemas comuns
- **"Documento sem anexo."**: anexe o comprovante antes de enviar.
- **"Caixinha sem saldo para realizar a movimentação: SIGLA"** (nuvem): reponha o saldo com "Adicionar saldo", ou peça ao administrador para ligar "Permitir Saldo Negativo na Caixinha".
- **"Não é possível realizar o fechamento por falta de títulos para os filtros selecionados."**: não há títulos finalizados até a data informada nessa caixinha.
- **"Erro ao atualizar o titulo, verifique se o titulo esta aprovado e não pertence a um resumo."**: o título já está num resumo em andamento. Só dá para estorná-lo se o resumo for rejeitado.
- **"Você não tem permissão para deletar esse titulo."**: só quem lançou pode excluir.
- **"O usuário não tem permissão para esta ação."**: peça ao administrador da sua empresa para revisar seu acesso em Manutenção.
