import { Router } from 'express';
import type { Request, Response } from 'express';
import { internalAuth } from '../middleware/internalAuth.js';
import { getMessageById, setMessageFeedback } from '../services/history.service.js';

const router = Router();

router.patch('/messages/:id/feedback', internalAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body as { value?: unknown };

  if (value !== 1 && value !== -1) {
    res.status(400).json({ error: 'O campo value deve ser exatamente 1 ou -1.' });
    return;
  }

  const message = await getMessageById(id);

  if (!message) {
    res.status(404).json({ error: 'Mensagem não encontrada.' });
    return;
  }

  if (message.role !== 'assistant') {
    res.status(400).json({ error: 'Feedback só pode ser dado em mensagens do assistente.' });
    return;
  }

  try {
    await setMessageFeedback(id, value);
    res.json({ ok: true });
  } catch (err) {
    console.error('[/messages/:id/feedback] erro:', err);
    res.status(500).json({ error: 'Erro interno ao salvar feedback.' });
  }
});

export default router;
