# Orçamentos (Pedidos de Venda) - Apollo

## Visão Geral
O módulo de **Orçamentos** do Apollo gerencia propostas comerciais enviadas a clientes. Um orçamento pode conter produtos e/ou serviços, ser compartilhado com o cliente via link público e ter seu status atualizado conforme a resposta do cliente.

---

## 1. Criação de Orçamento

**Responsável:** Usuário (vendedor/comercial)

Para criar um orçamento:
1. Acesse o módulo Orçamentos
2. Clique em **"Novo Orçamento"**
3. Preencha os dados:
   - **Cliente:** vinculado obrigatoriamente a um cliente cadastrado
   - **Número:** gerado automaticamente (sequencial)
   - **Itens:** produtos e/ou serviços com quantidade e preço unitário
   - **Desconto:** percentual ou valor fixo (opcional)
   - **Validade:** data de expiração da proposta
   - **Observações**

⚠️ O sistema sugere automaticamente o próximo número disponível.

---

## 2. Itens do Orçamento

Cada item pode ser:

### Produto
- Produto do cadastro, com preço unitário e quantidade

### Serviço
- Serviço do cadastro, com preço unitário e quantidade
- **Opção "Incluir materiais":** quando ativada, o custo dos materiais vinculados ao serviço é somado ao total do item automaticamente

O total de cada item é calculado como: `quantidade × preço_unitário` + custo de materiais (se habilitado).

---

## 3. Desconto

Pode ser aplicado sobre o total do orçamento:
- **Percentual:** desconto em %
- **Valor fixo:** desconto em R$

O sistema calcula e exibe o valor total com desconto.

---

## 4. Status do Orçamento

| Status | Descrição |
|--------|-----------|
| `UNDER_REVIEW` | Em análise / Aguardando resposta do cliente |
| `APPROVED` | Aprovado pelo cliente |
| `DECLINED` | Recusado pelo cliente |

O status inicial é sempre **`UNDER_REVIEW`**.

---

## 5. Atualização de Status

**Via interface interna:**
`PATCH /budgets/{id}/status?status=APPROVED`

O usuário pode atualizar o status manualmente após receber feedback do cliente.

**Via link público (cliente responde diretamente):**
O cliente acessa o link, visualiza o orçamento e aprova ou recusa.

---

## 6. Link Público para o Cliente

O Apollo permite gerar um **link público** do orçamento para enviar ao cliente:

`POST /budgets/{id}/public-link`

O cliente acessa o link sem precisar de login e pode:
- Visualizar todos os itens, valores e totais
- **Aprovar** o orçamento (`POST /budgets/public/{token}/approve`)
- **Recusar** o orçamento (`POST /budgets/public/{token}/reject`)

Quando o cliente responde pelo link, o status é atualizado automaticamente no Apollo.

---

## 7. Duplicar Orçamento

Para criar um novo orçamento a partir de um existente:

`POST /budgets/{id}/create-from`

Útil para reutilizar itens de orçamentos anteriores com ajustes mínimos.

---

## 8. Relatórios

### PDF
`GET /budgets/{id}/report/pdf`

Gera o PDF do orçamento com:
- Dados do cliente
- Listagem de itens com valores
- Desconto e total geral
- Validade (data de vencimento)

Também disponível via link público: `GET /budgets/public/{token}/report/pdf`

### Excel (XLSX)
`GET /budgets/{id}/report/xlsx`

Exporta o orçamento em planilha.

---

## 9. Dashboard de Orçamentos

`GET /budgets/dashboard`

Retorna métricas da empresa:
- Total de orçamentos por status
- Valor total em análise, aprovado, recusado
- Evolução no período

---

## Fluxograma Resumido

```
[Usuário] Cria orçamento com itens
    ↓ status: UNDER_REVIEW
[Usuário] Envia link público ao cliente
    ↓
[Cliente] Acessa link e visualiza proposta
    ↓
    ├─→ APROVADO → status: APPROVED
    │      ↓
    │   [Usuário] Segue com processo de venda
    │
    └─→ RECUSADO → status: DECLINED
           ↓
        [Usuário] Pode criar novo orçamento revisado
```

---

## Regras de Negócio Importantes

### 1. Cliente Obrigatório
- ✅ Todo orçamento precisa de um cliente vinculado
- ❌ Não é possível salvar sem cliente

### 2. Número Automático
- ✅ O sistema gera o próximo número disponível automaticamente
- ✅ Evita duplicidade de numeração

### 3. Link Público
- ✅ Cada orçamento tem um token único para acesso público
- ✅ O cliente não precisa de login para visualizar e responder
- ✅ Qualquer pessoa com o link pode aprovar/recusar
- ⚠️ Compartilhe apenas com o cliente destinatário

### 4. Materiais de Serviços
- ✅ Ao incluir materiais, o sistema soma automaticamente o custo dos insumos vinculados ao serviço
- ✅ Útil para orçamentos de serviços com materiais inclusos

### 5. Validade
- ✅ Orçamento pode ter data de validade
- ⚠️ Após a validade, o orçamento pode ser gerado com data marcada no PDF

---

## Perguntas Frequentes

### Como envio o orçamento para o cliente?
Gere o link público do orçamento (`POST /budgets/{id}/public-link`), copie o link e envie por e-mail, WhatsApp ou outro canal.

### O cliente aprovou mas não consigo alterar o status. Por quê?
Se o cliente respondeu pelo link público, o status já foi atualizado automaticamente. Verifique se o orçamento está como `APPROVED`.

### Posso criar um orçamento parecido com um já existente?
Sim. Use a opção "Duplicar" (criar a partir de). O sistema copia todos os itens do orçamento original.

### Como incluir o custo de materiais de um serviço no orçamento?
Ao adicionar um item de serviço, marque a opção "Incluir materiais". O sistema somará automaticamente o custo dos insumos vinculados ao serviço.

### Como gero o PDF do orçamento?
Na tela do orçamento, clique em "Gerar PDF" ou acesse `GET /budgets/{id}/report/pdf`.

### O que acontece se o cliente recusar o orçamento?
O status muda para `DECLINED`. Você pode criar um novo orçamento revisado usando "Duplicar" e enviando novamente.

---

## Glossário

- **Orçamento (Budget):** proposta comercial enviada a um cliente
- **Item:** produto ou serviço incluído no orçamento
- **Desconto:** redução aplicada ao total (percentual ou valor fixo)
- **Validade:** data limite para o cliente responder ao orçamento
- **Link público:** URL única que permite ao cliente visualizar e responder sem login
- **Token:** identificador único do link público do orçamento
- **Materiais inclusos:** custo dos insumos vinculados a um serviço, somado ao orçamento
- **UNDER_REVIEW:** em análise / aguardando resposta
- **APPROVED:** aprovado pelo cliente
- **DECLINED:** recusado pelo cliente
- **Dashboard:** painel com métricas e totais dos orçamentos

---

**Última atualização:** Junho 2026
**Versão do documento:** 1.0
