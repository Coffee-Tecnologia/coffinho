interface LoginAttempt {
  count: number;
  blockedUntil?: Date;
  lastAttempt: Date;
}

const attempts = new Map<string, LoginAttempt>();
const MAX_ATTEMPTS = 3;
const BLOCK_MS     = 2 * 60 * 60 * 1000; // 2 horas

export function isBlocked(ip: string): { blocked: boolean; remainingMinutes?: number } {
  const entry = attempts.get(ip);
  if (!entry?.blockedUntil) return { blocked: false };

  const now = new Date();
  if (entry.blockedUntil > now) {
    const remainingMinutes = Math.ceil((entry.blockedUntil.getTime() - now.getTime()) / 60000);
    return { blocked: true, remainingMinutes };
  }

  attempts.delete(ip);
  return { blocked: false };
}

export function registerFailedAttempt(ip: string): { blocked: boolean; attemptsLeft: number } {
  const now   = new Date();
  const entry = attempts.get(ip) ?? { count: 0, lastAttempt: now };
  entry.count += 1;
  entry.lastAttempt = now;

  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = new Date(now.getTime() + BLOCK_MS);
    attempts.set(ip, entry);
    return { blocked: true, attemptsLeft: 0 };
  }

  attempts.set(ip, entry);
  return { blocked: false, attemptsLeft: MAX_ATTEMPTS - entry.count };
}

export function registerSuccess(ip: string): void {
  attempts.delete(ip);
}

// Limpeza a cada 10 min — remove entradas expiradas ou inativas
setInterval(() => {
  const now = new Date();
  for (const [ip, entry] of attempts) {
    const expired  = entry.blockedUntil && entry.blockedUntil <= now;
    const inactive = !entry.blockedUntil && (now.getTime() - entry.lastAttempt.getTime()) > 10 * 60 * 1000;
    if (expired || inactive) attempts.delete(ip);
  }
}, 10 * 60 * 1000);
