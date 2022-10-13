import { DatabaseModule } from '@shared/db/db.module';
import { Module } from '@nestjs/common';
import { AccountsModule } from './account';
import { ConfigModule } from '@shared/config';

@Module({
  imports: [ConfigModule, AccountsModule],
})
export class AppModule {}
