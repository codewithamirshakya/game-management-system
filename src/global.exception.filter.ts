import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, LoggerService } from "@nestjs/common";
import { Response } from "express";
import { AbstractException } from "./lib/exception/abstract.exception";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof Error ? exception.message : "Something went wrong";
    const data = exception instanceof AbstractException ? exception.getData() : [];
    this.logger.error(exception);
    response
      .status(status)
      .json({
        success: false,
        statusCode: status,
        message,
        data
      });
  }
}