import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetCacheDto {
  @ApiProperty({
    name: 'contractId',
    type: String,
  })
  @IsNotEmpty()
  public readonly cacheData!: Record<string, unknown>;
}
