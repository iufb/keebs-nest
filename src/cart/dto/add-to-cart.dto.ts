import { IsIn, IsOptional, IsString } from 'class-validator';
import { productTypes } from 'src/utils/constants';
import { ProductType } from 'src/utils/types';

export class AddToCartDto {
  @IsIn(productTypes)
  @IsString()
  productType: ProductType;

  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  switches?: string;
}
