import pool from '../config/db.js';

export async function logUnansweredQuestion(
  conversationId: string,
  messageId: string,
  question: string,
): Promise<void> {
  await pool.query(
    `INSERT INTO coffinho.unanswered_questions (conversation_id, message_id, question)
     VALUES ($1, $2, $3)`,
    [conversationId, messageId, question],
  );
}
