# Relatórios - Apollo

## Visão Geral

O módulo **Relatórios** (`/relatorios`) centraliza a geração e exportação de relatórios de todos os módulos do Apollo. O usuário seleciona o tipo de relatório, aplica filtros e exporta em PDF ou planilha.

---

## Acesso

**Rota:** `/relatorios`

A página principal exibe cards de relatório organizados em categorias. O usuário pode buscar por nome ou filtrar pela categoria.

---

## Categorias de Relatório

| Categoria | Relatórios incluídos |
|-----------|---------------------|
| **Financeiro** | Documentos financeiros, A Pagar, A Receber |
| **Pedidos** | Pedidos de compra |
| **Caixinha** | Movimentos e resumos de caixinha |
| **DFe** | Documentos fiscais eletrônicos |
| **Orçamentos** | Orçamentos e propostas |
| **Documentos Fiscais** | NF-e, NFS-e, CT-e |

---

## Relatórios Disponíveis

### Financeiro
**Relatório Financeiro** — documentos financeiros do módulo financeiro com filtros de período, status e empresa.

### Pedidos de Compra
**Relatório de Pedidos** — pedidos de compra sincronizados do Protheus com filtro por período, fornecedor e status.

### Caixinha
**Relatório de Caixinha** — lançamentos e resumos de caixinha por período e caixinha selecionada.

### DFe (Documentos Fiscais Eletrônicos)
**Relatório DFe** — visão consolidada de documentos fiscais eletrônicos recebidos.

### A Pagar
**Relatório A Pagar** — documentos avulsos do tipo A Pagar com filtro por período e status.

### A Receber
**Relatório A Receber** — documentos avulsos do tipo A Receber com filtro por período e status.

### Orçamentos
**Relatório de Orçamentos** — orçamentos com filtro por status, período e cliente.

### Documentos Fiscais
**NF-e de Entrada** — notas de entrada por tipo, status, faixa de valor e período.

**NF-e de Saída** — notas emitidas no período selecionado.

**NFS-e** — notas fiscais de serviço emitidas no período.

**CT-e** — conhecimentos de transporte com filtro por papel no CT-e e período.

> ⚠️ Alguns relatórios estão em construção e podem não funcionar completamente. Contate o suporte se necessário.

---

## Como gerar um relatório

1. Acesse **Relatórios** no menu
2. Localize o relatório desejado (use a busca ou filtre por categoria)
3. Clique no card para expandir o formulário de filtros
4. Preencha os parâmetros (período, empresa, status, etc.)
5. Clique em **Gerar** ou **Exportar**

---

## Relatórios NF-e (sub-módulo DFe)

Os relatórios específicos de NF-e também estão disponíveis em `/dfe/relatorios-nfe` com foco em:
- Relatório Mensal de compliance DFe
- NF-e por período e situação
- NFS-e emitidas
- CT-e do período

---

## Perguntas Frequentes

### Qual a diferença entre /relatorios e /dfe/relatorios-nfe?
`/relatorios` cobre todos os módulos (financeiro, pedidos, caixinha, orçamentos, documentos fiscais). `/dfe/relatorios-nfe` é específico para documentos fiscais eletrônicos com foco em análise de compliance.

### Como filtro por empresa?
A maioria dos relatórios tem um seletor de empresa no formulário. Se não aparecer, o relatório usa a empresa do usuário logado.

### O relatório pode ser exportado?
Sim, os relatórios suportam exportação em PDF ou planilha (dependendo do tipo). Clique no botão de exportação após configurar os filtros.

---

## Glossário

- **Card de relatório:** elemento visual que representa um relatório disponível
- **Categoria:** agrupamento de relatórios por área do sistema
- **Período:** intervalo de datas usado como filtro principal

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
