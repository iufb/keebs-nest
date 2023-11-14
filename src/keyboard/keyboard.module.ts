import { Module } from '@nestjs/common';
import { KeyboardController } from './keyboard.controller';
import { KeyboardService } from './keyboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Keyboard, KeyboardSchema } from './keyboard.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Keyboard.name, schema: KeyboardSchema },
    ]),
  ],
  controllers: [KeyboardController],
  providers: [KeyboardService],
})
export class KeyboardModule {}
