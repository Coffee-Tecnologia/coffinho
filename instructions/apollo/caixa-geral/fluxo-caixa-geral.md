# Caixa Geral (MasterBox) - Apollo

## Visão Geral
O **Caixa Geral** (MasterBox) é o módulo de controle do fluxo de caixa geral da empresa no Apollo. Registra todas as entradas e saídas financeiras, permitindo acompanhar o saldo atual, gerar relatórios e efetuar baixas de provisões.

---

## 1. O que é uma Entrada no Caixa Geral?

Cada lançamento (entrada ou saída) contém:
- **Número:** identificador sequencial do lançamento
- **Descrição:** descrição do movimento
- **Fornecedor/Origem:** quem originou o movimento
- **Valor:** valor do item
- **Total:** valor total calculado
- **Data de emissão**
- **Tipo de transação (transactionType):** entrada ou saída
- **PSC (psc):** status de provisão — `PENDING` ou `CLEARED`
- **Data de baixa (discharge_date):** quando foi baixado/compensado
- **Observação**
- **Saldo anterior (previous_total):** saldo antes deste lançamento
- **Sequência:** ordem dos lançamentos na data

---

## 2. Consulta e Filtros

O caixa geral pode ser consultado por:
- Período (data de emissão)
- Tipo de transação
- Status de provisão (PSC)
- Fornecedor

A listagem retorna os lançamentos ordenados por **data de emissão + sequência** e inclui o **total acumulado** do período.

---

## 3. Saldo Atual

**Endpoint:** `GET /master-box/current-amount`

Retorna o saldo atual do caixa da empresa. O sistema percorre todos os lançamentos e calcula o saldo corrente.

---

## 4. Recalcular Saldo

Caso haja inconsistência no saldo (ex.: lançamentos importados fora de ordem), é possível acionar o **Recalcular** (`POST /master-box/recalculate`). O sistema recalcula todos os saldos sequencialmente.

⚠️ **Use com cautela:** reprocessa todos os registros da empresa.

---

## 5. Baixa de Provisão (PSC Discharge)

Lançamentos do tipo **provisão (PSC = PENDING)** precisam ser baixados quando a movimentação financeira é confirmada.

**Ação:** `PUT /master-box/{id}/discharge/{dischargeDate}`

- PSC muda de `PENDING` → `CLEARED`
- Data de baixa é registrada

---

## 6. Relatório

**Endpoint:** `GET /master-box/report` (retorna PDF)

Gera relatório de caixa geral com filtros aplicados, incluindo:
- Listagem de lançamentos do período
- Totais e saldo

---

## Fluxograma Resumido

```
[Usuário/Sistema] Registra lançamento
    ↓
[Apollo] Calcula saldo acumulado
    ↓
Lançamento fica com PSC = PENDING (se for provisão)
    ↓
[Financeiro] Confirma movimentação
    ↓
[Apollo] Baixa PSC → status CLEARED
    ↓
✅ Lançamento finalizado
```

---

## Status de Provisão (PSC)

| Status | Descrição |
|--------|-----------|
| `PENDING` | Provisão ainda não compensada |
| `CLEARED` | Baixada / compensada |

---

## Regras de Negócio Importantes

### 1. Sequência de Lançamentos
- ✅ Lançamentos na mesma data são ordenados por sequência
- ✅ O saldo anterior de cada lançamento reflete o saldo após o item anterior

### 2. Recalcular
- ✅ Disponível quando o saldo está inconsistente
- ⚠️ Reprocessa todos os lançamentos da empresa

### 3. Baixa PSC
- ✅ Requer data de baixa
- ✅ Provisões não baixadas aparecem como `PENDING`
- ❌ Baixa não pode ser desfeita pelo fluxo padrão

---

## Perguntas Frequentes

### Como consulto o saldo atual do caixa?
Acesse o módulo Caixa Geral. O saldo atual é exibido no topo, calculado com base em todos os lançamentos registrados.

### O saldo está errado, o que faço?
Acione o botão "Recalcular" no Caixa Geral. O sistema recalculará todos os saldos em sequência.

### O que é PSC / Provisão?
PSC é um lançamento provisório — registrado antes da confirmação financeira. Quando o movimento é confirmado, o status muda para `CLEARED` (baixado).

### Como gero o relatório do caixa?
Acesse "Relatório" no Caixa Geral, filtre o período desejado e clique em "Gerar PDF".

### Posso filtrar por tipo de lançamento (entrada/saída)?
Sim, utilize o filtro de "Tipo de Transação" na listagem.

---

## Glossário

- **MasterBox:** módulo de caixa geral
- **PSC (Provisão):** lançamento pendente de confirmação financeira
- **PENDING:** provisão ainda não baixada
- **CLEARED:** provisão baixada/compensada
- **Discharge:** baixa da provisão, confirmando o movimento financeiro
- **Recalcular:** reprocessar todos os saldos do caixa
- **Saldo anterior (previous_total):** saldo do caixa imediatamente antes do lançamento

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
