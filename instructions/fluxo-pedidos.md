# Fluxo de Pedidos - Apollo + Protheus

## Visão Geral
Este documento descreve o fluxo completo de processamento de pedidos no Apollo, desde a criação no Protheus até a aprovação e pagamento final.

---

## 1. Criação do Pedido no Protheus

**Responsável:** Usuário  
**Sistema:** Protheus

O pedido é criado inicialmente no sistema Protheus pelo usuário.

**Informações do pedido:**
- Código do pedido
- Itens/produtos
- Valores
- Dados do fornecedor
- Outras informações fiscais

---

## 2. Sincronização com Apollo

**Responsável:** Usuário  
**Sistema:** Apollo

### Como funciona:
1. Usuário acessa o Apollo
2. Entra na rotina de **Pedidos**
3. Clica no botão **"Sincronizar"**

### O que acontece:
- Apollo busca pedidos no Protheus usando o **código do usuário**
- Esse código deve ter sido informado no momento do **cadastro do usuário**
- Apollo recupera todos os pedidos vinculados àquele código

⚠️ **IMPORTANTE:** O código do Protheus é obrigatório no cadastro do usuário para que a sincronização funcione.

---

## 3. Carregamento dos Pedidos

**Sistema:** Apollo

Após a sincronização, o Apollo:
- Carrega os pedidos do Protheus
- Exibe na interface do usuário
- Aguarda as próximas ações

---

## 4. Anexar Nota Fiscal e Vencimento

**Responsável:** Usuário  
**Sistema:** Apollo

Usuário deve:
1. **Anexar a nota fiscal** (arquivo PDF/XML)
2. **Informar a data de vencimento** do pedido

⚠️ **REGRA DE NEGÓCIO:** Sem nota fiscal anexada, o pedido NÃO pode ser enviado ao financeiro.

---

## 5. Envio para Análise Fiscal

**Responsável:** Usuário  
**Sistema:** Apollo

Usuário clica em **"Enviar ao Fiscal"**

O pedido muda de status e vai para a fila de análise fiscal.

---

## 6. Análise Fiscal

**Responsável:** Fiscal  
**Sistema:** Apollo

O fiscal analisa o pedido e pode tomar duas ações:

### Opção A: Aprovar
- Fiscal aprova o pedido
- Lança a nota de entrada no Protheus
- Pedido segue para o financeiro

### Opção B: Reprovar
- Fiscal reprova o pedido
- **Status:** Reprovado
- **Obrigatório:** Adicionar observação explicando o motivo da reprovação

---

## 7. Fluxo de Reprovação

**Responsável:** Usuário  
**Sistema:** Apollo

Quando o pedido é reprovado:

1. Pedido **volta para o usuário**
2. Status: **Reprovado**
3. Observação do fiscal fica visível
4. Usuário **corrige o erro**
5. Usuário **reenvia ao fiscal**
6. Fiscal analisa novamente (volta ao passo 6)

**Este ciclo se repete até o pedido ser aprovado.**

---

## 8. Aprovação e Lançamento no Protheus

**Responsável:** Fiscal  
**Sistema:** Apollo + Protheus

Quando tudo está correto:

1. Fiscal **aprova o pedido** no Apollo
2. Fiscal **lança a nota de entrada** no Protheus
3. Pedido muda status para **Aprovado**

⚠️ **VALIDAÇÃO:** Apollo não permite envio ao financeiro sem nota fiscal anexada.

---

## 9. Envio ao Financeiro

**Sistema:** Apollo

Após aprovação:
- Pedido é automaticamente enviado ao **Financeiro**
- Status: **Aguardando Pagamento**

---

## 10. Pagamento e Baixa

**Responsável:** Financeiro  
**Sistema:** Apollo + Protheus

### Ações do Financeiro:
1. Realiza o **pagamento do pedido**
2. Efetua a **baixa no Apollo**
3. Pedido muda status para **Pago/Finalizado**

---

## Fluxograma Resumido

```
[Protheus] Pedido criado
    ↓
[Apollo] Usuário sincroniza
    ↓
[Apollo] Pedidos carregados
    ↓
[Apollo] Usuário anexa nota + vencimento
    ↓
[Apollo] Usuário envia ao Fiscal
    ↓
[Apollo] Fiscal analisa
    ↓
    ├─→ APROVADO
    │      ↓
    │   [Protheus] Fiscal lança nota entrada
    │      ↓
    │   [Apollo] Enviado ao Financeiro
    │      ↓
    │   [Apollo] Pagamento + Baixa
    │      ↓
    │   ✅ FINALIZADO
    │
    └─→ REPROVADO
           ↓
        [Apollo] Volta ao usuário com observação
           ↓
        [Apollo] Usuário corrige
           ↓
        [Apollo] Reenvia ao Fiscal
           ↓
        (volta ao passo "Fiscal analisa")
```

---

## Status do Pedido

| Status | Descrição |
|--------|-----------|
| **Sincronizado** | Pedido recuperado do Protheus, aguardando anexo de nota |
| **Aguardando Fiscal** | Nota anexada, enviado para análise fiscal |
| **Reprovado** | Fiscal reprovou, aguarda correção do usuário |
| **Aprovado** | Fiscal aprovou e lançou no Protheus |
| **Aguardando Pagamento** | Enviado ao financeiro |
| **Pago** | Pagamento efetuado e baixado |
| **Finalizado** | Processo completo |

---

## Regras de Negócio Importantes

### 1. Código do Usuário no Protheus
- ✅ **Obrigatório** no cadastro do usuário
- ✅ Usado para sincronização de pedidos
- ❌ Sem código = não sincroniza pedidos

### 2. Nota Fiscal
- ✅ **Obrigatória** para envio ao financeiro
- ❌ Sem nota = bloqueio de envio ao financeiro

### 3. Observação na Reprovação
- ✅ **Obrigatória** quando fiscal reprova
- ✅ Usuário vê o motivo da reprovação

### 4. Lançamento no Protheus
- ✅ Fiscal deve lançar nota de entrada no Protheus
- ✅ Só após lançamento o pedido segue ao financeiro

---

## Perguntas Frequentes

### Como faço para sincronizar meus pedidos?
Entre na rotina de Pedidos no Apollo e clique no botão "Sincronizar". O sistema buscará automaticamente os pedidos vinculados ao seu código de usuário no Protheus.

### Posso enviar um pedido ao fiscal sem anexar a nota?
Sim, você pode enviar ao fiscal sem a nota. Porém, o fiscal não poderá aprovar e enviar ao financeiro sem que a nota esteja anexada.

### O que faço quando meu pedido é reprovado?
Verifique a observação deixada pelo fiscal, corrija o erro apontado e reenvie o pedido para análise.

### Quanto tempo leva a análise fiscal?
O tempo varia conforme a fila de pedidos. Entre em contato com o fiscal para mais informações.

### Posso cancelar um pedido após envio ao fiscal?
Depende do status. Entre em contato com o suporte para verificar a possibilidade de cancelamento.

---

## Glossário

- **Protheus**: Sistema ERP onde os pedidos são criados inicialmente
- **Apollo**: Sistema de gestão de pedidos (integrado ao Protheus)
- **Sincronizar**: Buscar pedidos do Protheus para o Apollo
- **Fiscal**: Responsável por analisar e aprovar pedidos
- **Nota de Entrada**: Documento fiscal lançado no Protheus
- **Financeiro**: Departamento responsável pelo pagamento
- **Baixa**: Registro do pagamento no sistema

---

**Última atualização:** Maio 2026  
**Versão do documento:** 1.0
