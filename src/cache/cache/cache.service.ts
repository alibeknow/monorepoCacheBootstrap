import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SetCacheDto } from './dto/cache.dto';
import { GetCacheDto } from './dto/getCache.dto';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  setCache(data: SetCacheDto): Promise<string> {
    return this.cacheManager.set<string>(
      data.cacheData.id as string,
      data.cacheData.value as string,
    );
  }

  getCache(data: GetCacheDto): Promise<unknown> {
    return this.cacheManager.get(data.cacheKey);
  }
}
