import { Module } from '@nestjs/common';
import { TypeORMPersistenceModule } from './persistence/typeORM/typeORM-persistence.module';

//Este modulo es reponsable de exportar el modulo de persistencia correcto segun el driver
@Module({})
export class ProductInfraestructureModule {
  static use(driver: 'orm' | 'json') {
    const persistenceModule =
      driver === 'orm' ? TypeORMPersistenceModule : TypeORMPersistenceModule;
    return {
      module: ProductInfraestructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
