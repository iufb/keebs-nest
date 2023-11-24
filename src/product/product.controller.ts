import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  getFilteredProducts(
    @Body()
    filters: {
      type: 'keyboard' | 'keycap' | 'switches';
      category: string;
      search: string;
    },
  ) {
    return this.productService.getFilteredProducts(filters);
  }
}
