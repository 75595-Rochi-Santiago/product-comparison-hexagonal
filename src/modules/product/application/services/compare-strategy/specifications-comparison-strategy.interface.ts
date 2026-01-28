export interface SpecificationsComparisonStrategy {
  compare(a: any, b: any, key?: string): 'A' | 'B' | 'tie';
  getDisplayValue?(value: any, key?: string): string;
}
