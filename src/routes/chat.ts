import { Router } from 'express';
import type { Request, Response } from 'express';
import { loadDocs } from '../services/docs.service.js';
import { askClaude, UNANSWERED_MARKER } from '../services/claude.service.js';
import {
  getOrCreateConversation,
  getHistory,
  saveMessage,
} from '../services/history.service.js';
import { logUnansweredQuestion } from '../services/unanswered.service.js';

const router = Router();

const docs = loadDocs();

router.post('/chat', async (req: Request, res: Response) => {
  const { conversationId, userId, message } = req.body as {
    conversationId?: string;
    userId?: string;
    message?: string;
  };

  if (!message || message.trim() === '') {
    res.status(400).json({ error: 'O campo message não pode estar vazio.' });
    return;
  }

  try {
    const convId = await getOrCreateConversation(conversationId, userId);
    const history = await getHistory(convId);

    const rawAnswer = await askClaude({ docs, history, question: message });

    const isUnanswered = rawAnswer.includes(UNANSWERED_MARKER);
    const answer = rawAnswer.replace(UNANSWERED_MARKER, '').trim();

    await saveMessage(convId, 'user', message);
    const assistantMessageId = await saveMessage(convId, 'assistant', answer);

    if (isUnanswered) {
      await logUnansweredQuestion(convId, assistantMessageId, message);
    }

    res.json({ conversationId: convId, messageId: assistantMessageId, answer });
  } catch (err) {
    console.error('[/chat] erro:', err);
    res.status(500).json({ error: 'Erro interno ao processar a mensagem.' });
  }
});

export default router;
