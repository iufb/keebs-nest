import { IsOptional, IsString } from 'class-validator';

export class AddToWishlistDto {
  @IsString()
  productType: string;

  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
