import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  KeycapProfileEnum,
  KeycapMaterialEnum,
  KeycapTypeEnum,
  KeycapCompatibilityEnum,
} from '../keycap.model';

export class AddKeycapDto {
  @IsString()
  name: string;
  @IsArray()
  @IsString({ each: true })
  images: string[];
  @IsNumber()
  price: number;
  @IsEnum(KeycapCompatibilityEnum)
  compatibility: string;

  @IsEnum(KeycapTypeEnum)
  type: string;

  @IsEnum(KeycapMaterialEnum)
  material: string;

  @IsEnum(KeycapProfileEnum)
  profile: string;
}
