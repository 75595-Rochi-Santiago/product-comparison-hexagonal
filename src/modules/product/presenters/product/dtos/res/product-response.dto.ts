import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    example: '0bdcd5db-055d-4334-96e9-f080006cfb78',
    description: 'Product UUID',
  })
  id: string;

  @ApiProperty({
    example: '2025-11-14T11:25:35.000Z',
    description: 'Creation timestamp',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-11-14T11:25:35.000Z',
    description: 'Last update timestamp',
  })
  updatedAt: string;

  @ApiProperty({ example: 'Modern Cotton Chair', description: 'Product name' })
  name: string;

  @ApiProperty({
    example: 'https://loremflickr.com/152/1933?lock=4476196400685403',
    description: 'Image URL',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'Our dolphin-friendly Bacon ensures worthy comfort for your pets',
    description: 'Short description',
  })
  description: string;

  @ApiProperty({ example: 1680.35, description: 'Price in local currency' })
  price: number;

  @ApiProperty({ example: 2.3, description: 'Average rating (0-5)' })
  rating: number;

  @ApiProperty({
    example: {
      memoryAmount: 106,
      memoryUnit: 'GB',
      screenWidthPx: 2160,
      screenHeightPx: 3120,
      screenSizeInches: 5.3,
      batteryMah: 3801,
      fastChargeWatts: 120,
      cameraMegapixels: 9,
    },
    description: 'Flexible product specifications',
  })
  specifications: Record<string, any>;
}
