import { ProductSpecifications } from '../../domain/product';

export class UpdateProductCommand {
  public readonly name?: string;
  public readonly description?: string;
  public readonly price?: number;
  public readonly specifications?: Partial<ProductSpecifications>;
}
