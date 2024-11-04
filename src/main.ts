import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import { ENV } from './env';
import { setupSwagger } from './swagger';



const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use(urlencoded({ extended: true }));

  app.use(
    json({
      limit: '10mb',
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix(ENV.api.API_PREFIX);

  setupSwagger(app);

  await app.listen(3000);

  logger.log(
    `🚀🚀🚀🚀 Application is running on: ${await app.getUrl()} 🚀🚀🚀🚀`
  );

  logger.log(
    `📖📖📖 Documentation is available on: ${await app.getUrl()}/docs 📖📖📖`
  );

}
bootstrap();
