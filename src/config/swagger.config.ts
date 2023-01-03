import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Game Integration Provider')
    .setDescription('It is gateway proxy for internal and external game providers')
    .setVersion('1.0')
    .build();
