import type { Request, Response, NextFunction } from 'express';

export function warnIfMissingAdminKey(): void {
  if (!process.env.ADMIN_API_KEY) {
    console.warn('[admin] AVISO: ADMIN_API_KEY não definida no .env — endpoints /admin/* estarão inacessíveis.');
  }
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const key = process.env.ADMIN_API_KEY;
  if (!key || req.headers['x-admin-key'] !== key) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }
  next();
}
