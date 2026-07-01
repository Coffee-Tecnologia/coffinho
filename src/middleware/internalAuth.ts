import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      internalUserId?: string;
    }
  }
}

export function internalAuth(req: Request, res: Response, next: NextFunction): void {
  const key = process.env.COFFINHO_INTERNAL_KEY;
  if (!key || req.headers['x-internal-key'] !== key) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }
  req.internalUserId = req.headers['x-user-id'] as string | undefined;
  next();
}
