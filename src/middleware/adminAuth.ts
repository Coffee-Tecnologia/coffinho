import type { Request, Response, NextFunction } from 'express';
import { isBlocked, registerFailedAttempt, registerSuccess } from '../services/rateLimiter.service.js';

export function warnIfMissingAdminKey(): void {
  if (!process.env.ADMIN_API_KEY) {
    console.warn('[admin] AVISO: ADMIN_API_KEY não definida no .env — endpoints /admin/* estarão inacessíveis.');
  }
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim()
    ?? req.socket.remoteAddress
    ?? 'unknown';

  const blockCheck = isBlocked(ip);
  if (blockCheck.blocked) {
    res.status(429).json({
      error: `Muitas tentativas. Tente novamente em ${blockCheck.remainingMinutes} minutos.`,
      blockedFor: blockCheck.remainingMinutes,
    });
    return;
  }

  const key = process.env.ADMIN_API_KEY;
  if (key && req.headers['x-admin-key'] === key) {
    registerSuccess(ip);
    next();
    return;
  }

  const result = registerFailedAttempt(ip);
  if (result.blocked) {
    res.status(429).json({
      error: 'Chave inválida. Acesso bloqueado por 2 horas.',
      blockedFor: 120,
    });
    return;
  }

  res.status(401).json({ error: 'Não autorizado.', attemptsLeft: result.attemptsLeft });
}
