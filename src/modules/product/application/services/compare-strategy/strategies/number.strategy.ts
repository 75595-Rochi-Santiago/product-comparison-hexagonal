/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SpecificationsComparisonStrategy } from '../specifications-comparison-strategy.interface';

export class GreaterNumberStrategy {
  compare(a: any, b: any, key?: string): 'A' | 'B' | 'tie' {
    const valueA = key ? a[key] : a;
    const valueB = key ? b[key] : b;

    if (valueA > valueB) return 'A';
    if (valueB > valueA) return 'B';
    return 'tie';
  }

  getDisplayValue(value: any, key?: string): string {
    // eslint-disable-next-line prefer-const
    let val = key ? value[key] : value;

    return String(val);
  }
}

export class LowerNumberStrategy implements SpecificationsComparisonStrategy {
  compare(a: any, b: any, key?: string): 'A' | 'B' | 'tie' {
    const valueA = key ? a[key] : a;
    const valueB = key ? b[key] : b;

    if (valueA < valueB) return 'A';
    if (valueB < valueA) return 'B';
    return 'tie';
  }

  getDisplayValue(value: any, key?: string): string {
    const val = key ? value[key] : value;
    return String(val);
  }
}
