# Fiscal - Apollo

## Visão Geral
O módulo **Fiscal** é a fila de trabalho do time fiscal/contábil. Centraliza os **Pedidos de Compra** e **Documentos Avulsos** que aguardam análise e aprovação fiscal, além da visão fiscal da **Caixinha**. É a etapa intermediária entre o solicitante e o financeiro.

---

## 1. Fiscal / Pedidos

**Rota:** `/fiscal/pedidos`

Listagem dos pedidos de compra que estão na fila de análise fiscal. O fiscal analisa, aprova ou reprova cada pedido antes de seguir ao financeiro.

### Abas
| Aba | O que mostra |
|-----|-------------|
| **Pendentes** | billingStatus: `pending` ou `rejected` — fila de trabalho principal |
| **Rejeitados Fin** | Pedidos rejeitados pelo financeiro (`billingStatus: rejected`) |
| **Rejeitados Fis** | Pedidos rejeitados pelo próprio fiscal (`status: rejected`) |
| **Finalizados** | billingStatus: `finished` — já aprovados |
| **Parcial** | billingStatus: `partial_served` — atendimento parcial |
| **Todos** | Visão completa sem filtro |

### Filtros disponíveis
| Filtro | Campo |
|--------|-------|
| Busca livre | Número, fornecedor ou observação |
| Filial | Código da filial |
| Espécie | Tipo financeiro (NF, boleto, etc.) |
| Solicitante | Nome do comprador/solicitante |
| Vencimento | Período de firstMaturity |
| F. Pagamento | Forma de pagamento |
| Recebido em | Data em que chegou ao fiscal (sendToBillingAt) |

### Colunas da tabela
- Filial, Número, Item, Espécie, Fornecedor, Observação, Solicitante, Vencimento, F. Pagamento, Recebido em, Anexo, Status

### Ações por pedido
| Ação | Condição |
|------|----------|
| **Detalhes** | Sempre |
| **Aprovar** | billingStatus não for `finished` nem `waiting` |
| **Reprovar** | Sempre disponível |

### Ao aprovar
- O fiscal pode aprovar **totalmente** (`status: finished`) ou **parcialmente** (`status: partial_served`)
- `billingStatus` → `pending` (encaminha ao financeiro)
- Registra `sendToBillingAt` com data/hora atual

### Ao reprovar
- `status` → `rejected`
- `billingStatus` e `financialStatus` → `waiting`
- Observação de reprovação é **obrigatória**
- Pedido retorna ao solicitante

### Exportação
- Relatório exportável via botão na barra de ações

---

## 2. Fiscal / Documentos Avulsos

**Rota:** `/fiscal/documentos-avulsos`

Documentos avulsos (não vinculados a pedido de compra do Protheus) que chegaram para análise fiscal. São lançamentos manuais de qualquer tipo (NF, boleto, reembolso, etc.).

### Abas
| Aba | O que mostra |
|-----|-------------|
| **Pendentes** | billingStatus: `pending` — aguardando fiscal |
| **Finalizados** | billingStatus: `finished` — já aprovados |
| **Todos** | Visão completa |

### Filtros disponíveis
- Busca livre (número, solicitante, observação)
- Recebido em (período)
- Vencimento (período)

### Colunas da tabela
- Número, Solicitante, Recebido em, Observação, Vencimento, Tipo, Valor, Fornecedor, Aprovado por, Status, Anexo

### Ações
| Ação | Condição |
|------|----------|
| **Aprovar** | billingStatus não for `finished` nem `waiting` |
| **Reprovar** | billingStatus não for `finished` |
| **Detalhes** | Sempre |

---

## 3. Fiscal / Caixinha

**Rota:** `/fiscal/caixinha`

Visão do fiscal sobre os resumos de caixinha que chegaram para aprovação fiscal (status `WAITING_BILLING`). O fiscal aprova ou rejeita a prestação de contas.

---

## Fluxo Fiscal

```
[Solicitante envia ao Fiscal]
        ↓
[Fiscal] recebe em "Pedidos" aba Pendentes
        ↓
Fiscal analisa: fornecedor, valor, vencimento, anexos, observações
        ↓
    ├─→ APROVAR (total)   → status: finished | billingStatus: pending → vai ao Financeiro
    ├─→ APROVAR (parcial) → status: partial_served | billingStatus: pending → vai ao Financeiro
    └─→ REPROVAR          → status: rejected → volta ao Solicitante com observação
```

---

## Regras de Negócio

### 1. Fluxo de Aprovação
- ✅ Fiscal só vê pedidos que estão com `billingStatus: pending` ou `rejected`
- ✅ Após aprovação fiscal, pedido vai automaticamente para o Financeiro
- ❌ Pedido com `billingStatus: waiting` ainda não chegou ao fiscal (solicitante ainda não enviou)

### 2. Reprovação
- ✅ Observação é **obrigatória**
- ✅ Pedido volta ao solicitante com `status: rejected`
- ✅ Solicitante pode corrigir e reenviar

### 3. Rejeitados Financeiro
- ✅ Aba "Rejeitados Fin" mostra pedidos que o financeiro devolveu
- ✅ Fiscal pode analisar novamente e reenviar

### 4. Atendimento Parcial
- ✅ Quando apenas parte do pedido foi atendida, fiscal usa "Parcial"
- ✅ Indica ao financeiro que o pagamento pode ser parcial

---

## Perguntas Frequentes

### Como vejo os pedidos que preciso analisar?
Acesse Fiscal → Pedidos. A aba "Pendentes" é sua fila de trabalho principal.

### O que significa a aba "Rejeitados Fin"?
São pedidos que você aprovou, mas o financeiro devolveu. Verifique a observação do financeiro e decida se reenvia ou não.

### Posso filtrar por solicitante?
Sim, use o chip "Solicitante" na barra de filtros.

### Qual é a diferença entre Pedidos e Documentos Avulsos?
**Pedidos** vêm do Protheus (compras formais). **Documentos Avulsos** são lançamentos manuais — reembolsos, despesas pontuais, etc.

### O que é "Recebido em"?
É a data/hora em que o pedido chegou ao fiscal (quando o solicitante clicou em "Enviar ao Fiscal").

### Posso ver o histórico de aprovações?
Sim, em "Detalhes" do pedido você vê todo o histórico de movimentações.

---

## Glossário

- **billingStatus:** status do pedido na etapa fiscal
- **pending:** aguardando ação do fiscal
- **finished:** fiscal aprovou
- **rejected:** fiscal ou financeiro reprovou
- **partial_served:** aprovação parcial do pedido
- **waiting:** ainda não chegou ao fiscal
- **Espécie:** tipo do documento financeiro (NF, boleto, etc.)
- **F. Pagamento:** forma de pagamento do pedido
- **Recebido em:** data em que o pedido entrou na fila fiscal
- **Solicitante:** usuário que criou/enviou o pedido
- **Documentos Avulsos:** lançamentos manuais sem vínculo com pedido Protheus

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
