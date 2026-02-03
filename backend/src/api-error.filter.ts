import { Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

interface ErrorPayload {
  error: {
    code: string;
    message: string;
  };
}

@Catch()
export class ApiErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: import("@nestjs/common").ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === "object" && body && "error" in body) {
        response.status(status).json(body as ErrorPayload);
        return;
      }
      response.status(status).json({
        error: {
          code: "HTTP_ERROR",
          message: (body as { message?: string })?.message || exception.message
        }
      });
      return;
    }

    const message = exception instanceof Error ? exception.message : "Unexpected error";
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        code: "INTERNAL_ERROR",
        message
      }
    });
  }
}
