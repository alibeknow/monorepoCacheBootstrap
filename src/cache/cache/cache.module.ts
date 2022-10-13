import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { Module, CacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheStoreModule {}
