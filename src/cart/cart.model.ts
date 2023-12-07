import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductType } from 'src/utils/types';

export type CartDocument = Cart & Document;
@Schema({ versionKey: false, _id: false })
class Extra {
  @Prop()
  color: string;
  @Prop()
  switches: string;
}
@Schema()
export class Cart {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  productType: ProductType;

  @Prop({ required: true })
  productId: string;

  @Prop()
  extra: Extra;

  @Prop({ required: true })
  quantity: number;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
