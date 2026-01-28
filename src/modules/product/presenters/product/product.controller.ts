import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from './dtos/pagination.dto';
import { CompareProductsDto } from './dtos/compare-products.dto';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { PaginationQuery } from '../../application/queries/pagination.query';
import { CompareProductsService } from '../../application/services/compare-strategy/compare.service';
import { GetByIdDto } from './dtos/get-byId.dto';
import { ProductResponseDto } from './dtos/res/product-response.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { CompareProductsQuery } from '../../application/queries/compare-products.query';
import { ProductService } from '../../application/services/product.service';
import { ProductComparisonResponseDto } from './dtos/res/compare-response.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly compareService: CompareProductsService,
  ) {}

  @Get('/compare')
  @ApiOperation({ summary: 'Compara dos productos por ID' })
  @ApiResponse({ status: 200, type: ProductComparisonResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Comparación realizada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Alguno de los productos no existe.',
  })
  @ApiQuery({
    name: 'productAId',
    required: true,
    type: String,
    description: 'UUID del primer producto',
  })
  @ApiQuery({
    name: 'productBId',
    required: true,
    type: String,
    description: 'UUID del segundo producto',
  })
  async compareProducts(@Query() queryDto: CompareProductsDto): Promise<any> {
    const query = Object.assign(new CompareProductsQuery(), queryDto);
    return this.compareService.compare(query);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos de forma paginada' })
  @ApiResponse({ status: 200, type: [ProductResponseDto] })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numero de pagina',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Numero de registros por pagina',
    example: 10,
  })
  getAll(@Query() queryDto: PaginationDto) {
    const query = Object.assign(new PaginationQuery(), queryDto);
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por su ID' })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getById(@Param() params: GetByIdDto) {
    return this.productService.findById(params.id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @ApiResponse({ status: 201, type: ProductResponseDto })
  create(@Body() body: CreateProductDto) {
    const command = Object.assign(new CreateProductCommand(), body);
    return this.productService.create(command);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un producto' })
  @ApiResponse({ status: 200, type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({
    status: 409,
    description: 'El nombre del producto ya existe.',
  })
  update(@Body() body: UpdateProductDto, @Param() params: GetByIdDto) {
    const command = Object.assign(new UpdateProductCommand(), body);
    return this.productService.update(command, params.id);
  }
}
