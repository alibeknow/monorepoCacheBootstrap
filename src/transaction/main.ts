import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  RABBIT_TRANSACTION_SEND_QUEUE,
  bootstrapMicroservice,
} from '@shared/microservices';
import { AppTransactionModule } from './app.module';
import { logger } from '@shared/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppTransactionModule,
  );

  await bootstrapMicroservice(app, RABBIT_TRANSACTION_SEND_QUEUE);

  await app.listen(4000);
  logger.info('Server is running on http://localhost:4000, 🚀`');
}

bootstrap();
