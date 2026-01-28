import { Test, TestingModule } from '@nestjs/testing';
import {
  CompareProductsService,
  CompareResponse,
} from '../application/services/compare-strategy/compare.service';
import { SpecificationsStrategyRegistry } from '../application/services/compare-strategy/specifications-strategy.registry';
import { ScreenStrategy } from '../application/services/compare-strategy/strategies/screen.strategy';
import { ProductService } from '../application/services/product.service';

describe('CompareProductsService', () => {
  let service: CompareProductsService;
  let mockProductService: Partial<ProductService>;
  let mockRegistry: Partial<SpecificationsStrategyRegistry>;

  beforeEach(async () => {
    // Mocks
    mockProductService = {
      findById: jest.fn().mockImplementation((id: string) => {
        if (id === 'A')
          return Promise.resolve({
            id: 'A',
            price: 500,
            rating: 4.5,
            specifications: {
              screenSizeInches: 5.8,
              screenWidthPx: 1440,
              screenHeightPx: 2560,
              batteryMah: 3000,
              memoryAmount: 8,
            },
          });
        if (id === 'B')
          return Promise.resolve({
            id: 'B',
            price: 600,
            rating: 4.8,
            specifications: {
              screenSizeInches: 5.3,
              screenWidthPx: 2160,
              screenHeightPx: 3120,
              batteryMah: 3500,
              memoryAmount: 6,
            },
          });
        return Promise.resolve(null);
      }),
    };

    const screenStrategy = new ScreenStrategy();
    mockRegistry = {
      getStrategy: jest.fn((key: string) => {
        if (key === 'screen') return screenStrategy;
        if (key === 'price' || key === 'rating') {
          return {
            compare: jest.fn(() => 'A'),
            getDisplayValue: jest.fn((product) => product[key]),
          };
        }
        return {
          compare: jest.fn(() => 'tie'),
          getDisplayValue: jest.fn((specs) => specs[key]),
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompareProductsService,
        { provide: ProductService, useValue: mockProductService },
        { provide: SpecificationsStrategyRegistry, useValue: mockRegistry },
      ],
    }).compile();

    service = module.get<CompareProductsService>(CompareProductsService);
  });

  it('should return detailed comparisons and summary balance', async () => {
    const result: CompareResponse = await service.compare({
      productAId: 'A',
      productBId: 'B',
    });

    expect(result.detailedComparisons.length).toBeGreaterThan(0);
    expect(result.summaryBalance.length).toBeGreaterThan(0);

    // Verificar que la estrategia de screen se uso
    const screenComparison = result.summaryBalance.find(
      (s) => s.balance === 'screen',
    );
    expect(screenComparison).toBeDefined();
    expect(['A', 'B', 'tie']).toContain(screenComparison?.winner);

    // Verificar que los valores de valueA/valueB existen
    expect(screenComparison?.valueA).toBeDefined();
    expect(screenComparison?.valueB).toBeDefined();
  });

  it('should throw NotFoundException if a product is missing', async () => {
    await expect(
      service.compare({ productAId: 'A', productBId: 'C' }),
    ).rejects.toThrow('Producto no encontrado');
  });
});
