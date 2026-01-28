import { SpecificationsComparisonStrategy } from '../specifications-comparison-strategy.interface';
import { ProductSpecifications } from '../../../../domain/product';

export class MemoryStrategy implements SpecificationsComparisonStrategy {
  compare(
    a: ProductSpecifications,
    b: ProductSpecifications,
  ): 'A' | 'B' | 'tie' {
    const sizeA =
      a.memoryUnit === 'TB' ? a.memoryAmount * 1024 : a.memoryAmount;
    const sizeB =
      b.memoryUnit === 'TB' ? b.memoryAmount * 1024 : b.memoryAmount;

    if (sizeA > sizeB) return 'A';
    if (sizeB > sizeA) return 'B';
    return 'tie';
  }

  getDisplayValue(specs: ProductSpecifications): string {
    return `${specs.memoryAmount} ${specs.memoryUnit}`;
  }
}
