import { ProductSpecifications } from '../../../../domain/product';
import { SpecificationsComparisonStrategy } from '../specifications-comparison-strategy.interface';

export class ScreenStrategy implements SpecificationsComparisonStrategy {
  compare(
    a: ProductSpecifications,
    b: ProductSpecifications,
  ): 'A' | 'B' | 'tie' {
    const ppiA =
      Math.sqrt(a.screenWidthPx ** 2 + a.screenHeightPx ** 2) /
      a.screenSizeInches;
    const ppiB =
      Math.sqrt(b.screenWidthPx ** 2 + b.screenHeightPx ** 2) /
      b.screenSizeInches;
    if (ppiA > ppiB) return 'A';
    if (ppiB > ppiA) return 'B';
    return 'tie';
  }

  getDisplayValue(specs: ProductSpecifications): string {
    const ppi =
      Math.sqrt(specs.screenWidthPx ** 2 + specs.screenHeightPx ** 2) /
      specs.screenSizeInches;

    return `${ppi.toFixed(2)} PPI (${specs.screenWidthPx}x${specs.screenHeightPx})`;
  }
}
