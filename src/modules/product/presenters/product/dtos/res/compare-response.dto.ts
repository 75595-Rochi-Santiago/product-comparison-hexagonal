import { ApiProperty } from '@nestjs/swagger';

export class DetailedComparisonDto {
  @ApiProperty({
    example: 'screenWidthPx',
    description: 'Nombre del atributo comparado',
  })
  attribute: string;

  @ApiProperty({
    example: '1440',
    description: 'Valor del producto A como string',
  })
  valueA: string;

  @ApiProperty({
    example: '1440',
    description: 'Valor del producto B como string',
  })
  valueB: string;

  @ApiProperty({
    example: 'tie',
    description: "Ganador de la comparación: 'A', 'B' o 'tie'",
  })
  winner: 'A' | 'B' | 'tie';
}

export class SummaryBalanceDto {
  @ApiProperty({
    example: 'screen',
    description: 'Tipo de balance (screen, memory, battery, etc.)',
  })
  balance: string;

  @ApiProperty({
    example: '469.94 PPI (1440x2800)',
    description: 'Valor formateado del producto A',
  })
  valueA: string;

  @ApiProperty({
    example: '419.60 PPI (1440x2560)',
    description: 'Valor formateado del producto B',
  })
  valueB: string;

  @ApiProperty({
    example: 'A',
    description: "Ganador del balance: 'A', 'B' o 'tie'",
  })
  winner: 'A' | 'B' | 'tie';
}

export class ProductComparisonResponseDto {
  @ApiProperty({
    example: [
      {
        attribute: 'screenWidthPx',
        valueA: '1440',
        valueB: '1440',
        winner: 'tie',
      },
      {
        attribute: 'screenHeightPx',
        valueA: '2800',
        valueB: '2560',
        winner: 'A',
      },
      {
        attribute: 'screenSizeInches',
        valueA: '6.7',
        valueB: '7',
        winner: 'B',
      },
      { attribute: 'batteryMah', valueA: '5176', valueB: '4382', winner: 'A' },
      { attribute: 'fastChargeWatts', valueA: '45', valueB: '33', winner: 'A' },
      { attribute: 'cameraMegapixels', valueA: '76', valueB: '8', winner: 'A' },
      { attribute: 'price', valueA: '1937.09', valueB: '2282.15', winner: 'A' },
      { attribute: 'rating', valueA: '3', valueB: '4.4', winner: 'B' },
    ],
    description: 'Comparaciones detalladas de cada atributo',
    type: [DetailedComparisonDto],
  })
  detailedComparisons: DetailedComparisonDto[];

  @ApiProperty({
    example: [
      { balance: 'memory', valueA: '411 GB', valueB: '282 GB', winner: 'A' },
      {
        balance: 'screen',
        valueA: '469.94 PPI (1440x2800)',
        valueB: '419.60 PPI (1440x2560)',
        winner: 'A',
      },
      {
        balance: 'battery',
        valueA: '5176 mAh / 45W',
        valueB: '4382 mAh / 33W',
        winner: 'A',
      },
    ],
    description: 'Resumen de balances por categoría',
    type: [SummaryBalanceDto],
  })
  summaryBalance: SummaryBalanceDto[];
}
