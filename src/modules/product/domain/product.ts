import { AggregateRoot } from './value-objects/aggregateRoot';

export interface ProductSpecifications {
  memoryAmount: number;
  memoryUnit: 'GB' | 'TB';
  screenWidthPx: number;
  screenHeightPx: number;
  screenSizeInches: number;
  batteryMah: number;
  fastChargeWatts: number;
  cameraMegapixels: number;
}

export class ProductEntity extends AggregateRoot {
  public name: string;
  public imageUrl: string;
  public description: string;
  public price: string;
  public rating: number;
  public specifications: ProductSpecifications;

  constructor(public id?: string) {
    super();
  }
}
