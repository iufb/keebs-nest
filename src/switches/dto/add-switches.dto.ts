import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SwitchesTypeEnum, SwitchesCompatibilityEnum } from '../switches.model';

class TravelDistance {
  @IsString()
  preTravel: string;
  @IsString()
  totalTravel: string;
}
class Force {
  @IsString()
  operationForce: string;
  @IsString()
  endForce: string;
}
class Materials {
  @IsString()
  stem: string;

  @IsString()
  topHousing: string;
  @IsString()
  bottomHousing: string;
}
export class AddSwitchesDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(SwitchesCompatibilityEnum)
  compatibility: SwitchesCompatibilityEnum;

  @IsString({ each: true })
  @IsArray()
  images: string[];

  @IsNumber()
  count: number;

  @IsEnum(SwitchesTypeEnum)
  type: SwitchesTypeEnum;

  travelDistance: TravelDistance;

  force: Force;

  @IsNumber()
  mountingPins: number;

  materials: Materials;

  @IsString()
  @IsOptional()
  spring?: string;

  @IsBoolean()
  factoryLubed: boolean;
}
