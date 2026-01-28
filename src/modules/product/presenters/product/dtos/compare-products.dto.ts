import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CompareProductsDto {
  @ApiProperty({ description: 'UUID del primer producto' })
  @IsUUID('4')
  productAId: string;

  @ApiProperty({ description: 'UUID del segundo producto' })
  @IsUUID('4')
  productBId: string;
}
