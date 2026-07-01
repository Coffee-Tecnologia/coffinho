# Financeiro - Apollo

## Visão Geral
O módulo **Financeiro** é a visão do time financeiro sobre os documentos que chegam para pagamento ou recebimento. Agrupa três frentes: **Documentos** (do Protheus), **A Pagar** e **A Receber** (documentos avulsos), além da visão financeira da **Caixinha**.

---

## 1. Financeiro / Documentos

**Rota:** `/financeiro/documentos`

Listagem dos documentos financeiros vindos do Protheus aguardando aprovação ou já finalizados pelo financeiro.

### Abas
| Aba | O que mostra |
|-----|-------------|
| **Pendentes** | Documentos aguardando ação do financeiro |
| **Finalizados** | Documentos já aprovados/baixados |
| **Todos** | Visão completa sem filtro de status |

### Colunas da tabela
- Filial
- Documento (número)
- Parcela
- Fornecedor (código + nome)
- Loja
- Valor
- Vencimento
- R. Vencimento (vencimento real)
- Aprovador
- Anexo
- Status

### Filtros disponíveis
- Busca por texto livre
- Filtro de período por **vencimento** (chips de data)
- Pesquisa avançada (modal)

### Ações por documento
| Ação | Quando disponível |
|------|------------------|
| **Detalhes** | Sempre |
| **Aprovar** | Quando status não for `finished` |
| **Reprovar** | Quando status não for `finished` |

### Exportação
- Relatório exportável via botão na barra de ações

---

## 2. Financeiro / A Pagar

**Rota:** `/financeiro/a-pagar`

Documentos avulsos do tipo **A Pagar** — lançamentos manuais que precisam ser pagos. Mesmo comportamento de Documentos Avulsos, filtrado pelo tipo `A_PAGAR`.

Ações disponíveis: **Aprovar**, **Reprovar**, **Detalhes**, **Anexar**.

---

## 3. Financeiro / A Receber

**Rota:** `/financeiro/a-receber`

Documentos avulsos do tipo **A Receber** — valores a receber. Mesmo comportamento de Documentos Avulsos, filtrado pelo tipo `A_RECEBER`.

---

## 4. Financeiro / Caixinha

**Rota:** `/financeiro/caixinha`

Visão do financeiro sobre as prestações de contas de caixinha que chegaram para aprovação final (status `WAITING_FINANCIAL`). O financeiro aprova ou rejeita o resumo.

---

## Fluxo Geral do Financeiro

```
[Fiscal aprova pedido] → billingStatus: finished
        ↓
[Financeiro] recebe em "Documentos" com status pendente
        ↓
[Financeiro] analisa: verifica valores, vencimentos, anexos
        ↓
    ├─→ APROVAR → documento finalizado ✅
    └─→ REPROVAR → retorna com observação ❌
```

---

## Status no Financeiro

| Status financialStatus | Significado |
|----------------------|-------------|
| `waiting` | Ainda não chegou ao financeiro |
| `pending` | Aguardando ação do financeiro |
| `finished` | Aprovado/baixado pelo financeiro |

---

## Regras de Negócio

### 1. Pré-requisito para chegar ao Financeiro
- ✅ O documento precisa ter sido **aprovado pelo Fiscal** antes
- ❌ Documentos reprovados pelo fiscal não chegam ao financeiro

### 2. Aprovação
- ✅ Ao aprovar, o documento muda para `financialStatus: finished`
- ✅ Pode gerar lançamento automático no Caixa Geral

### 3. Reprovação
- ✅ Obrigatório informar observação
- ✅ Documento retorna para o solicitante com status `rejected`

### 4. Anexos
- ✅ Financeiro pode visualizar e adicionar anexos em qualquer momento

---

## Perguntas Frequentes

### Como vejo os documentos que preciso aprovar?
Acesse Financeiro → Documentos. A aba "Pendentes" mostra todos aguardando sua ação.

### Como filtro por data de vencimento?
Use o chip "Vencimento" na barra de filtros para selecionar um período.

### O que é "R. Vencimento"?
É o vencimento real — pode diferir do vencimento original quando há renegociação ou prorrogação.

### Posso aprovar um documento sem anexo?
Sim, desde que o fiscal já tenha aprovado. Mas é recomendável verificar se o comprovante está anexado.

### Qual a diferença entre A Pagar e Documentos?
**Documentos** vêm do Protheus (pedidos de compra). **A Pagar** são lançamentos avulsos criados manualmente no Apollo.

---

## Glossário

- **Documentos:** títulos financeiros originados de pedidos de compra no Protheus
- **A Pagar:** documentos avulsos com obrigação de pagamento
- **A Receber:** documentos avulsos com direito a recebimento
- **Parcela:** número da parcela do documento (quando parcelado)
- **R. Vencimento:** vencimento real (pode diferir do original)
- **Aprovador:** usuário que aprovou o documento no financeiro

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
