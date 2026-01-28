import { ProductSpecifications } from '../../../../domain/product';
import { SpecificationsComparisonStrategy } from '../specifications-comparison-strategy.interface';

export class FastChargeStrategy implements SpecificationsComparisonStrategy {
  compare(
    a: ProductSpecifications,
    b: ProductSpecifications,
  ): 'A' | 'B' | 'tie' {
    const timeA = a.batteryMah / a.fastChargeWatts;
    const timeB = b.batteryMah / b.fastChargeWatts;

    if (timeA < timeB) return 'A'; // menos tiempo = mejor
    if (timeB < timeA) return 'B';
    return 'tie';
  }

  getDisplayValue(specs: ProductSpecifications): string {
    return `${specs.batteryMah} mAh / ${specs.fastChargeWatts}W`;
  }
}
