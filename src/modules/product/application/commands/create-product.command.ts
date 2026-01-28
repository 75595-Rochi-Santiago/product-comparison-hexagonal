import { ProductSpecifications } from '../../domain/product';

export class CreateProductCommand {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly specifications: ProductSpecifications;
}
