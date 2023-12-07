import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(AccessTokenGuard)
  @Post('/create')
  create(@Body() dto: AddToCartDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.cartService.add(dto, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  getCart(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.cartService.getCart(userId);
  }
}
