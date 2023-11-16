import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KeycapDocument = Keycap & Document;
export enum KeycapCompatibilityEnum {
  low = 'low',
  normal = 'normal',
}
export enum KeycapTypeEnum {
  set = 'set',
  spacebar = 'spacebar',
}
export enum KeycapMaterialEnum {
  double_shot = 'Double-shot PBT',
  dye_sub = 'Dye-sub PBT',
  PC = 'PC(Shine-Through)',
}

export enum KeycapProfileEnum {
  cherry = 'Cherry',
  kda = 'KDA',
  kds = 'KDS',
  kop = 'KOP',
  nsa = 'nSA (Low-Profile)',
}
@Schema()
export class Keycap {
  @Prop()
  name: string;
  @Prop()
  images: string[];

  @Prop()
  price: number;
  @Prop()
  compatibility: KeycapCompatibilityEnum;

  @Prop()
  type: KeycapTypeEnum;

  @Prop()
  material: KeycapMaterialEnum;

  @Prop()
  profile: KeycapProfileEnum;
}
export const KeycapSchema = SchemaFactory.createForClass(Keycap);
