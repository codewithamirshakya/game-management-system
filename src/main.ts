import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/core/main/app.module';
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config/swagger.config";
import { GlobalExceptionFilter } from "./modules/core/main/filter/global.exception.filter";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { Logger as BaseLogger } from '@nestjs/common';
import {  initializeTransactionalContext } from "typeorm-transactional";
import { useContainer } from "typeorm";
import * as fs from 'fs'

// Use
async function bootstrap() {
  !fs.existsSync(`./logs/pino.log`) && fs.createReadStream(`./logs/pino.log`)

  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule,{bufferLogs: true
  ,abortOnError: true});
  // app.useGlobalPipes(new ValidationPipe({transform: true,
  //   whitelist: true,forbidNonWhitelisted: true}));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(Logger)));
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  BaseLogger.flush();// flush buffer when application starts
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(8000);
}

bootstrap();
