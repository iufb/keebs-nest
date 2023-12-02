import { IsIn, IsString } from 'class-validator';
import { productTypes } from 'src/utils/constants';
import { ProductType } from 'src/utils/types';
export class AddToWishlistDto {
  @IsIn(productTypes)
  @IsString()
  productType: ProductType;

  @IsString()
  productId: string;
}
