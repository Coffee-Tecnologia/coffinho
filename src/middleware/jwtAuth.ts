import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface JwtPayload {
  sub: string;       // login do usuário
  USER_UUID: string; // uuid do usuário (claim do Apollo)
  COMPANY_ID: string;
  exp: number;
}

// Extende o tipo Request do Express para carregar o payload após autenticação
declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }
}

export function jwtAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token JWT ausente ou mal formatado.' });
    return;
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('[jwtAuth] JWT_SECRET não definido no .env');
    res.status(500).json({ error: 'Erro de configuração do servidor.' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.jwtPayload = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expirado.' });
    } else {
      res.status(401).json({ error: 'Token inválido.' });
    }
  }
}
