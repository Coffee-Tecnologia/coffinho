# Caixa Geral - Apollo

Atualizado em 03/11/2026

O **Caixa Geral** registra as entradas e saídas do caixa principal da empresa e mostra o saldo. Existe tanto em empresas com Protheus quanto na nuvem.

Menu: **Documentos › Caixa geral**.

Todo lançamento é feito à mão. Nenhum outro módulo (Financeiro, Caixinha, Pedidos) cria lançamento no Caixa Geral automaticamente.

---

## O que aparece na tela
- **Cards do topo**: "Saldo Atual do Caixa", "Total Entradas", "Total Saídas" e "Total de Movimentos". O card de saldo mostra também a variação em relação ao mês anterior.
- **Abas**: "Todos", "Entradas" e "Saídas".
- **Filtros**: busca livre e os chips "Emissão" e "Baixa" (período).
- **Colunas**: Número, Emissão, Fornecedor, Tipo de movimento, Valor, "Saldo anterior", Saldo, "Prestação de Contas", Baixa, Observação e Anexo.

Os lançamentos ficam em ordem de emissão. Cada linha mostra o saldo antes e depois do movimento.

## Como lançar uma entrada ou saída
1. Em **Documentos › Caixa geral**, clique em "Novo".
2. Preencha:
   - "Número", "Descrição", "Fornecedor", "Data de emissão" e "Valor" (obrigatórios);
   - "Tipo de movimento": Entrada ou Saída;
   - "Prestação de Contas": "Pendente" ou "Finalizado";
   - "Data da baixa": obrigatória quando a Prestação de Contas é "Finalizado";
   - "Observação" (opcional).
3. Clique em "Salvar".

Uma saída maior que o saldo atual é bloqueada. O caixa não pode ficar negativo.

## Como dar baixa na prestação de contas
Um lançamento com Prestação de Contas "Pendente" é um movimento que ainda precisa ser comprovado ou compensado.
1. No menu da linha, clique em **"Baixar"**.
2. Informe a data da baixa e confirme. A data não pode ser futura.
3. A Prestação de Contas passa para "Finalizado". **A baixa não pode ser desfeita.**

## Como exportar o caixa
No cabeçalho, clique em **"Exportar"** e escolha "Exportar PDF" ou "Exportar XLS". A exportação usa os filtros aplicados na tela. Não existe uma tela de relatório separada.

## Como corrigir o saldo (Recálculo)
Se o saldo parecer errado (por exemplo, depois de lançamentos com data antiga), clique em **"Recálculo"** no cabeçalho. O Apollo recalcula, em sequência, o saldo de todos os lançamentos da empresa. Pode demorar se houver muitos lançamentos.

---

## Quem pode
Administradores da empresa (ADMIN_BASIC, ADMIN_PROTHEUS) e usuários com a permissão MASTER_BOX. Se você não vê o Caixa geral no menu, peça ao administrador da sua empresa.

## Perguntas frequentes
**Onde vejo o saldo atual?**
No card "Saldo Atual do Caixa", no topo da tela.

**Como filtro só as saídas?**
Use a aba "Saídas". Para um período, use os chips "Emissão" ou "Baixa".

**O que é "Prestação de Contas"?**
Indica se o movimento já foi comprovado: "Pendente" quer dizer que falta dar baixa; "Finalizado" quer dizer que já foi baixado.

**Errei um lançamento. Posso excluir?**
Ainda não há exclusão de lançamento no Caixa Geral. Faça um lançamento de ajuste (Entrada ou Saída) com uma observação explicando a correção.

**O pagamento aprovado no Financeiro entra aqui?**
Não. O Caixa Geral não recebe lançamentos automáticos.

## Problemas comuns
- **"Saldo do caixa não pode ficar negativo."**: a saída é maior que o saldo. Lance antes a entrada correspondente ou revise o valor.
- **"Você não pode informar uma data futura para a baixa."**: use a data de hoje ou uma data passada.
- **"Erro ao realizar recálculo!"**: tente de novo. Se o erro continuar, fale com o suporte.
- **"Erro ao gerar relatório PDF!"**: confira os filtros (um período muito grande pode falhar) e tente de novo.
