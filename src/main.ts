import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    })
  );
  const port = process.env.PORT || configService.get('PORT');

  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
