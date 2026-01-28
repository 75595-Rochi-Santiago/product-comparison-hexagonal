import { Product } from '../entities/product.entity';
import {
  ProductEntity,
  ProductSpecifications,
} from '../../../../domain/product';

export class ProductMapper {
  static toDomain(product: Product): ProductEntity {
    const P = new ProductEntity(product.id);
    P.createdAt = product.createdAt;
    P.updatedAt = product.updatedAt;
    P.name = product.name;
    P.imageUrl = product.imageUrl;
    P.description = product.description;
    P.price = product.price;
    P.rating = product.rating;

    // Mapear specifications asegurando el tipo correcto
    if (product.specifications) {
      P.specifications = {
        memoryAmount: Number(product.specifications.memoryAmount),
        memoryUnit: product.specifications.memoryUnit, //as 'GB' | 'TB'
        screenWidthPx: Number(product.specifications.screenWidthPx),
        screenHeightPx: Number(product.specifications.screenHeightPx),
        screenSizeInches: Number(product.specifications.screenSizeInches),
        batteryMah: Number(product.specifications.batteryMah),
        fastChargeWatts: Number(product.specifications.fastChargeWatts),
        cameraMegapixels: Number(product.specifications.cameraMegapixels),
      } as ProductSpecifications;
    }

    return P;
  }

  static toPersistence(product: ProductEntity): Product {
    const P = new Product();
    P.name = product.name;
    P.imageUrl = product.imageUrl;
    P.description = product.description;
    P.price = product.price;
    P.rating = product.rating;

    if (product.specifications) {
      P.specifications = {
        memoryAmount: product.specifications.memoryAmount,
        memoryUnit: product.specifications.memoryUnit,
        screenWidthPx: product.specifications.screenWidthPx,
        screenHeightPx: product.specifications.screenHeightPx,
        screenSizeInches: product.specifications.screenSizeInches,
        batteryMah: product.specifications.batteryMah,
        fastChargeWatts: product.specifications.fastChargeWatts,
        cameraMegapixels: product.specifications.cameraMegapixels,
      } as ProductSpecifications;
    }

    return P;
  }
}
