/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ProductEntity } from '../product/domain/product';
import { ProductSpecifications } from '../product/domain/product';
import { ProductService } from '../product/application/services/product.service';

@Injectable()
export class MockProductGeneratorService {
  constructor(private readonly productService: ProductService) {}

  private generateMockProducts(n: number): ProductEntity[] {
    return Array.from({ length: n }).map(() => {
      const product = new ProductEntity();

      product.name = faker.commerce.productName();
      product.imageUrl = faker.image.url();
      product.description = faker.commerce.productDescription();
      product.price = Number(
        faker.commerce.price({ min: 200, max: 3000 }),
      ).toString();
      product.rating = faker.number.float({
        min: 1,
        max: 5,
        fractionDigits: 1,
      });

      const memoryUnit = faker.helpers.arrayElement<'GB' | 'TB'>(['GB', 'TB']);
      const memoryAmount =
        memoryUnit === 'GB'
          ? faker.number.int({ min: 4, max: 512 })
          : faker.number.int({ min: 1, max: 4 });

      const screenSizeInches = faker.number.float({
        min: 5,
        max: 7,
        fractionDigits: 1,
      });
      const screenWidthPx = faker.helpers.arrayElement([
        1080, 1200, 1440, 2160, 2400, 3200,
      ]);
      const screenHeightPx = faker.helpers.arrayElement([
        1920, 2048, 2560, 2800, 3120, 1440,
      ]);

      const batteryMah = faker.number.int({ min: 2500, max: 6000 });
      const fastChargeWatts = faker.helpers.arrayElement([
        18, 25, 30, 33, 45, 65, 120,
      ]);

      const cameraMegapixels = faker.number.int({ min: 8, max: 108 });

      product.specifications = {
        memoryAmount,
        memoryUnit,
        screenWidthPx,
        screenHeightPx,
        screenSizeInches,
        batteryMah,
        fastChargeWatts,
        cameraMegapixels,
      } as ProductSpecifications;
      return product;
    });
  }
  public async createMockProducts(n: number): Promise<string[]> {
    const products = this.generateMockProducts(n);
    return await this.productService.insertMany(products);
  }
}
