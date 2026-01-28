import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ApplicationBootraspOptions } from './common/interfaces/application-boostrap-options.interface';
import { ProductModule } from './modules/product/application/product.module';
import { ProductInfraestructureModule } from './modules/product/infraestructure/infraestructure.module';
import { ConfigModule } from './core/config/config.module';
import { MockModule } from './modules/mock/mock.module';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  //CoreModule: seleccionara la configuracion correspondiente de infraestructura segun el driver
  //metodo withInfraestructure:
  //  Utilizamos el patron composicion del modulo para permitir a los consumidores de nuestro modulo pasar el modulo de infraestructura que quieran utilizar,
  //  mediante un patron composicion
  //ProductInfraestructureModule: Este modulo es reponsable de exportar el modulo de persistencia correcto segun el driver

  static register(options: ApplicationBootraspOptions) {
    const productModule = ProductModule.withInfraestructure(
      ProductInfraestructureModule.use(options.driver),
    );
    const imports = [ConfigModule, CoreModule.forRoot(options), productModule];

    // Solo cargar MockModule si el entorno es development
    if (options.environment === 'development') {
      imports.push(MockModule.register(productModule));
    }

    return {
      module: AppModule,
      imports,
    };
  }
}
