import { Module } from '@nestjs/common';
import { SwitchesController } from './switches.controller';
import { SwitchesService } from './switches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Switches, SwitchesSchema } from './switches.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Switches.name, schema: SwitchesSchema },
    ]),
  ],
  controllers: [SwitchesController],
  providers: [SwitchesService],
})
export class SwitchesModule {}
