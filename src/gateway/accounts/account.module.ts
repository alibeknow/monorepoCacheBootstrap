import {
  clientFactory,
  MESSAGE_BUS_PROVIDER,
  RABBIT_TRANSACTION_SEND_QUEUE,
} from '@shared/microservices';
import { Module } from '@nestjs/common';
import { AccountService } from '../../account/account/account.service';
import { AccController } from './account.controller';
import { ConfigService } from '@nestjs/config';
import { DatabaseModule } from '../../shared/db/db.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    AccountService,
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
  ],
  controllers: [AccController],
})
export class AccountModule {}
