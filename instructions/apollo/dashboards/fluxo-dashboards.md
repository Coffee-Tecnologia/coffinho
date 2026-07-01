# Dashboards - Apollo

## Visão Geral
O Apollo oferece múltiplos dashboards para acompanhar em tempo real os principais indicadores dos módulos: **Pedidos de Compra**, **Documentos**, **NF-e**, **Clientes e Fornecedores** e **Orçamentos**. Os dados são segmentados por empresa e podem ser filtrados por período.

---

## 1. Dashboard de Pedidos de Compra

### Pedidos por Status
`GET /dashboard/purchase-orders/status`

Retorna a contagem de pedidos agrupados por status (`pending`, `finished`, `rejected`, `waiting`, `partial_served`). Permite filtrar por período e módulo.

**Quando usar:** para saber quantos pedidos estão em cada etapa do fluxo.

---

### Pedidos por Tipo de Pedido
`GET /dashboard/purchase-orders/type`

Agrupa pedidos pelo `orderType` (tipo do pedido). Útil para identificar o perfil das compras.

---

### Pedidos por Forma de Pagamento
`GET /dashboard/purchase-orders/payment-method`

Agrupa pedidos pela forma de pagamento (`paymentMethod`). Mostra quais métodos de pagamento são mais utilizados.

---

### Documentos Parados (Billing)
`GET /dashboard/purchase-orders/count-stopped-documments`

Indica pedidos que estão parados em alguma etapa sem movimentação. Útil para identificar gargalos no processo de aprovação.

---

### Alertas de Vencimento

Três endpoints de alerta para pedidos próximos ao vencimento:

| Endpoint | Quando dispara |
|----------|---------------|
| `GET /dashboard/purchase-orders/first-maturity-alert` | Vencimentos gerais próximos |
| `GET /dashboard/purchase-orders/fiscal-maturity-alert` | Vencimentos aguardando aprovação fiscal |
| `GET /dashboard/purchase-orders/requester-maturity-alert` | Vencimentos no lado do solicitante |

**Quando usar:** monitorar pedidos em risco de vencer sem aprovação.

---

### Últimos 12 Meses
`GET /pedidos-compras/last-twelve_month`

Série histórica mensal de pedidos nos últimos 12 meses. Útil para gráficos de tendência.

---

## 2. Dashboard de Documentos (Pedidos em Geral)

### Documentos por Status
`GET /dashboard/documents/status`

Contagem de documentos (pedidos de compra e assemelhados) por status atual.

---

### Documentos por Faixa de Valor
`GET /dashboard/documents/value-ranger`

Agrupa documentos em faixas de valor (ex.: R$0–500, R$500–2000, R$2000+). Útil para entender o perfil financeiro dos pedidos.

---

### Soma por Status
`GET /dashboard/documents/sum-by-status`

Retorna o **valor total (R$)** dos documentos agrupados por status. Diferente da contagem, mostra o impacto financeiro de cada etapa.

---

### Documentos por Faixa de Vencimento (Billing)
`GET /dashboard/billing/document-by-maturity-ranger`

Agrupa documentos por proximidade do vencimento (ex.: vencendo hoje, em 7 dias, em 30 dias, vencidos). Útil para priorização pelo financeiro.

---

## 3. Dashboard de NF-e

`GET /dashboard/nfe/summary`

Retorna um resumo completo do módulo DFe:

### Parâmetros
| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `companyId` | Não | ID da empresa (usa a do usuário logado se omitido) |
| `year` | Não | Ano de referência (padrão: ano atual) |
| `topIssuersLimit` | Não | Qtd. de top emitentes (padrão: 5) |
| `topExposureLimit` | Não | Qtd. de top exposição (padrão: 6) |

### O que retorna
- Total de notas no ano
- Total autorizado (status 100)
- Total não manifestado
- Top emitentes por quantidade/valor
- Distribuição mensal de notas
- Exposição por emitente

---

## 4. Dashboard de Histórico de Aprovações

### Aprovações vs. Rejeições por Mês
`GET /dashboard/history/approve-failed-line`

Gráfico de linha mostrando a evolução mês a mês de aprovações vs. rejeições pelo fiscal. Útil para identificar meses com alta taxa de reprovação.

---

### Aprovações vs. Rejeições por Usuário (Billing)
`GET /dashboard/history/approval-rejection-by-user-billing`

**Parâmetros:** `startDate`, `endDate`

Ranking dos usuários do fiscal por quantidade de aprovações e rejeições no período. Útil para acompanhar produtividade e qualidade das análises.

---

## 5. KPIs de Clientes e Fornecedores

### KPI de Clientes
`GET /dashboard/clients/kpi`

Indicadores dos clientes da empresa:
- Total de clientes ativos
- Clientes com documentos em aberto
- Valor total em aberto por cliente

---

### KPI de Fornecedores
`GET /dashboard/providers/kpi`

Indicadores dos fornecedores:
- Total de fornecedores com pedidos ativos
- Top fornecedores por volume de pedidos
- Valor total por fornecedor

---

## 6. Dashboard de Orçamentos
`GET /budgets/dashboard`

Métricas específicas do módulo de orçamentos:
- Quantidade por status (UNDER_REVIEW, APPROVED, DECLINED)
- Valor total em cada status
- Evolução no período

---

## 7. Dashboard de Caixinha
`GET /little-box-title/last-twelve_month`

Série histórica mensal de lançamentos de caixinha nos últimos 12 meses.

---

## Resumo dos Endpoints

| Módulo | Endpoint | O que retorna |
|--------|----------|--------------|
| Pedidos | `/dashboard/purchase-orders/status` | Contagem por status |
| Pedidos | `/dashboard/purchase-orders/type` | Contagem por tipo |
| Pedidos | `/dashboard/purchase-orders/payment-method` | Contagem por forma de pagamento |
| Pedidos | `/dashboard/purchase-orders/count-stopped-documments` | Documentos parados |
| Pedidos | `/dashboard/purchase-orders/first-maturity-alert` | Alerta de vencimento geral |
| Pedidos | `/dashboard/purchase-orders/fiscal-maturity-alert` | Alerta de vencimento fiscal |
| Pedidos | `/dashboard/purchase-orders/requester-maturity-alert` | Alerta de vencimento solicitante |
| Documentos | `/dashboard/documents/status` | Contagem de docs por status |
| Documentos | `/dashboard/documents/value-ranger` | Docs por faixa de valor |
| Documentos | `/dashboard/documents/sum-by-status` | Soma financeira por status |
| Documentos | `/dashboard/billing/document-by-maturity-ranger` | Docs por faixa de vencimento |
| NF-e | `/dashboard/nfe/summary` | Resumo anual de NF-e |
| Aprovações | `/dashboard/history/approve-failed-line` | Aprovações vs. rejeições por mês |
| Aprovações | `/dashboard/history/approval-rejection-by-user-billing` | Ranking de usuários fiscal |
| Clientes | `/dashboard/clients/kpi` | KPIs de clientes |
| Fornecedores | `/dashboard/providers/kpi` | KPIs de fornecedores |
| Orçamentos | `/budgets/dashboard` | Métricas de orçamentos |
| Caixinha | `/little-box-title/last-twelve_month` | Histórico mensal caixinha |

---

## Regras de Negócio Importantes

### 1. Segmentação por Empresa
- ✅ Todos os dados são filtrados pela empresa do usuário logado
- ✅ Alguns endpoints aceitam `companyId` explícito (ex.: NF-e summary)

### 2. Filtros de Período
- ✅ A maioria dos endpoints aceita `startDate` e `endDate`
- ✅ Datas em formato `LocalDateTime` ou `LocalDate`

### 3. Aprovações vs. Rejeições por Usuário
- ✅ Requer `startDate` e `endDate` obrigatórios
- ✅ Retorna ranking de todos os usuários do fiscal no período

---

## Perguntas Frequentes

### Como vejo quantos pedidos estão aguardando aprovação fiscal?
Acesse o Dashboard de Pedidos e veja o card "Por Status". O status `pending` no `billingStatus` representa pedidos na fila fiscal.

### Tem como ver quais pedidos vão vencer em breve?
Sim. Os alertas de vencimento (`/dashboard/purchase-orders/first-maturity-alert` e variantes) mostram pedidos com vencimentos próximos.

### Como acompanho o desempenho do time fiscal?
Use o endpoint de aprovações por usuário (`approval-rejection-by-user-billing`), selecionando o período desejado.

### Onde vejo o resumo anual de notas fiscais recebidas?
No Dashboard de NF-e (`/dashboard/nfe/summary`). Mostra total de notas, autorizadas, não manifestadas e top emitentes.

### Como vejo o valor total em pedidos aprovados?
Use `GET /dashboard/documents/sum-by-status`. Ele retorna a soma financeira de cada status, não apenas a contagem.

---

## Glossário

- **KPI:** Key Performance Indicator — indicador-chave de desempenho
- **Status:** situação atual do pedido/documento
- **Faixa de valor:** agrupamento de documentos por intervalos de valor
- **Faixa de vencimento:** agrupamento por proximidade da data de vencimento
- **Documentos parados:** pedidos sem movimentação há mais tempo que o esperado
- **Alerta de vencimento:** aviso de pedidos com data de vencimento próxima ou já vencida
- **Top emitentes:** fornecedores que mais emitiram notas no período
- **Aprovações vs. rejeições:** comparativo de decisões do fiscal/financeiro

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
