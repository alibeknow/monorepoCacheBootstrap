import { Module } from '@nestjs/common';
import { ConfigModule } from '@shared/config';
import { AccountModule } from './accounts/account.module';

@Module({
  imports: [ConfigModule, AccountModule],
})
export class AppGatewayModule {}
