import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KeyboardDocument = Keyboard & Document;
export enum KeyboardProfileEnum {
  low = 'low',
  normal = 'normal',
}
export enum KeyboardSeriesEnum {
  air = 'air',
  halo = 'halo',
  field = 'field',
}
export enum KeyboardConnectivityEnum {
  wired = 'wired',
  tri_mode = 'tri-mode',
}
export enum KeyboardSizeEnum {
  'sixty' = 60,
  'sixtyFive' = 65,
  'seventyFive' = 75,
  'nintySix' = 96,
}

export type KeyboardFeaturesType = '2.4G 1000Hz' | 'hot-swap' | 'knob';

@Schema()
class KeyboardBatteryType {
  @Prop()
  capacity: number;
  @Prop()
  workingTimeLightsOn: number;
  @Prop()
  workingTimeLightsOff: number;
}

@Schema()
class KeyboardImagesType {
  @Prop()
  image: string;
  @Prop()
  color?: string;
}

@Schema()
class KeyboardMaterialsType {
  @Prop()
  frame: string;
  @Prop()
  bottomCase: string;
  @Prop()
  keycap: string;
}

@Schema()
export class Keyboard {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  colors?: string[];
  @Prop()
  price: number;
  @Prop()
  battery: KeyboardBatteryType;
  @Prop()
  images: KeyboardImagesType[];
  @Prop()
  materials: KeyboardMaterialsType;
  @Prop()
  profile: KeyboardProfileEnum;
  @Prop()
  series: KeyboardSeriesEnum;
  @Prop()
  connectivity: KeyboardConnectivityEnum;
  @Prop()
  size: KeyboardSizeEnum;
  @Prop()
  features: string[];
}

export const KeyboardSchema = SchemaFactory.createForClass(Keyboard);
