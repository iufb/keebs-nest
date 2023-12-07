import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.model';
import { Keyboard, KeyboardSchema } from 'src/keyboard/keyboard.model';
import { Keycap, KeycapSchema } from 'src/keycap/keycap.model';
import { Switches, SwitchesSchema } from 'src/switches/switches.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Keyboard.name, schema: KeyboardSchema },
      { name: Keycap.name, schema: KeycapSchema },
      { name: Switches.name, schema: SwitchesSchema },
    ]),
  ],
  controllers: [CartController],

  providers: [CartService],
})
export class CartModule {}
