import type { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      internalUserId?: string;
      internalUserLogin?: string;
      internalCompanyName?: string;
    }
  }
}

export function internalAuth(req: Request, res: Response, next: NextFunction): void {
  const key = process.env.COFFINHO_INTERNAL_KEY;
  if (!key || req.headers['x-internal-key'] !== key) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }
  req.internalUserId      = req.headers['x-user-id']      as string | undefined;
  req.internalUserLogin   = req.headers['x-user-login']   as string | undefined;
  req.internalCompanyName = req.headers['x-company-name'] as string | undefined;
  next();
}
