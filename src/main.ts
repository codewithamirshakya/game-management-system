import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/core/app/app.module';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";
import { GlobalExceptionFilter } from "./modules/core/app/filter/global.exception.filter";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { Logger as BaseLogger } from '@nestjs/common';
import {  initializeTransactionalContext } from "typeorm-transactional";

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule,{bufferLogs: true
  ,abortOnError: true});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(Logger)));
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  BaseLogger.flush();// flush buffer when application starts
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}

bootstrap();
