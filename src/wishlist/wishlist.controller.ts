import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  addProductToWishlist(
    @Body() dto: Pick<AddToWishlistDto, 'productId' | 'productType'>,
    @Req() req: Request,
  ) {
    const userId = req.user['sub'];
    const wishlistDto: AddToWishlistDto = { ...dto, userId };
    return this.wishlistService.addItemToWishlist(wishlistDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  getWishlistProducts(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.wishlistService.getWishlist(userId);
  }

  @UsePipes(IdValidationPipe)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteProductFromWishlist(@Req() req: Request, @Param('id') id: string) {
    const userId = req.user['sub'];
    return this.wishlistService.removeProductFromWishlist(userId, id);
  }
}
