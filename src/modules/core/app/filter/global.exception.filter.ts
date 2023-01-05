import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
  BadRequestException
} from "@nestjs/common";
import { Response } from "express";
import { AbstractException } from "../../../../lib/exception/abstract.exception";
import * as fs from "fs";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();


    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.message : "Critical internal server error occurred!";
    const data = exception instanceof AbstractException ? exception.getData() : [];
    const error = exception instanceof AbstractException ? exception.getError() : null;
    this.logger.error(exception);

    const errorResponse = this.getErrorResponse(status,message,request);
    const errorLog = this.getErrorLog(errorResponse, request, exception)
    this.writeErrorLogToFile(errorLog);

    let prodResponse: any = {
      success: false,
      statusCode: status,
      message,
      data,
    }

    // for validation messages
    if(exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse() as { message };
      prodResponse = {...prodResponse, message: exceptionResponse.message}
    }

    let devResponse: any = {...prodResponse, stackTrace: this.getStackTrace(exception)}
    if(error) {
      devResponse = {...devResponse, error: error};
    }

    response
      .status(status)
      .json(process.env.APP_ENV === 'dev'? devResponse: prodResponse);
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private getErrorLog = (
    errorResponse,
    request: Request,
    exception: unknown,
  ): string => {
    const { statusCode, error } = errorResponse;
    const { method, url } = request;
    return `Response Code: ${statusCode} - Method: ${method} - URL: ${url}
    ${JSON.stringify(errorResponse)}
    ${exception instanceof HttpException ? exception.stack : error}\n\n`;
  };

  private getStackTrace(exception) {
    return exception instanceof HttpException ? exception.stack : 'Internal Server Error.';
  }


  private writeErrorLogToFile = (errorLog: string): void => {
    fs.appendFile('logs/error.log', errorLog, 'utf8', (err) => {
      if (err) throw err;
    });
  };
}