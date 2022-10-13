import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as CustomConfigModule } from '@shared/config';
import { TransactionController } from './transaction.controller';
import {
  MESSAGE_BUS_PROVIDER,
  clientFactory,
  RABBIT_TRANSACTION_SEND_QUEUE,
} from '@shared/microservices';
import { TransactionService } from './transaction.service';
import { DatabaseModule } from '@/shared/db';

@Module({
  imports: [CustomConfigModule, DatabaseModule],
  controllers: [TransactionController],
  providers: [
    {
      provide: RABBIT_TRANSACTION_SEND_QUEUE,
      useFactory: (configService: ConfigService) =>
        configService.get<string>(RABBIT_TRANSACTION_SEND_QUEUE),
      inject: [ConfigService],
    },
    {
      provide: MESSAGE_BUS_PROVIDER,
      useFactory: clientFactory,
      inject: [ConfigService, RABBIT_TRANSACTION_SEND_QUEUE],
    },
    TransactionService,
  ],
})
export class TransactionModule {}
