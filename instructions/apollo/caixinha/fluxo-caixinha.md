# Caixinha (Fundo Fixo) - Apollo

## Visão Geral
A **Caixinha** é o módulo de fundo fixo/petty cash do Apollo. Permite que colaboradores registrem pequenas despesas do dia a dia vinculadas a uma caixinha específica (identificada por sigla e nome), com aprovação e prestação de contas periódica.

O módulo é composto por três camadas:
- **Caixinha (LittleBox):** o fundo em si, com saldo e responsáveis
- **Título (LittleBoxTitle):** cada despesa individual lançada
- **Resumo / Prestação de contas (LittleBoxSummary):** fechamento periódico que agrupa os títulos

---

## 1. Cadastro da Caixinha

**Responsável:** Administrador / Gestor

Cada caixinha possui:
- **Nome:** nome descritivo (ex.: "Caixinha RH")
- **Sigla (Acronym):** código único de identificação
- **Saldo (amount):** valor disponível atual
- **Aprovadores:** usuários autorizados a aprovar títulos desta caixinha

**Ações disponíveis:**
- Criar nova caixinha
- Editar nome/sigla
- Adicionar ou remover aprovadores
- Adicionar saldo (reposição de fundo)
- Excluir caixinha

---

## 2. Lançamento de Título (Despesa)

**Responsável:** Colaborador / Solicitante

O colaborador registra uma despesa informando:
- **Valor total**
- **Fornecedor**
- **Natureza** (categoria da despesa)
- **Classe de valor**
- **Centro de custo**
- **Data de emissão e vencimento**
- **Filial**
- **Número do documento**
- **Observação**
- **Anexos** (notas, comprovantes)

Após salvar, o título entra com **status: `pending`** e aguarda aprovação.

---

## 3. Aprovação do Título

**Responsável:** Aprovador da caixinha

O aprovador analisa o título e pode:

### Opção A: Aprovar e Baixar
- Título vai a **status: `finished`**
- Pode informar número de baixa e data de baixa
- Saldo da caixinha é debitado automaticamente

### Opção B: Rejeitar
- Título vai a **status: `rejected`**
- É obrigatório informar observação

### Opção C: Enviar para Central de Serviços
- Título segue para análise de outro setor
- `centralServiceStatus` é preenchido pela central
- Pode ser rejeitado pela central também (`rejectSingleDocumentOnCentralService`)

---

## 4. Cancelamento de Baixa

O aprovador pode cancelar uma baixa já efetuada, devolvendo o título a um estado pendente. Requer observação obrigatória.

---

## 5. Fechamento (Prestação de Contas)

**Responsável:** Responsável pela caixinha

Periodicamente a caixinha é fechada via **Resumo**:
1. Seleciona os títulos do período
2. Define a data de fechamento
3. Aciona **"Fechar caixinha"** (`POST /little-box-summary/close`)

O resumo criado agrupa todos os títulos do período e segue o fluxo de aprovação por setores.

---

## 6. Fluxo de Aprovação do Resumo

O `LittleBoxSummary` percorre os seguintes status:

| Status | Descrição |
|--------|-----------|
| `WAITING_CENTRAL_SERVICE` | Aguardando análise da central de serviços |
| `WAITING_MANAGER` | Aguardando aprovação do gestor |
| `WAITING_BILLING` | Aguardando aprovação do fiscal/contábil |
| `WAITING_FINANCIAL` | Aguardando aprovação do financeiro |
| `REJECTED` | Resumo reprovado em alguma etapa |
| `COMPLETED` | Prestação de contas finalizada |

Cada transição de status é registrada no histórico (`LittleBoxSummaryHistory`), com data, usuário e observação.

---

## Fluxograma Resumido

```
[Colaborador] Lança título (despesa)
    ↓ status: pending
[Aprovador] Analisa título
    ↓
    ├─→ APROVADO → status: finished → Saldo debitado
    │
    └─→ REJEITADO → status: rejected → Volta ao colaborador

[Responsável] Fecha caixinha (Resumo)
    ↓ WAITING_CENTRAL_SERVICE
    ↓ WAITING_MANAGER
    ↓ WAITING_BILLING
    ↓ WAITING_FINANCIAL
    ↓ COMPLETED ✅
```

---

## Status dos Títulos

| Status | Descrição |
|--------|-----------|
| `pending` | Lançado, aguardando aprovação |
| `finished` | Aprovado e baixado |
| `rejected` | Reprovado pelo aprovador ou central de serviços |

---

## Regras de Negócio Importantes

### 1. Aprovadores
- ✅ Cada caixinha tem sua lista própria de aprovadores
- ❌ Usuário sem permissão não pode aprovar

### 2. Saldo
- ✅ Ao aprovar e baixar, o saldo da caixinha é reduzido
- ✅ Gestor pode repor saldo via "Adicionar Saldo"
- ❌ Não é possível lançar despesa em caixinha inativa

### 3. Anexos
- ✅ Títulos suportam upload de arquivos (comprovantes, notas)
- ✅ Resumos também suportam anexos

### 4. Histórico
- ✅ Toda movimentação do resumo é registrada com data, usuário e observação

---

## Perguntas Frequentes

### Como registro uma despesa na caixinha?
Acesse o módulo Caixinha, selecione a caixinha correspondente e clique em "Novo Título". Preencha os dados da despesa e salve. O título ficará aguardando aprovação.

### Meu título foi rejeitado. O que faço?
Verifique a observação do aprovador, corrija o problema (ex.: anexar comprovante correto) e reenvie.

### Como faço o fechamento da caixinha?
Acesse "Resumos", selecione o período, verifique os títulos incluídos e clique em "Fechar Caixinha". O resumo seguirá para aprovação por setores.

### O saldo da caixinha está incorreto. O que fazer?
O gestor pode acionar "Recalcular" ou "Adicionar Saldo" para corrigir. Verifique os títulos baixados do período.

### Posso cancelar uma baixa já efetuada?
Sim, desde que você tenha permissão de aprovador. Acesse o título, clique em "Cancelar Baixa" e informe uma observação.

---

## Glossário

- **Caixinha (LittleBox):** fundo fixo/petty cash identificado por sigla
- **Título (LittleBoxTitle):** lançamento individual de despesa
- **Resumo (LittleBoxSummary):** fechamento periódico agrupando títulos
- **Aprovador:** usuário autorizado a aprovar títulos de uma caixinha específica
- **Baixa:** confirmação de pagamento/aprovação do título
- **Prestação de contas:** processo de fechar e submeter o resumo para aprovação hierárquica
- **Natureza:** categoria/tipo da despesa
- **Centro de custo:** departamento ou área responsável pela despesa

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
