import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCacheDto {
  @ApiProperty({
    name: 'cacheKey',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public readonly cacheKey!: string;
}
