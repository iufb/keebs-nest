import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './cart.model';
import { Model, Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Keyboard, KeyboardDocument } from 'src/keyboard/keyboard.model';
import { Keycap, KeycapDocument } from 'src/keycap/keycap.model';
import { Switches, SwitchesDocument } from 'src/switches/switches.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,

    @InjectModel(Keyboard.name)
    private readonly keyboardModel: Model<KeyboardDocument>,

    @InjectModel(Keycap.name)
    private readonly keycapModel: Model<KeycapDocument>,

    @InjectModel(Switches.name)
    private readonly switchesModel: Model<SwitchesDocument>,
  ) {}
  async add(
    { productId, productType, color, switches }: AddToCartDto,
    userId: string,
  ) {
    const existedProduct = await this.findProduct(
      userId,
      productId,
      color,
      switches,
    );
    console.log(color, switches);
    if (!existedProduct) {
      const cartItem = new this.cartModel({
        userId,
        productId,
        productType,
        extra: {
          color,
          switches,
        },
        quantity: 1,
      });
      return cartItem.save();
    }
    return await this.updateQuantity(existedProduct.id, 'increase');
  }
  async findProduct(
    userId: string,
    productId: string,
    color?: string,
    switches?: string,
  ) {
    const product = await this.cartModel.findOne({
      userId,
      productId,
      'extra.color': color,
      'extra.switches': switches,
    });
    return product;
  }
  async updateQuantity(id: string, action: 'increase' | 'decrease') {
    return this.cartModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          quantity: action == 'increase' ? 1 : -1,
        },
      },
    );
  }
  async getCart(userId: string) {
    const cartItems = await this.cartModel.find({ userId });
    const productModel: Record<
      string,
      Model<KeycapDocument | KeyboardDocument | SwitchesDocument>
    > = {
      keyboard: this.keyboardModel,
      keycap: this.keycapModel,
      switches: this.switchesModel,
    };
    const products = await Promise.all(
      cartItems.map(async (product) => {
        const productDetails = await productModel[product.productType].findOne({
          _id: new Types.ObjectId(product.productId),
        });
        return {
          id: product._id,
          productId: productDetails._id,
          name: productDetails.name,
          price: productDetails.price,
          extra: product.extra,
          quantity: product.quantity,
          img:
            typeof productDetails.images[0] == 'object'
              ? productDetails.images[0].image
              : productDetails.images[0],
        };
      }),
    );
    return products;
  }
}
