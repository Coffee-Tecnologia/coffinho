# Documentos (Visão do Solicitante) - Apollo

## Visão Geral
O módulo **Documentos** é a área do **solicitante/usuário comum**. Aqui ele cria, acompanha e gerencia seus próprios pedidos, documentos avulsos e movimentações de caixinha. É o ponto de entrada de qualquer solicitação no Apollo.

---

## 1. Documentos / Pedidos de Compra

**Rota:** `/documentos/pedidos`

Visão do solicitante sobre seus pedidos de compra sincronizados do Protheus. O fluxo completo está documentado em `pedidos-compra/fluxo-pedidos-compra.md`.

**Resumo das ações disponíveis aqui:**
- Sincronizar pedidos do Protheus
- Anexar nota fiscal e documentos
- Enviar ao fiscal
- Acompanhar status (pending → fiscal → financeiro → finished)
- Visualizar observações de reprovação

---

## 2. Documentos / Caixinha

O módulo de caixinha no contexto do solicitante tem **três sub-rotas**:

### 2.1 Manutenção (`/documentos/caixinha/manutencao`)
Cadastro e configuração das caixinhas:
- Criar nova caixinha (nome, sigla)
- Editar caixinha existente
- Definir aprovadores
- Adicionar saldo (reposição de fundo)
- Inativar/excluir caixinha

### 2.2 Movimentos (`/documentos/caixinha/movimentos`)
Lançamento e acompanhamento de títulos (despesas):
- Registrar nova despesa
- Informar: valor, fornecedor, natureza, centro de custo, classe de valor, vencimento, observação
- Anexar comprovantes
- Acompanhar status: `pending` → `finished` / `rejected`
- Reenviar título rejeitado após correção

### 2.3 Resumo (`/documentos/caixinha/resumo`)
Prestação de contas periódica:
- Visualizar resumos abertos e fechados
- Fechar caixinha (selecionar títulos do período + data de fechamento)
- Acompanhar status do resumo: `WAITING_CENTRAL_SERVICE` → `WAITING_MANAGER` → `WAITING_BILLING` → `WAITING_FINANCIAL` → `COMPLETED`
- Ver histórico de aprovações do resumo
- Anexar arquivos ao resumo

O fluxo completo está documentado em `caixinha/fluxo-caixinha.md`.

---

## 3. Documentos / Caixa Geral

**Rota:** `/documentos/caixa-geral`

Acesso ao caixa geral da empresa para registro e consulta de entradas/saídas financeiras.

O fluxo completo está documentado em `caixa-geral/fluxo-caixa-geral.md`.

---

## 4. Documentos / A Pagar

**Rota:** `/documentos/a-pagar`

Documentos avulsos do tipo **A Pagar** criados pelo solicitante. São lançamentos manuais de obrigações de pagamento que não têm origem em pedido de compra do Protheus.

**Exemplos de uso:** reembolso de despesa, pagamento de serviço pontual, despesa de viagem.

### Como criar um documento A Pagar:
1. Clique em "Novo"
2. Preencha: tipo, valor, fornecedor, vencimento, observação
3. Anexe comprovante (opcional, mas recomendado)
4. Envie ao fiscal

### Status possíveis
| Status | Descrição |
|--------|-----------|
| `pending` | Aguardando fiscal |
| `finished` | Aprovado pelo financeiro |
| `rejected` | Reprovado |

---

## 5. Documentos / A Receber

**Rota:** `/documentos/a-receber`

Documentos avulsos do tipo **A Receber** — valores que a empresa tem direito a receber. Mesmo comportamento do A Pagar, com tipo `A_RECEBER`.

---

## 6. Documentos / Documentos Avulsos

**Rota:** `/documentos/documentos-avulsos`

Visão geral de todos os documentos avulsos (A Pagar + A Receber + outros tipos). Permite ao solicitante acompanhar e gerenciar seus lançamentos manuais.

### Tipos de documento avulso
- **A_PAGAR:** obrigação de pagamento
- **A_RECEBER:** direito de recebimento
- Outros tipos configurados no sistema

### Suporte a provisão
Se habilitado nas configurações do sistema (`UseProvision = true`), os documentos avulsos podem ser lançados como **provisão** (entrada prévia antes da confirmação).

---

## 7. Documentos / Documentos Sincronizados

**Rota:** `/documentos/documentos-sincronizados`

Documentos que chegaram ao Apollo via **sincronização por e-mail** — o sistema monitora uma caixa de e-mail e importa automaticamente documentos detectados.

### Status dos documentos sincronizados
| Status | Descrição |
|--------|-----------|
| Pendente | Importado, aguardando revisão/envio |
| Finalizado | Aprovado pelo financeiro |
| Rejeitado | Reprovado |

### Ações disponíveis
- Visualizar documento importado
- Aprovar ou reprovar diretamente
- Anexar arquivos adicionais
- Busca por período de importação

---

## Fluxo Geral do Solicitante

```
[Solicitante]
    │
    ├─→ Pedidos de Compra
    │       Sincroniza Protheus → anexa docs → envia ao Fiscal
    │
    ├─→ Documentos Avulsos (A Pagar / A Receber)
    │       Cria manualmente → envia ao Fiscal
    │
    ├─→ Caixinha (Movimentos)
    │       Lança despesa → aguarda aprovação do aprovador
    │
    └─→ Caixinha (Resumo)
            Fecha período → aguarda aprovação hierárquica
```

---

## Regras de Negócio

### 1. Documentos Avulsos vs. Pedidos de Compra
- **Pedidos de Compra:** origem no Protheus, sincronizados
- **Documentos Avulsos:** criados manualmente no Apollo, sem vínculo Protheus

### 2. Provisão em Documentos Avulsos
- ✅ Habilitada por configuração do sistema (`UseProvision`)
- ✅ Permite lançar documentos como previsão antes da confirmação real
- ❌ Disponível apenas se o administrador ativou a funcionalidade

### 3. Documentos Sincronizados por E-mail
- ✅ Importados automaticamente da caixa de e-mail configurada
- ✅ Passam pelo mesmo fluxo de aprovação fiscal/financeiro
- ⚠️ Requer configuração de e-mail no módulo de configurações

---

## Perguntas Frequentes

### Qual a diferença entre A Pagar e Documentos Avulsos?
"A Pagar" é um tipo específico dentro de Documentos Avulsos. Em "Documentos Avulsos" você vê todos os tipos juntos.

### Como lanço um reembolso de despesa?
Acesse Documentos → A Pagar → Novo. Preencha os dados da despesa, anexe o comprovante e envie ao fiscal.

### Onde acompanho o status do meu pedido de compra?
Em Documentos → Pedidos de Compra. A coluna "Status" mostra a etapa atual do pedido.

### O que são "Documentos Sincronizados"?
São documentos que chegaram automaticamente ao Apollo via e-mail. O sistema monitora a caixa de e-mail configurada e importa os documentos detectados.

### Posso cancelar um documento avulso já enviado ao fiscal?
Não diretamente. Entre em contato com o fiscal ou aguarde a reprovação para poder editar.

---

## Glossário

- **Solicitante:** usuário que cria e acompanha documentos
- **Documento Avulso:** lançamento manual sem vínculo com Protheus
- **A Pagar:** documento com obrigação de pagamento
- **A Receber:** documento com direito de recebimento
- **Provisão:** lançamento prévio antes da confirmação real
- **Documentos Sincronizados:** importados automaticamente via e-mail
- **Movimentos:** lançamentos individuais de caixinha (títulos/despesas)
- **Resumo:** prestação de contas periódica da caixinha

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
