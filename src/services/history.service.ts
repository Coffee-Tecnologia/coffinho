import pool from '../config/db.js';
import type { ChatRole, ChatMessage } from './claude.service.js';

export async function getOrCreateConversation(
  appId: string,
  conversationId?: string,
  userId?: string,
): Promise<string> {
  if (conversationId) {
    const result = await pool.query<{ id: string }>(
      'SELECT id FROM coffinho.conversations WHERE id = $1',
      [conversationId],
    );
    if (result.rowCount && result.rowCount > 0) return result.rows[0].id;
  }

  const result = await pool.query<{ id: string }>(
    'INSERT INTO coffinho.conversations (user_id, app_id) VALUES ($1, $2) RETURNING id',
    [userId ?? null, appId],
  );
  return result.rows[0].id;
}

export async function getHistory(conversationId: string, limit = 10): Promise<ChatMessage[]> {
  const result = await pool.query<{ role: ChatRole; content: string }>(
    `SELECT role, content
     FROM coffinho.messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC
     LIMIT $2`,
    [conversationId, limit],
  );
  return result.rows;
}

export async function saveMessage(
  conversationId: string,
  role: ChatRole,
  content: string,
): Promise<string> {
  const result = await pool.query<{ id: string }>(
    'INSERT INTO coffinho.messages (conversation_id, role, content) VALUES ($1, $2, $3) RETURNING id',
    [conversationId, role, content],
  );
  await pool.query(
    'UPDATE coffinho.conversations SET updated_at = now() WHERE id = $1',
    [conversationId],
  );
  return result.rows[0].id;
}

export async function getMessageById(
  messageId: string,
): Promise<{ id: string; role: ChatRole } | null> {
  const result = await pool.query<{ id: string; role: ChatRole }>(
    'SELECT id, role FROM coffinho.messages WHERE id = $1',
    [messageId],
  );
  return result.rowCount && result.rowCount > 0 ? result.rows[0] : null;
}

export async function setMessageFeedback(messageId: string, value: 1 | -1): Promise<void> {
  await pool.query(
    'UPDATE coffinho.messages SET feedback = $1 WHERE id = $2',
    [value, messageId],
  );
}
