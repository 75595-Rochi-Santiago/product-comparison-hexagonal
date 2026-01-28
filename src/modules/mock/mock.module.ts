import { DynamicModule, Module } from '@nestjs/common';
import { MockProductGeneratorService } from './mock-product-generator.service';
import { MockProductsController } from './mock-products.controller';

@Module({})
export class MockModule {
  static register(productModule): DynamicModule {
    return {
      module: MockModule,
      imports: [productModule],
      controllers: [MockProductsController],
      providers: [MockProductGeneratorService],
    };
  }
}
