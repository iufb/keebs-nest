import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishlistDocument, Wishlist } from './wishlist.model';
import { Model, Types } from 'mongoose';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
import { Keyboard, KeyboardDocument } from 'src/keyboard/keyboard.model';
import { Keycap, KeycapDocument } from 'src/keycap/keycap.model';
import { Switches, SwitchesDocument } from 'src/switches/switches.model';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private readonly wishlistModel: Model<WishlistDocument>,

    @InjectModel(Keyboard.name)
    private readonly keyboardModel: Model<KeyboardDocument>,

    @InjectModel(Keycap.name)
    private readonly keycapModel: Model<KeycapDocument>,

    @InjectModel(Switches.name)
    private readonly switchesModel: Model<SwitchesDocument>,
  ) {}
  create(dto: AddToWishlistDto) {
    const product = {
      id: dto.productId,
      productType: dto.productType,
    };
    const wishlistItem = new this.wishlistModel({
      userId: dto.userId,
      products: [product],
    });
    return wishlistItem.save();
  }
  async isExist(id: string) {
    const wishlist = await this.find(id);
    return { wishlist, isExist: !!wishlist };
  }
  find(userId: string) {
    return this.wishlistModel.findOne({ userId }).exec();
  }
  async addItemToWishlist(dto: AddToWishlistDto) {
    const isExist = await this.isExist(dto.userId);

    if (!isExist.isExist) {
      this.create(dto);
      return;
    }
    const isIn =
      isExist.wishlist.products.findIndex(
        (product) => product.id == dto.productId,
      ) !== -1;
    if (isIn) {
      throw new ConflictException(' This product already added in wishlist ');
    }
    return await this.wishlistModel
      .findByIdAndUpdate(
        isExist.wishlist._id,
        {
          $push: {
            products: {
              id: dto.productId,
              productType: dto.productType,
            },
          },
        },
        { new: true },
      )
      .exec();
  }
  async getWishlist(userId: string) {
    const productType: Record<
      string,
      Model<KeycapDocument | KeyboardDocument | SwitchesDocument>
    > = {
      keyboard: this.keyboardModel,
      keycap: this.keycapModel,
      switches: this.switchesModel,
    };
    const wishlist = await this.find(userId);
    const wishlistItems = await Promise.all(
      wishlist.products.map(async (product) => {
        const productDetails = await productType[product.productType].findOne({
          _id: new Types.ObjectId(product.id),
        });
        return {
          id: productDetails._id,
          name: productDetails.name,
          price: productDetails.price,
          img:
            typeof productDetails.images[0] == 'object'
              ? productDetails.images[0].image
              : productDetails.images[0],
        };
      }),
    );
    return wishlistItems;
  }
  async removeProductFromWishlist(userId: string, productId: string) {
    const wishlist = await this.find(userId);
    const product = wishlist.products.find(
      (product) => product.id == productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return this.wishlistModel
      .findOneAndUpdate(
        wishlist._id,
        {
          $pull: {
            products: product,
          },
        },
        { new: true },
      )
      .exec();
  }
}