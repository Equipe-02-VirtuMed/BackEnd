import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  // Validation
  app.useGlobalPipes(new ValidationPipe()); //this validates the data with the ValidationPipe

  // Swagger
  const config = new DocumentBuilder() //this creates a documentBuilder for validation with swagger
    .setTitle('VirtuMed')
    .setDescription('App for scheduling doctors appointments.')
    .setVersion('1.0.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
