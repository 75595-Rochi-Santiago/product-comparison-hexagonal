import { ProductEntity } from '../../domain/product';
import { PaginationDto } from '../../presenters/product/dtos/pagination.dto';

//Utilizamos clases abstractas en vez de interfaces para poder proporcionar su implementacion por medio de adapters
//Las clases abstractas siven como tokens de inyeccion en nest mientras que las interfaces son puramente TS y se eliminan durante el build

export abstract class ProductRepository {
  abstract findAll(pagination: PaginationDto): Promise<ProductEntity[]>;
  abstract findById(id: string): Promise<ProductEntity | null>;
  abstract findByName(name: string): Promise<ProductEntity | null>;
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract update(
    id: string,
    product: Partial<ProductEntity>,
  ): Promise<boolean>;
  abstract insertMany(products: ProductEntity[]): Promise<string[]>;
}
