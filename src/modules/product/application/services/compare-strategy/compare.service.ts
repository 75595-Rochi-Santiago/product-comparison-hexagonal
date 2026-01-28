/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Injectable, NotFoundException } from '@nestjs/common';
import { SpecificationsStrategyRegistry } from './specifications-strategy.registry';
import { ProductService } from '../product.service';
import { ProductSpecifications } from '../../../domain/product';
import { CompareProductsQuery } from '../../queries/compare-products.query';

export interface CompareResultItem {
  attribute?: string; // detailedComparisons
  balance?: string; // summaryBalance
  valueA: number | string;
  valueB: number | string;
  winner: 'A' | 'B' | 'tie';
}

export interface CompareResponse {
  detailedComparisons: CompareResultItem[];
  summaryBalance: CompareResultItem[];
}

@Injectable()
export class CompareProductsService {
  constructor(
    private readonly productsService: ProductService,
    private readonly specificationsRegistry: SpecificationsStrategyRegistry,
  ) {}

  async compare(products: CompareProductsQuery): Promise<CompareResponse> {
    const { productAId, productBId } = products;
    const productA = await this.productsService.findById(productAId);
    const productB = await this.productsService.findById(productBId);

    if (!productA || !productB) {
      throw new NotFoundException('Producto no encontrado');
    }

    const detailedComparisons: CompareResultItem[] = [];

    // Crea un array de keys: specifications properties + price + rating
    const keys = [
      ...Object.keys(productA.specifications),
      'price',
      'rating',
    ] as Array<keyof ProductSpecifications | 'price' | 'rating'>;

    for (const attribute of keys) {
      // Obtiene la estrategia específica para el atributo actual (p. ej., "weight", "price", "rating")
      const strategy = this.specificationsRegistry.getStrategy(
        attribute as string,
      );
      if (!strategy) continue;

      // Ejecuta la comparación usando la estrategia correspondiente.
      // Para price/rating se pasa el producto completo,
      // para las demás propiedades solo se pasa el objeto specifications.
      const winner = strategy.compare(
        attribute === 'price' || attribute === 'rating'
          ? productA
          : productA.specifications,
        attribute === 'price' || attribute === 'rating'
          ? productB
          : productB.specifications,
        attribute,
      );

      // Obtiene el valor "visible" para productA.
      // Si la estrategia provee getDisplayValue, se usa para formateo personalizado.
      // Si no, se usa directamente el valor raw desde productA o specifications.
      const valueA = strategy.getDisplayValue
        ? strategy.getDisplayValue(
            attribute === 'price' || attribute === 'rating'
              ? productA
              : productA.specifications,
            attribute,
          )
        : attribute === 'price' || attribute === 'rating'
          ? productA[attribute]
          : productA.specifications[attribute as keyof ProductSpecifications];

      // Igual que el bloque anterior pero para productB.
      const valueB = strategy.getDisplayValue
        ? strategy.getDisplayValue(
            attribute === 'price' || attribute === 'rating'
              ? productB
              : productB.specifications,
            attribute,
          )
        : attribute === 'price' || attribute === 'rating'
          ? productB[attribute]
          : productB.specifications[attribute as keyof ProductSpecifications];

      // Registra la comparación detallada para este atributo,
      // incluyendo los valores, el nombre del atributo y quién resultó ganador.
      detailedComparisons.push({
        attribute: attribute.toString(),
        valueA,
        valueB,
        winner,
      });
    }

    // Genera el "summary balance" para atributos clave (memory, screen, battery).
    // Cada uno usa su propia estrategia de comparación y de formateo opcional.
    // Al agregar una nueva estrategia de summaryBalance debe registrarse aqui su key y la estrategia en specifications-strategy.registry
    const summaryBalance: CompareResultItem[] = [];
    const summaryKeys: Array<{ key: string; label: string }> = [
      { key: 'memory', label: 'memory' },
      { key: 'screen', label: 'screen' },
      { key: 'battery', label: 'battery' },
    ];

    for (const { key, label } of summaryKeys) {
      // Obtiene la estrategia de comparación correspondiente a este atributo.
      // Si no existe, se omite el atributo para evitar comparaciones inconsistentes.
      const strategy = this.specificationsRegistry.getStrategy(key);
      if (!strategy) continue;

      // Agrega al resumen el resultado de la comparación:
      // - balance: nombre visible del atributo
      // - valueA/valueB: valores ya formateados si existe getDisplayValue
      // - winner: resultado de la comparación definida por la estrategia
      summaryBalance.push({
        balance: label,
        valueA: strategy.getDisplayValue?.(productA.specifications) ?? 'N/A',
        valueB: strategy.getDisplayValue?.(productB.specifications) ?? 'N/A',
        winner: strategy.compare(
          productA.specifications,
          productB.specifications,
        ),
      });
    }

    return {
      detailedComparisons,
      summaryBalance,
    };
  }
}
