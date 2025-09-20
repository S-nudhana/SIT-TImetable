import { rateLimiter } from 'hono-rate-limiter'

export const rateLimiterConfig = rateLimiter({
    windowMs: 60 * 1000,
    limit: 100,
    keyGenerator: (c) => {
        const cfIp = c.req.header('cf-connecting-ip');
        if (cfIp) return cfIp;

        const xff = c.req.header('x-forwarded-for');
        if (xff) return xff.split(',')[0].trim();

        return c.req.header('x-real-ip') || 'unknown';
    }
})