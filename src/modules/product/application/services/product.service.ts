import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from '../ports/product.repository';
import { ProductFactory } from '../../domain/factories/product.factory';
import { ProductEntity } from '../../domain/product';
import { UpdateProductCommand } from '../commands/update-product.command';
import { CreateProductCommand } from '../commands/create-product.command';
import { PaginationQuery } from '../queries/pagination.query';

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly factory: ProductFactory,
  ) {}

  //utilizamos la fabrica de productos para crear un nuevo modelo de dominio de producto y luego lo pasamos al repositorio de productos para guardarlo
  async create(command: CreateProductCommand): Promise<ProductEntity> {
    const exists = await this.repository.findByName(command.name);
    if (exists) {
      throw new ConflictException('Product name already exists');
    }
    const product = this.factory.createFromCommand(command);
    const created = await this.repository.create(product);
    if (!created) throw new ConflictException('Product name already exists');
    return created;
  }

  async update(
    command: UpdateProductCommand,
    id: string,
  ): Promise<ProductEntity> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new NotFoundException(`Product ${id} not found`);

    if (command.name !== undefined && command.name !== exists.name) {
      const existsName = await this.repository.findByName(command.name);
      if (existsName && existsName.id !== id) {
        throw new ConflictException('Product name already exists');
      }
    }

    const updatedEntity = this.factory.updateFromCommand(exists, command);

    const updated = await this.repository.update(id, updatedEntity);
    if (!updated) throw new NotFoundException(`Product ${id} not found`);

    return updatedEntity;
  }

  async findAll(query: PaginationQuery): Promise<ProductEntity[]> {
    return this.repository.findAll(query);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async insertMany(products: ProductEntity[]): Promise<string[]> {
    return await this.repository.insertMany(products);
  }
}
