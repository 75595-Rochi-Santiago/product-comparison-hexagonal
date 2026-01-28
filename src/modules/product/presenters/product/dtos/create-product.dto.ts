import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductSpecificationsDto {
  @ApiProperty({ example: 106 })
  @IsNumber()
  memoryAmount: number;

  @ApiProperty({ example: 'GB' })
  @IsString()
  memoryUnit: string;

  @ApiProperty({ example: 2160 })
  @IsNumber()
  screenWidthPx: number;

  @ApiProperty({ example: 3120 })
  @IsNumber()
  screenHeightPx: number;

  @ApiProperty({ example: 5.3 })
  @IsNumber()
  screenSizeInches: number;

  @ApiProperty({ example: 3801 })
  @IsNumber()
  batteryMah: number;

  @ApiProperty({ example: 120 })
  @IsNumber()
  fastChargeWatts: number;

  @ApiProperty({ example: 9 })
  @IsNumber()
  cameraMegapixels: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Modern Cotton Chair' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Our dolphin-friendly Bacon ensures worthy comfort for your pets',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '1680.35' })
  @IsString()
  price: string;

  @ApiProperty({ type: ProductSpecificationsDto })
  @ValidateNested()
  @Type(() => ProductSpecificationsDto)
  specifications: ProductSpecificationsDto;
}
