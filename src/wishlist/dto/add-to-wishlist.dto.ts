import { IsOptional, IsString } from 'class-validator';

export class AddToWishlistDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsString()
  productType: string;

  @IsString()
  productId: string;
}
