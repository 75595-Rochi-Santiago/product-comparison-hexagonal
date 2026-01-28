import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../../domain/product';
import { ProductRepository } from '../../../../application/ports/product.repository';
import { Product } from '../entities/product.entity';
import { ProductMapper } from '../mappings/product.mapper';

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(pagination: {
    page: number;
    limit: number;
  }): Promise<ProductEntity[]> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const products = await this.productRepository.find({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });
    return products.map((item) => ProductMapper.toDomain(item));
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const found = await this.productRepository.findOne({ where: { name } });
    if (!found) return null;
    return ProductMapper.toDomain(found);
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const persistenceModel = ProductMapper.toPersistence(product);
    const saved = await this.productRepository.save(persistenceModel);
    return ProductMapper.toDomain(saved);
  }

  async update(id: string, product: ProductEntity): Promise<boolean> {
    const persistence = ProductMapper.toPersistence(product);
    const result = await this.productRepository.update(id, persistence);
    if (result.affected === 0) {
      return false;
    }
    return true;
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!product) return null;
    return ProductMapper.toDomain(product);
  }

  async insertMany(products: ProductEntity[]): Promise<string[]> {
    const persistenceModels = products.map((p) =>
      ProductMapper.toPersistence(p),
    );
    const result = await this.productRepository.insert(persistenceModels);
    return result.identifiers?.map((i) => i.id) ?? [];
  }
}
