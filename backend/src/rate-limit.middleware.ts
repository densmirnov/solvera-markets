import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX = 120;

interface Counter {
  count: number;
  resetAt: number;
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private counters = new Map<string, Counter>();

  use(req: Request, res: Response, next: NextFunction): void {
    const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || DEFAULT_WINDOW_MS);
    const max = Number(process.env.RATE_LIMIT_MAX || DEFAULT_MAX);
    const key = req.ip || "unknown";
    const now = Date.now();

    let counter = this.counters.get(key);
    if (!counter || now > counter.resetAt) {
      counter = { count: 0, resetAt: now + windowMs };
      this.counters.set(key, counter);
    }

    counter.count += 1;
    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader("X-RateLimit-Remaining", String(Math.max(0, max - counter.count)));
    res.setHeader("X-RateLimit-Reset", String(counter.resetAt));

    if (counter.count > max) {
      res.status(429).json({ code: "RATE_LIMIT", message: "Too many requests" });
      return;
    }

    next();
  }
}
