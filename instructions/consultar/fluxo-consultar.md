# Consultar - Apollo

## Visão Geral

O módulo **Consultar** (`/consultar`) é uma ferramenta de **pesquisa avançada** que permite buscar documentos, pedidos de compra e registros financeiros em um único lugar, sem precisar navegar por cada módulo individualmente.

---

## Abas disponíveis

O acesso às abas depende dos módulos e permissões do usuário:

### Aba 1 — Documentos
Busca de **documentos avulsos** (A Pagar, A Receber e outros tipos). Equivale a uma visão centralizada de `Documentos Avulsos`, mas com filtros de pesquisa avançada.

**Permissão necessária:** `SEARCH_SINGLE_DOCUMENTS`

### Aba 2 — Pedidos
Busca de **pedidos de compra** sincronizados do Protheus.

**Permissão necessária:** `SEARCH_PURCHASE_ORDER`

Disponível apenas para usuários com o módulo Protheus habilitado.

### Aba 3 — Documentos no Financeiro
Busca de **documentos financeiros** — os títulos que chegaram ao módulo Financeiro (aprovados pelo fiscal).

**Permissão necessária:** `SEARCH_FINANCIAL`

---

## Comportamento por perfil

| Perfil | Abas visíveis |
|--------|--------------|
| Usuário com módulo Protheus | Documentos + Pedidos + Documentos no Financeiro |
| Usuário sem módulo Protheus | Apenas Documentos (documentos avulsos) |

---

## Quando usar

- Encontrar um documento específico sem saber em qual módulo ele está
- Pesquisar pedido de compra por número ou fornecedor
- Verificar se um documento já chegou ao financeiro
- Consulta rápida sem precisar navegar por Fiscal → Financeiro → Documentos

---

## Fluxo de uso

```
[Usuário acessa /consultar]
        ↓
Seleciona a aba: Documentos / Pedidos / Documentos no Financeiro
        ↓
Aplica filtros de busca (número, período, fornecedor, status...)
        ↓
Visualiza resultado e clica para ver detalhes
```

---

## Perguntas Frequentes

### Não consigo ver a aba "Pedidos". Por quê?
A aba só aparece se o módulo Protheus estiver habilitado para o seu perfil e se você tiver a permissão `SEARCH_PURCHASE_ORDER`. Contate o administrador.

### Qual a diferença entre "Documentos" e "Documentos no Financeiro"?
"Documentos" são os avulsos (A Pagar, A Receber) em qualquer status. "Documentos no Financeiro" são os títulos que passaram pelo fiscal e chegaram para aprovação do financeiro.

### Posso usar o Consultar para exportar dados?
Não diretamente. Use os módulos específicos (Financeiro, Fiscal, Documentos) ou o módulo Relatórios para exportação.

---

## Glossário

- **Documentos avulsos:** lançamentos manuais sem vínculo com Protheus (A Pagar, A Receber)
- **Pedidos de compra:** pedidos sincronizados do Protheus
- **Documentos financeiros:** títulos que chegaram ao módulo Financeiro após aprovação fiscal
- **Módulo Protheus:** integração com o ERP Protheus da TOTVS

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
