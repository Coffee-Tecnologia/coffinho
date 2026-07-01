import { Router } from 'express';
import type { Request, Response } from 'express';
import { internalAuth } from '../middleware/internalAuth.js';
import { loadDocs, validateId } from '../services/docs.service.js';
import { askClaude, UNANSWERED_MARKER } from '../services/claude.service.js';
import {
  getOrCreateConversation,
  getHistory,
  saveMessage,
} from '../services/history.service.js';
import { logUnansweredQuestion } from '../services/unanswered.service.js';

const router = Router();

router.post('/chat', internalAuth, async (req: Request, res: Response) => {
  const userId = req.internalUserId;

  const { conversationId, message, appId, moduleId } = req.body as {
    conversationId?: string;
    message?: string;
    appId?: string;
    moduleId?: string;
  };

  if (!message || message.trim() === '') {
    res.status(400).json({ error: 'O campo message não pode estar vazio.' });
    return;
  }

  const appIdError = validateId(appId ?? '', 'appId');
  if (appIdError) {
    res.status(400).json({ error: appIdError });
    return;
  }

  if (moduleId !== undefined && moduleId !== null) {
    const moduleIdError = validateId(moduleId, 'moduleId');
    if (moduleIdError) {
      res.status(400).json({ error: moduleIdError });
      return;
    }
  }

  try {
    const docs = loadDocs(appId!, moduleId);
    const convId = await getOrCreateConversation(appId!, conversationId, userId);
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
