import { Module } from '@nestjs/common';
import { ProductRepository } from '../../../application/ports/product.repository';
import { TypeOrmProductRepository } from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  //Vinculamos un puerto a un adaptador utilizando custom providers, cada vez que se solicite un token(port) nest inyecta su clase correspondiente(adapter)
  providers: [
    { provide: ProductRepository, useClass: TypeOrmProductRepository },
  ],
  exports: [ProductRepository], //exportamos el token para que pueda ser utilizado por otros modulos
})
export class TypeORMPersistenceModule {}
