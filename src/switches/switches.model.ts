import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SwitchesDocument = Switches & Document;
export enum SwitchesTypeEnum {
  tactile = 'tactile',
  linear = 'linear',
  clicky = 'clicky',
}
export enum SwitchesCompatibilityEnum {
  low = 'low',
  normal = 'normal',
}

@Schema({ _id: false, versionKey: false })
class TravelDistance {
  @Prop()
  preTravel: string;
  @Prop()
  totalTravel: string;
}
@Schema({ _id: false, versionKey: false })
class Force {
  @Prop()
  operationForce: string;
  @Prop()
  endForce: string;
}
@Schema({ _id: false, versionKey: false })
class Materials {
  @Prop()
  stem: string;

  @Prop()
  topHousing: string;
  @Prop()
  bottomHousing: string;
}
@Schema()
export class Switches {
  @Prop()
  name: string;

  @Prop()
  compatibility: SwitchesCompatibilityEnum;

  @Prop()
  price: number;

  @Prop()
  images: string[];

  @Prop()
  count: number;

  @Prop()
  type: SwitchesTypeEnum;

  @Prop()
  travelDistance: TravelDistance;

  @Prop()
  force: Force;

  @Prop()
  mountingPins: number;

  @Prop()
  materials: Materials;

  @Prop()
  spring: string;

  @Prop()
  factoryLubed: boolean;
}

export const SwitchesSchema = SchemaFactory.createForClass(Switches);
