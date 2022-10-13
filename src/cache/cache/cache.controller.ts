import { SetCacheDto } from './dto/cache.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CacheService } from './cache.service';
import { GetCacheDto } from './dto/getCache.dto';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post('/')
  async setCache(@Body() data: SetCacheDto): Promise<string> {
    this.cacheService.setCache(data);
    return 'ok';
  }

  @Get('/')
  getCache(@Param('key') key: GetCacheDto): Promise<unknown> {
    return this.cacheService.getCache(key);
  }
}
