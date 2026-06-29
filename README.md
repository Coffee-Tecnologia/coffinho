# Coffinho AI

Assistente de IA do sistema **Apollo**, construído com Express + TypeScript + PostgreSQL, integrado à API da Anthropic (Claude). Responde perguntas sobre fluxos e regras do sistema com base em documentação interna, mantém histórico de conversa persistido no banco e expõe endpoints de administração para monitoramento.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js (ESM) |
| Linguagem | TypeScript (`NodeNext`) |
| Framework | Express 5 |
| Banco | PostgreSQL — schema isolado `coffinho` |
| Driver | `pg` (pool nativo, sem ORM) |
| IA | Anthropic SDK — modelo `claude-sonnet-4-6` |
| Dev server | `tsx watch` |

---

## Estrutura

```
coffinho-ai/
├── .env                          # Variáveis de ambiente (não versionado)
├── .gitignore
├── tsconfig.json
├── package.json
├── instructions/                 # Base de conhecimento (arquivos .md)
│   └── fluxo-pedidos.md
├── migrations/
│   ├── 001_create_coffinho_schema.sql
│   └── 002_add_feedback_and_unanswered.sql
└── src/
    ├── server.ts
    ├── config/
    │   └── db.ts                 # Pool do pg
    ├── middleware/
    │   └── adminAuth.ts          # Autenticação dos endpoints admin
    ├── routes/
    │   ├── chat.ts               # POST /api/chat
    │   ├── feedback.ts           # PATCH /api/messages/:id/feedback
    │   └── admin.ts              # GET /api/admin/*
    └── services/
        ├── docs.service.ts       # Carrega os .md de instructions/
        ├── claude.service.ts     # Chamada à API da Anthropic
        ├── history.service.ts    # CRUD de conversas e mensagens
        ├── unanswered.service.ts # Log de perguntas sem resposta
        └── admin.service.ts      # Queries de stats
```

---

## Configuração

### Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
ANTHROPIC_API_KEY=sk-ant-...

DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco

PORT=3001

ADMIN_API_KEY=gere_com_openssl_rand_-hex_16
```

> Para gerar o `ADMIN_API_KEY`: `openssl rand -hex 16`

### Instalação

```bash
npm install
```

### Migrations

Rode na ordem, uma única vez cada:

```bash
psql $DATABASE_URL -f migrations/001_create_coffinho_schema.sql
psql $DATABASE_URL -f migrations/002_add_feedback_and_unanswered.sql
```

### Desenvolvimento

```bash
npm run dev        # tsx watch — hot reload
```

### Build e produção

```bash
npm run build      # tsc → dist/
npm start          # node dist/server.js
```

---

## Base de conhecimento

O Coffinho lê automaticamente todos os arquivos `.md` dentro de `instructions/` ao iniciar. Para adicionar conhecimento novo, basta criar um novo `.md` nessa pasta — sem alterar código.

Hoje existe:

- `instructions/fluxo-pedidos.md` — fluxo completo de pedidos Apollo + Protheus (criação, sincronização, análise fiscal, pagamento)

---

## API

Base URL: `http://localhost:3001`

### `GET /health`

Verifica se o servidor está no ar.

**Response `200`**
```json
{ "status": "ok" }
```

---

### `POST /api/chat`

Envia uma mensagem ao Coffinho. Se `conversationId` não for passado, uma nova conversa é criada. O histórico das últimas 10 mensagens é enviado ao Claude para manter contexto entre turnos.

**Body**
```json
{
  "message": "Como sincronizar pedidos no Apollo?",
  "conversationId": "uuid-opcional",
  "userId": "id-do-usuario-opcional"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `message` | string | sim | Pergunta do usuário |
| `conversationId` | string (UUID) | não | Passa para continuar uma conversa existente |
| `userId` | string | não | Identificador do usuário (para futuras stats por usuário) |

**Response `200`**
```json
{
  "conversationId": "a7b3dbb6-d4c6-433c-8d26-ba67174a97e6",
  "messageId": "a0c67f6b-e768-49e3-a60a-8600025684ae",
  "answer": "Para sincronizar seus pedidos, acesse..."
}
```

| Campo | Descrição |
|---|---|
| `conversationId` | UUID da conversa — guarde para continuar o contexto |
| `messageId` | UUID da mensagem do assistente — use para dar feedback |
| `answer` | Resposta do Coffinho |

**Erros**

| Status | Motivo |
|---|---|
| `400` | `message` vazio ou ausente |
| `500` | Falha interna (Anthropic, banco, etc.) |

---

### `PATCH /api/messages/:id/feedback`

Registra avaliação 👍/👎 em uma resposta do Coffinho. Só funciona em mensagens com `role = 'assistant'`.

**Params**

| Param | Descrição |
|---|---|
| `id` | UUID da mensagem (campo `messageId` retornado pelo `/chat`) |

**Body**
```json
{ "value": 1 }
```

| Valor | Significado |
|---|---|
| `1` | Positivo 👍 |
| `-1` | Negativo 👎 |

**Response `200`**
```json
{ "ok": true }
```

**Erros**

| Status | Motivo |
|---|---|
| `400` | `value` não é `1` nem `-1` |
| `400` | Mensagem é do usuário (não do assistente) |
| `404` | Mensagem não encontrada |

---

### Endpoints Admin

Todos os endpoints `/api/admin/*` exigem o header:

```
x-admin-key: <valor de ADMIN_API_KEY>
```

Sem o header ou com valor errado: `401 { "error": "Não autorizado." }`.

> **Próxima evolução:** a autenticação passará a usar **JWT** emitido pelo Apollo, em vez da chave estática. O header de autenticação mudará para `Authorization: Bearer <token>`. O `userId` presente no payload do token será usado para filtrar stats por usuário.

---

#### `GET /api/admin/stats`

Visão geral de uso do Coffinho.

**Query params (todos opcionais)**

| Param | Formato | Descrição |
|---|---|---|
| `from` | `YYYY-MM-DD` | Início do período |
| `to` | `YYYY-MM-DD` | Fim do período |

**Response `200`**
```json
{
  "totalConversations": 8,
  "totalUserMessages": 9,
  "totalAssistantMessages": 9,
  "totalUnanswered": 1,
  "unansweredRatePercent": 11.1,
  "feedback": {
    "positive": 1,
    "negative": 0,
    "satisfactionRatePercent": 100.0
  }
}
```

| Campo | Descrição |
|---|---|
| `unansweredRatePercent` | `totalUnanswered / totalUserMessages × 100`, 1 decimal |
| `satisfactionRatePercent` | `positive / (positive + negative) × 100`, 1 decimal |

---

#### `GET /api/admin/unanswered`

Lista perguntas que o Coffinho não conseguiu responder com confiança, ordenadas da mais recente para a mais antiga.

**Query params**

| Param | Default | Máx | Descrição |
|---|---|---|---|
| `limit` | `20` | `100` | Itens por página |
| `offset` | `0` | — | Paginação |
| `from` | — | — | `YYYY-MM-DD` |
| `to` | — | — | `YYYY-MM-DD` |

**Response `200`**
```json
{
  "items": [
    {
      "id": "da74263b-...",
      "conversationId": "34be58dc-...",
      "question": "Qual a política de férias da empresa?",
      "createdAt": "2026-06-29T15:19:31.289Z"
    }
  ],
  "total": 1
}
```

---

#### `GET /api/admin/feedback/negative`

Lista respostas do assistente que receberam feedback negativo (👎), ordenadas da mais recente para a mais antiga.

**Query params** — mesmos de `/admin/unanswered` (`limit`, `offset`, `from`, `to`).

**Response `200`**
```json
{
  "items": [
    {
      "id": "uuid",
      "conversationId": "uuid",
      "content": "Texto da resposta que foi avaliada negativamente...",
      "createdAt": "2026-06-29T15:30:00.000Z"
    }
  ],
  "total": 0
}
```

---

## Schema do banco

Todas as tabelas vivem no schema `coffinho`, sem tocar em nenhuma tabela do Apollo.

```
coffinho.conversations
  id          UUID PK
  user_id     TEXT          ← identificador do usuário vindo do Apollo (opcional por enquanto)
  created_at  TIMESTAMPTZ
  updated_at  TIMESTAMPTZ

coffinho.messages
  id              UUID PK
  conversation_id UUID FK → conversations (CASCADE DELETE)
  role            TEXT      CHECK ('user' | 'assistant')
  content         TEXT
  feedback        SMALLINT  CHECK (-1 | 1) NULL
  created_at      TIMESTAMPTZ

coffinho.unanswered_questions
  id              UUID PK
  conversation_id UUID FK → conversations (SET NULL)
  message_id      UUID FK → messages (SET NULL)
  question        TEXT
  created_at      TIMESTAMPTZ
```

---

## Mecanismo de detecção de perguntas sem resposta

Quando o Claude não consegue responder com confiança, ele inclui a marcação `[[SEM_RESPOSTA]]` no final da resposta. O servidor:

1. Detecta a marcação no texto bruto
2. Remove a marcação antes de salvar no banco e antes de devolver ao cliente
3. Registra a pergunta original em `coffinho.unanswered_questions`

O usuário nunca vê a marcação — só recebe a explicação honesta do Coffinho.

---

## Integração com o Apollo (planejado)

### Autenticação JWT

O Apollo emitirá um JWT assinado para cada usuário autenticado. O Coffinho validará esse token no header `Authorization: Bearer <token>`. O `userId` extraído do payload substituirá o campo opcional atual, tornando o rastreamento por usuário automático.

### Stats por usuário

Com o `userId` populado, os endpoints admin poderão agregar:
- Quais usuários mais usam o Coffinho
- Usuários com mais perguntas sem resposta (possível gap de treinamento)
- Satisfação por usuário/setor

### Fluxo esperado

```
Apollo (frontend)
  → POST /api/chat  { Authorization: Bearer <jwt>, message, conversationId? }
       ↓
  Coffinho valida JWT, extrai userId
  Coffinho consulta histórico no Postgres
  Coffinho chama Claude com docs + histórico
  Coffinho salva par user/assistant no Postgres
  Coffinho retorna { conversationId, messageId, answer }
       ↓
Apollo (frontend)
  → PATCH /api/messages/:id/feedback  { value: 1 | -1 }
```
