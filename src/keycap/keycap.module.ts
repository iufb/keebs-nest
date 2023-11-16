import { Module } from '@nestjs/common';
import { KeycapController } from './keycap.controller';
import { KeycapService } from './keycap.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Keycap, KeycapSchema } from './keycap.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keycap.name, schema: KeycapSchema }]),
  ],
  controllers: [KeycapController],
  providers: [KeycapService],
})
export class KeycapModule {}
