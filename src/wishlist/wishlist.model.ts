import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema()
class WishlistItem {
  @Prop()
  productType: string;
  @Prop()
  id: string;
}

@Schema()
export class Wishlist {
  @Prop({ unique: true })
  userId: string;

  @Prop()
  products: WishlistItem[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
