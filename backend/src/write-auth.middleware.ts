import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class WriteAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!this.shouldAuthorize(req)) {
      next();
      return;
    }

    const required = (process.env.WRITE_AUTH_ENABLED || "").toLowerCase() === "true";
    if (!required) {
      next();
      return;
    }

    const expected = process.env.WRITE_API_KEY || "";
    const provided = req.header("x-api-key") || "";
    if (!expected || provided !== expected) {
      res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Invalid or missing API key" }
      });
      return;
    }

    next();
  }

  private shouldAuthorize(req: Request): boolean {
    const method = req.method.toUpperCase();
    return method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
  }
}
