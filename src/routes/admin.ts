import { Router } from 'express';
import type { Request, Response } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import {
  getOverviewStats,
  getUnansweredQuestions,
  getUnansweredGrouped,
  getNegativeFeedbackMessages,
  getCompanyStats,
  getRecentConversations,
} from '../services/admin.service.js';

const router = Router();

router.use(adminAuth);

function parseDateParam(value: unknown): Date | undefined {
  if (typeof value !== 'string' || !value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

function parsePaginationParams(query: Request['query']): { limit: number; offset: number } {
  const limit  = Math.min(Math.max(parseInt(query.limit  as string, 10) || 20, 1), 100);
  const offset = Math.max(parseInt(query.offset as string, 10) || 0, 0);
  return { limit, offset };
}

router.get('/admin/stats', async (req: Request, res: Response) => {
  try {
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const stats = await getOverviewStats(from, to);
    res.json(stats);
  } catch (err) {
    console.error('[/admin/stats] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

router.get('/admin/company-stats', async (req: Request, res: Response) => {
  try {
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const stats = await getCompanyStats(from, to);
    res.json(stats);
  } catch (err) {
    console.error('[/admin/company-stats] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

router.get('/admin/unanswered', async (req: Request, res: Response) => {
  try {
    const { limit, offset } = parsePaginationParams(req.query);
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const result = await getUnansweredQuestions({ limit, offset, from, to });
    res.json(result);
  } catch (err) {
    console.error('[/admin/unanswered] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

router.get('/admin/unanswered-grouped', async (req: Request, res: Response) => {
  try {
    const { limit, offset } = parsePaginationParams(req.query);
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const result = await getUnansweredGrouped({ limit, offset, from, to });
    res.json(result);
  } catch (err) {
    console.error('[/admin/unanswered-grouped] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

router.get('/admin/conversations', async (req: Request, res: Response) => {
  try {
    const { limit, offset } = parsePaginationParams(req.query);
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const result = await getRecentConversations({ limit, offset, from, to });
    res.json(result);
  } catch (err) {
    console.error('[/admin/conversations] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

router.get('/admin/feedback/negative', async (req: Request, res: Response) => {
  try {
    const { limit, offset } = parsePaginationParams(req.query);
    const from = parseDateParam(req.query.from);
    const to   = parseDateParam(req.query.to);
    const result = await getNegativeFeedbackMessages({ limit, offset, from, to });
    res.json(result);
  } catch (err) {
    console.error('[/admin/feedback/negative] erro:', err);
    res.status(500).json({ error: 'Erro interno.' });
  }
});

export default router;
