import { Controller, Post, Query } from '@nestjs/common';
import { MockProductGeneratorService } from './mock-product-generator.service';

@Controller('mock/products')
export class MockProductsController {
  constructor(private readonly generator: MockProductGeneratorService) {}

  @Post()
  getMockProducts(@Query('count') count: string = '10') {
    const num = Number(count);
    return this.generator.createMockProducts(Number.isNaN(num) ? 10 : num);
  }
}
