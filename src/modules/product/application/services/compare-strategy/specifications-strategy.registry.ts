import { Injectable } from '@nestjs/common';
import { SpecificationsComparisonStrategy } from './specifications-comparison-strategy.interface';
import { FastChargeStrategy } from './strategies/fastCharge.strategy';
import { MemoryStrategy } from './strategies/memory.strategy';
import { ScreenStrategy } from './strategies/screen.strategy';
import { GreaterNumberStrategy } from './strategies/number.strategy';
import { LowerNumberStrategy } from './strategies/number.strategy';
// Este registro centraliza todas las estrategias de comparación disponibles.
// Cada clave representa un atributo evaluable (p. ej. "memoryAmount", "batteryMah")
// y se asocia a una estrategia que define cómo comparar y cómo formatear ese atributo.
// De esta forma, el resto del sistema puede solicitar dinámicamente la lógica correcta
// para cada atributo sin acoplarse a implementaciones específicas, permitiendo extender
// o modificar comportamientos simplemente agregando o reemplazando estrategias aquí.

@Injectable()
export class SpecificationsStrategyRegistry {
  private readonly strategies: Record<string, SpecificationsComparisonStrategy>;

  constructor() {
    const greaterNumber = new GreaterNumberStrategy();
    const lowerNumber = new LowerNumberStrategy();

    this.strategies = {
      // individual numbers simples
      screenWidthPx: greaterNumber,
      screenHeightPx: greaterNumber,
      screenSizeInches: greaterNumber,
      batteryMah: greaterNumber,
      fastChargeWatts: greaterNumber,
      price: lowerNumber,
      rating: greaterNumber,
      cameraMegapixels: greaterNumber,

      // lógicas complejas solo para summaryBalance
      memory: new MemoryStrategy(),
      screen: new ScreenStrategy(),
      battery: new FastChargeStrategy(),
    };
  }

  getStrategy(attribute: string): SpecificationsComparisonStrategy {
    return this.strategies[attribute];
  }

  getAllStrategies(): Record<string, SpecificationsComparisonStrategy> {
    return this.strategies;
  }
}
