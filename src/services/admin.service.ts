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

function buildDateConditions(from?: Date, to?: Date): { conditions: string[]; params: Date[] } {
  const conditions: string[] = [];
  const params: Date[] = [];
  if (from) { params.push(from); conditions.push(`created_at >= $${params.length}`); }
  if (to)   { params.push(to);   conditions.push(`created_at <= $${params.length}`); }
  return { conditions, params };
}

export async function getOverviewStats(from?: Date, to?: Date): Promise<OverviewStats> {
  const { conditions, params } = buildDateConditions(from, to);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  // feedback query: base WHERE is "feedback IS NOT NULL", date conditions are ANDed on top
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
