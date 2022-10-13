import { ConfigModule } from '@shared/config';
import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ConfigModule, TransactionModule],
})
export class AppTransactionModule {}
