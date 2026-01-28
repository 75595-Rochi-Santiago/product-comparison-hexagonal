import { Type, DynamicModule, Module } from '@nestjs/common';
import { ProductFactory } from '../domain/factories/product.factory';
import { ProductController } from '../presenters/product/product.controller';
import { CompareProductsService } from './services/compare-strategy/compare.service';
import { SpecificationsStrategyRegistry } from './services/compare-strategy/specifications-strategy.registry';
import { ProductService } from './services/product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductFactory,
    CompareProductsService,
    SpecificationsStrategyRegistry,
  ],
  exports: [ProductService],
})
export class ProductModule {
  //Utilizamos el patron composicion del modulo para permitir a los consumidores de nuestro modulo pasar el modulo de infraestructura que quieran utilizar
  //Permitiendonos desacoplar la infraestructura de la capa de aplicacion
  static withInfraestructure(infraestructureModule: Type | DynamicModule) {
    return {
      module: ProductModule,
      imports: [infraestructureModule],
      exports: [ProductService, ProductFactory],
    };
  }
}
