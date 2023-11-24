import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { KeyboardService } from 'src/keyboard/keyboard.service';
import { KeycapService } from 'src/keycap/keycap.service';
import { SwitchesService } from 'src/switches/switches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Keyboard, KeyboardSchema } from 'src/keyboard/keyboard.model';
import { Keycap, KeycapSchema } from 'src/keycap/keycap.model';
import { Switches, SwitchesSchema } from 'src/switches/switches.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keyboard.name, schema: KeyboardSchema },
      { name: Keycap.name, schema: KeycapSchema },
      { name: Switches.name, schema: SwitchesSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, KeyboardService, KeycapService, SwitchesService],
})
export class ProductModule {}
