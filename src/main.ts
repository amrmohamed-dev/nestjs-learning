import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.setGlobalPrefix('api');

  await app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
  });
}

bootstrap();
