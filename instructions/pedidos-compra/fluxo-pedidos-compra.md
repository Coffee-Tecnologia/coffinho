# Pedidos de Compra - Apollo

## Visão Geral
O módulo de **Pedidos de Compra** do Apollo gerencia o ciclo completo de pedidos de compra, desde a sincronização com o sistema externo (Protheus) até o pagamento final. O pedido passa por três etapas de aprovação: **Fiscal**, **Financeiro** e **Financeiro (Baixa)**.

---

## 1. Origem dos Pedidos

Os pedidos de compra podem ser criados de duas formas:

### A) Sincronização com o Protheus
1. Usuário acessa o Apollo
2. Clica em **"Sincronizar"** (`POST /pedidos-compras/synchronize-purchase-order`)
3. Apollo busca pedidos no Protheus vinculados ao **código do usuário**
4. Pedidos são importados e ficam com:
   - `status: pending`
   - `billingStatus: waiting`
   - `financialStatus: waiting`

⚠️ **IMPORTANTE:** O código do usuário no Protheus é obrigatório no cadastro. Sem ele, a sincronização não traz pedidos.

### B) Sincronização Automática (Cron)
O sistema pode sincronizar automaticamente via `POST /pedidos-compras/synchronize-by-cron`.

---

## 2. Preparação do Pedido (Usuário/Solicitante)

Após sincronizado, o solicitante deve:
1. Anexar documentos (nota fiscal, boleto, etc.)
2. Informar data de vencimento
3. Adicionar informações complementares
4. Enviar ao Fiscal

⚠️ **REGRA:** Sem documentos, o fiscal pode rejeitar o pedido.

---

## 3. Análise Fiscal (Billing)

**Responsável:** Fiscal / Contábil

O fiscal analisa o pedido e pode:

### Opção A: Aprovar
- `status` → `finished` (ou `partial_served` se atendimento parcial)
- `billingStatus` → `pending`
- Pedido segue para o Financeiro

### Opção B: Reprovar
- `status` → `rejected`
- `billingStatus` → `waiting`
- `financialStatus` → `waiting`
- **Obrigatório:** informar observação de reprovação
- Pedido volta ao solicitante para correção

---

## 4. Fluxo de Reprovação Fiscal

1. Pedido volta ao solicitante com `status: rejected`
2. Observação do fiscal fica visível
3. Solicitante corrige e reenvia ao fiscal
4. Fiscal analisa novamente

**Este ciclo se repete até aprovação.**

---

## 5. Análise Financeira

**Responsável:** Financeiro

Após aprovação fiscal, o financeiro analisa o pedido:

### Opção A: Aprovar (Baixa Financeira)
- `billingStatus` → `finished`
- `financialStatus` → `pending`
- Pedido registra data de envio ao financeiro (`sendToFinancialAt`)
- Pode gerar lançamento no Caixa Geral

### Opção B: Reprovar
- `billingStatus` → `waiting`
- `financialStatus` → `waiting`
- `status` → `rejected`
- **Obrigatório:** informar observação

---

## 6. Status do Pedido

O pedido tem **três dimensões de status**:

### `status` (status geral do pedido)
| Valor | Descrição |
|-------|-----------|
| `pending` | Aguardando análise fiscal |
| `finished` | Aprovado pelo fiscal |
| `partial_served` | Atendimento parcial aprovado |
| `rejected` | Reprovado (fiscal ou financeiro) |
| `waiting` | Em espera |

### `billingStatus` (status no fiscal)
| Valor | Descrição |
|-------|-----------|
| `waiting` | Não chegou ao fiscal ainda |
| `pending` | Em análise pelo fiscal |
| `finished` | Fiscal aprovou |

### `financialStatus` (status no financeiro)
| Valor | Descrição |
|-------|-----------|
| `waiting` | Não chegou ao financeiro ainda |
| `pending` | Em análise pelo financeiro |
| `finished` | Financeiro aprovou/baixou |

---

## 7. Documentos Vinculados

Cada pedido pode ter documentos anexados:
- Notas fiscais
- Boletos
- Comprovantes

`GET /pedidos-compras/{id}/documentos` retorna os documentos vinculados.

---

## 8. Relatórios e Exportação

- **Relatório por status:** listagem de pedidos filtrada por status
- **Relatório financeiro:** listagem por status financeiro
- **ZIP de arquivos:** exportação em massa dos documentos anexados

---

## Fluxograma Resumido

```
[Protheus] Pedido criado
    ↓
[Apollo] Usuário sincroniza → status: pending
    ↓
[Apollo] Usuário anexa documentos
    ↓
[Apollo] Envio ao Fiscal
    ↓
[Fiscal] Analisa pedido
    ↓
    ├─→ APROVADO
    │      status: finished | billingStatus: pending
    │      ↓
    │   [Financeiro] Analisa
    │      ↓
    │      ├─→ APROVADO (baixa) → financialStatus: pending
    │      │      ↓
    │      │   ✅ FINALIZADO → financialStatus: finished
    │      │
    │      └─→ REPROVADO → status: rejected → volta ao usuário
    │
    └─→ REPROVADO
           status: rejected
           ↓
        [Usuário] Corrige e reenvia
           ↓
        (volta ao Fiscal)
```

---

## Regras de Negócio Importantes

### 1. Código do Usuário no Protheus
- ✅ Obrigatório no cadastro do usuário
- ❌ Sem código = não sincroniza pedidos

### 2. Documentos Anexados
- ✅ Documentos podem ser anexados em qualquer etapa
- ✅ Fiscal pode exigir documentação para aprovar

### 3. Observação na Reprovação
- ✅ Obrigatória ao reprovar (fiscal ou financeiro)
- ✅ Usuário vê o motivo da reprovação

### 4. Atendimento Parcial
- ✅ Fiscal pode aprovar parcialmente (`partial_served`)
- ✅ Indica que apenas parte do pedido foi atendida

### 5. Datas Importantes
- `firstMaturity`: data do primeiro vencimento
- `sendToBillingAt`: quando foi enviado ao fiscal
- `sendToFinancialAt`: quando foi enviado ao financeiro
- `lastMovimentDate`: última movimentação do pedido

---

## Perguntas Frequentes

### Como sincronizo meus pedidos de compra?
Acesse o módulo Pedidos de Compra e clique em "Sincronizar". O sistema buscará automaticamente os pedidos vinculados ao seu código de usuário no Protheus.

### Meu pedido foi reprovado. O que fazer?
Verifique a observação deixada pelo fiscal (ou financeiro), corrija o problema apontado e reenvie para análise.

### O que significa "atendimento parcial"?
Significa que o fiscal aprovou apenas parte do pedido. Verifique quais itens foram atendidos e entre em contato com o fiscal para detalhes.

### Como vejo os documentos anexados ao pedido?
Na tela do pedido, acesse a aba de documentos ou clique em "Ver Documentos".

### Posso filtrar pedidos por solicitante?
Sim. Use o filtro "Solicitantes" disponível na listagem de pedidos.

### Como exporto os documentos em massa?
Use a funcionalidade "Gerar ZIP" na listagem de pedidos, aplicando os filtros desejados.

---

## Glossário

- **Protheus:** sistema ERP onde os pedidos são originados
- **Sincronizar:** importar pedidos do Protheus para o Apollo
- **Fiscal / Billing:** responsável pela análise contábil/fiscal dos pedidos
- **Financeiro:** responsável pelo pagamento e baixa financeira
- **Baixa:** confirmação de pagamento
- **status:** situação geral do pedido
- **billingStatus:** situação no processo fiscal
- **financialStatus:** situação no processo financeiro
- **Solicitante (requester):** quem criou/solicitou o pedido
- **Comprador (buyer):** responsável pela compra no Protheus
- **Vencimento (firstMaturity):** data do primeiro vencimento do pedido
- **Atendimento parcial:** aprovação de apenas parte do pedido

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
