import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './config/config.service';
import { ApplicationBootraspOptions } from '../common/interfaces/application-boostrap-options.interface';
//Este modulo recibe un driver y selecciona la configuracion de infraestructura correspondiente
@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootraspOptions): DynamicModule {
    const imports: any[] = [];

    if (options.driver === 'orm') {
      imports.push(
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      );
      imports.push(
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'sqlite',
            database: config.get('DB_PATH') ?? 'data/db.sqlite',
            autoLoadEntities: true,
            synchronize: config.get('NODE_ENV') !== 'production',
            //logging: config.get('NODE_ENV') !== 'production',
          }),
        }),
      );
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
