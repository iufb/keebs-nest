import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './wishlist.model';
import { Keyboard, KeyboardSchema } from 'src/keyboard/keyboard.model';
import { Keycap, KeycapSchema } from 'src/keycap/keycap.model';
import { Switches, SwitchesSchema } from 'src/switches/switches.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WishlistSchema },
      { name: Keyboard.name, schema: KeyboardSchema },
      { name: Keycap.name, schema: KeycapSchema },
      { name: Switches.name, schema: SwitchesSchema },
    ]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
