import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetByIdDto {
  @ApiProperty({ description: 'UUID del producto' })
  @IsUUID('4')
  id: string;
}
