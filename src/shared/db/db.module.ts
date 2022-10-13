import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from '@shared/config';
import { AccountEntity } from '../account/account.entity';
import { TransactionsEntity } from '../transactions/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
    }),
    TypeOrmModule.forFeature([AccountEntity, TransactionsEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
