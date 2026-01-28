import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './core/config/config.service';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(ConfigService.name);
  const configService = new ConfigService();
  if (!configService.hasRequiredEnvVars()) {
    return process.exit(1);
  }

  // Asegurar de que el directorio de datos exista (para que SQLite pueda crear el archivo).
  const dbPath = process.env.DB_PATH ?? 'data/db.sqlite';
  const dbDir = dirname(dbPath);
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }

  const environment = configService.get('NODE_ENV') ?? 'development';
  const raw = configService.get('DRIVER');
  const driver: 'orm' | 'json' = raw === 'json' ? 'json' : 'orm';

  const app = await NestFactory.create(
    AppModule.register({ driver: driver, environment: environment }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        logger.error('Validation errors:', JSON.stringify(errors, null, 2));
        return new BadRequestException(errors);
      },
    }),
  );

  const apiPrefix = configService.get('apiPrefix') || '';
  if (apiPrefix !== '') {
    app.setGlobalPrefix(apiPrefix);
  }

  const options = new DocumentBuilder()
    .setTitle('product-comparison-hexagonal - Rochi Santiago')
    .setVersion('2.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const swaggerPath = `${apiPrefix ? apiPrefix + '/' : ''}api`;
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(
    `🚀 \x1b[32mServer running\x1b[0m → \x1b[36mhttp://localhost:${port}/${apiPrefix}\x1b[0m`,
  );
  logger.log(
    `📘 Swagger Docs → \x1b[36mhttp://localhost:${port}/${swaggerPath}\x1b[0m`,
  );
}
void bootstrap();
