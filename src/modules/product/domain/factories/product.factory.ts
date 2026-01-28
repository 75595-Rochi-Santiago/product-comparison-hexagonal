import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../product';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';

@Injectable()
export class ProductFactory {
  createFromCommand(command: CreateProductCommand): ProductEntity {
    const product = new ProductEntity();
    product.name = command.name;
    product.description = command.description;
    product.price = command.price.toString();
    product.specifications = command.specifications;
    return product;
  }

  updateFromCommand(
    entity: ProductEntity,
    command: UpdateProductCommand,
  ): ProductEntity {
    if (command.name !== undefined) entity.name = command.name;
    if (command.description !== undefined)
      entity.description = command.description;
    if (command.price !== undefined) entity.price = command.price.toString();

    if (command.specifications) {
      entity.specifications = {
        ...entity.specifications,
        ...command.specifications,
      };
    }

    return entity;
  }
}
