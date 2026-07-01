import pool from '../config/db.js';

interface DateRange {
  from?: Date;
  to?: Date;
}

interface OverviewStats {
  totalConversations: number;
  totalUserMessages: number;
  totalAssistantMessages: number;
  totalUnanswered: number;
  unansweredRatePercent: number;
  feedback: {
    positive: number;
    negative: number;
    satisfactionRatePercent: number;
  };
}

// tableAlias prefixes the column: 'm' → 'm.created_at >= $1'
function buildDateConditions(
  from?: Date,
  to?: Date,
  tableAlias?: string,
): { conditions: string[]; params: Date[] } {
  const col = tableAlias ? `${tableAlias}.created_at` : 'created_at';
  const conditions: string[] = [];
  const params: Date[] = [];
  if (from) { params.push(from); conditions.push(`${col} >= $${params.length}`); }
  if (to)   { params.push(to);   conditions.push(`${col} <= $${params.length}`); }
  return { conditions, params };
}

export async function getOverviewStats(from?: Date, to?: Date): Promise<OverviewStats> {
  const { conditions, params } = buildDateConditions(from, to);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const feedbackWhere =
    conditions.length
      ? `WHERE feedback IS NOT NULL AND ${conditions.join(' AND ')}`
      : `WHERE feedback IS NOT NULL`;

  const [convRow, msgRow, unansweredRow, feedbackRow] = await Promise.all([
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM coffinho.conversations ${where}`,
      params,
    ),
    pool.query<{ user_total: string; assistant_total: string }>(
      `SELECT
         COUNT(*) FILTER (WHERE role = 'user')      AS user_total,
         COUNT(*) FILTER (WHERE role = 'assistant') AS assistant_total
       FROM coffinho.messages ${where}`,
      params,
    ),
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM coffinho.unanswered_questions ${where}`,
      params,
    ),
    pool.query<{ positive: string; negative: string }>(
      `SELECT
         COUNT(*) FILTER (WHERE feedback = 1)  AS positive,
         COUNT(*) FILTER (WHERE feedback = -1) AS negative
       FROM coffinho.messages ${feedbackWhere}`,
      params,
    ),
  ]);

  const totalConversations     = parseInt(convRow.rows[0].total, 10);
  const totalUserMessages      = parseInt(msgRow.rows[0].user_total, 10);
  const totalAssistantMessages = parseInt(msgRow.rows[0].assistant_total, 10);
  const totalUnanswered        = parseInt(unansweredRow.rows[0].total, 10);
  const positive               = parseInt(feedbackRow.rows[0].positive, 10);
  const negative               = parseInt(feedbackRow.rows[0].negative, 10);

  const unansweredRatePercent =
    totalUserMessages > 0
      ? Math.round((totalUnanswered / totalUserMessages) * 1000) / 10
      : 0;

  const totalFeedback = positive + negative;
  const satisfactionRatePercent =
    totalFeedback > 0
      ? Math.round((positive / totalFeedback) * 1000) / 10
      : 0;

  return {
    totalConversations,
    totalUserMessages,
    totalAssistantMessages,
    totalUnanswered,
    unansweredRatePercent,
    feedback: { positive, negative, satisfactionRatePercent },
  };
}

export interface CompanyUsage { appId: string; questionCount: number; }
export interface CompanySatisfaction {
  appId: string; positive: number; negative: number; satisfactionRatePercent: number;
}
export interface CompanyStats { usage: CompanyUsage[]; satisfaction: CompanySatisfaction[]; }

export async function getCompanyStats(from?: Date, to?: Date): Promise<CompanyStats> {
  const { conditions, params } = buildDateConditions(from, to, 'm');

  const msgWhere = conditions.length
    ? `WHERE m.role = 'user' AND ${conditions.join(' AND ')}`
    : `WHERE m.role = 'user'`;

  const satWhere = conditions.length
    ? `WHERE m.feedback IS NOT NULL AND ${conditions.join(' AND ')}`
    : `WHERE m.feedback IS NOT NULL`;

  const [usageRows, satRows] = await Promise.all([
    pool.query<{ app_id: string; question_count: string }>(
      `SELECT c.app_id, COUNT(m.id) AS question_count
       FROM coffinho.conversations c
       JOIN coffinho.messages m ON m.conversation_id = c.id
       ${msgWhere}
       GROUP BY c.app_id
       ORDER BY question_count DESC`,
      params,
    ),
    pool.query<{ app_id: string; positive: string; negative: string }>(
      `SELECT c.app_id,
         COUNT(*) FILTER (WHERE m.feedback = 1)  AS positive,
         COUNT(*) FILTER (WHERE m.feedback = -1) AS negative
       FROM coffinho.conversations c
       JOIN coffinho.messages m ON m.conversation_id = c.id
       ${satWhere}
       GROUP BY c.app_id
       ORDER BY positive DESC`,
      params,
    ),
  ]);

  const usage = usageRows.rows.map((r) => ({
    appId: r.app_id,
    questionCount: parseInt(r.question_count, 10),
  }));

  const satisfaction = satRows.rows
    .map((r) => {
      const pos   = parseInt(r.positive, 10);
      const neg   = parseInt(r.negative, 10);
      const total = pos + neg;
      return {
        appId: r.app_id,
        positive: pos,
        negative: neg,
        satisfactionRatePercent: total > 0 ? Math.round((pos / total) * 1000) / 10 : 0,
      };
    })
    .filter((r) => r.positive + r.negative > 0);

  return { usage, satisfaction };
}

interface PaginatedParams extends DateRange {
  limit: number;
  offset: number;
}

export async function getUnansweredQuestions(
  params: PaginatedParams,
): Promise<{
  items: Array<{ id: string; conversationId: string | null; question: string; createdAt: Date }>;
  total: number;
}> {
  const { limit, offset, from, to } = params;
  const { conditions, params: dateParams } = buildDateConditions(from, to);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [totalRow, rows] = await Promise.all([
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM coffinho.unanswered_questions ${where}`,
      dateParams,
    ),
    pool.query<{ id: string; conversation_id: string | null; question: string; created_at: Date }>(
      `SELECT id, conversation_id, question, created_at
       FROM coffinho.unanswered_questions
       ${where}
       ORDER BY created_at DESC
       LIMIT $${dateParams.length + 1} OFFSET $${dateParams.length + 2}`,
      [...dateParams, limit, offset],
    ),
  ]);

  return {
    items: rows.rows.map((r) => ({
      id: r.id,
      conversationId: r.conversation_id,
      question: r.question,
      createdAt: r.created_at,
    })),
    total: parseInt(totalRow.rows[0].total, 10),
  };
}

// Groups identical questions — shows freq + most-recent company
export async function getUnansweredGrouped(
  params: PaginatedParams,
): Promise<{
  items: Array<{ question: string; freq: number; appId: string | null; lastAsked: Date }>;
  total: number;
}> {
  const { limit, offset, from, to } = params;
  const { conditions, params: dateParams } = buildDateConditions(from, to, 'uq');
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [totalRow, rows] = await Promise.all([
    pool.query<{ total: string }>(
      `SELECT COUNT(DISTINCT uq.question) AS total
       FROM coffinho.unanswered_questions uq ${where}`,
      dateParams,
    ),
    pool.query<{ question: string; freq: string; app_id: string | null; last_asked: Date }>(
      `SELECT
         uq.question,
         COUNT(*)            AS freq,
         MAX(c.app_id)       AS app_id,
         MAX(uq.created_at)  AS last_asked
       FROM coffinho.unanswered_questions uq
       LEFT JOIN coffinho.conversations c ON uq.conversation_id = c.id
       ${where}
       GROUP BY uq.question
       ORDER BY freq DESC, last_asked DESC
       LIMIT $${dateParams.length + 1} OFFSET $${dateParams.length + 2}`,
      [...dateParams, limit, offset],
    ),
  ]);

  return {
    items: rows.rows.map((r) => ({
      question: r.question,
      freq: parseInt(r.freq, 10),
      appId: r.app_id,
      lastAsked: r.last_asked,
    })),
    total: parseInt(totalRow.rows[0].total, 10),
  };
}

export async function getRecentConversations(
  params: PaginatedParams,
): Promise<{
  items: Array<{
    id: string;
    appId: string;
    userId: string | null;
    userLogin: string | null;
    companyName: string | null;
    messageCount: number;
    createdAt: Date;
    lastMessageAt: Date | null;
  }>;
  total: number;
}> {
  const { limit, offset, from, to } = params;
  const { conditions, params: dateParams } = buildDateConditions(from, to, 'c');
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [totalRow, rows] = await Promise.all([
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM coffinho.conversations c ${where}`,
      dateParams,
    ),
    pool.query<{
      id: string;
      app_id: string;
      user_id: string | null;
      user_login: string | null;
      company_name: string | null;
      message_count: string;
      created_at: Date;
      last_message_at: Date | null;
    }>(
      `SELECT
         c.id,
         c.app_id,
         c.user_id,
         c.user_login,
         c.company_name,
         COUNT(m.id)         AS message_count,
         c.created_at,
         MAX(m.created_at)   AS last_message_at
       FROM coffinho.conversations c
       LEFT JOIN coffinho.messages m ON m.conversation_id = c.id
       ${where}
       GROUP BY c.id, c.app_id, c.user_id, c.user_login, c.company_name, c.created_at
       ORDER BY COALESCE(MAX(m.created_at), c.created_at) DESC
       LIMIT $${dateParams.length + 1} OFFSET $${dateParams.length + 2}`,
      [...dateParams, limit, offset],
    ),
  ]);

  return {
    items: rows.rows.map((r) => ({
      id: r.id,
      appId: r.app_id,
      userId: r.user_id,
      userLogin: r.user_login,
      companyName: r.company_name,
      messageCount: parseInt(r.message_count, 10),
      createdAt: r.created_at,
      lastMessageAt: r.last_message_at,
    })),
    total: parseInt(totalRow.rows[0].total, 10),
  };
}

export async function getNegativeFeedbackMessages(
  params: PaginatedParams,
): Promise<{
  items: Array<{ id: string; conversationId: string; content: string; createdAt: Date }>;
  total: number;
}> {
  const { limit, offset, from, to } = params;
  const { conditions, params: dateParams } = buildDateConditions(from, to);
  const dateWhere = conditions.length ? `AND ${conditions.join(' AND ')}` : '';

  const [totalRow, rows] = await Promise.all([
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total
       FROM coffinho.messages
       WHERE role = 'assistant' AND feedback = -1 ${dateWhere}`,
      dateParams,
    ),
    pool.query<{ id: string; conversation_id: string; content: string; created_at: Date }>(
      `SELECT id, conversation_id, content, created_at
       FROM coffinho.messages
       WHERE role = 'assistant' AND feedback = -1 ${dateWhere}
       ORDER BY created_at DESC
       LIMIT $${dateParams.length + 1} OFFSET $${dateParams.length + 2}`,
      [...dateParams, limit, offset],
    ),
  ]);

  return {
    items: rows.rows.map((r) => ({
      id: r.id,
      conversationId: r.conversation_id,
      content: r.content,
      createdAt: r.created_at,
    })),
    total: parseInt(totalRow.rows[0].total, 10),
  };
}
