import {
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  KeyboardProfileEnum,
  KeyboardSeriesEnum,
  KeyboardConnectivityEnum,
  KeyboardSizeEnum,
  KeyboardFeaturesType,
} from '../keyboard.model';
import { keyboardFeatures } from '../keyboard.constant';
class KeyboardBattery {
  @IsNumber()
  capacity: number;

  @IsNumber()
  workingTimeLightsOn: number;
  @IsNumber()
  workingTimeLightsOff: number;
}
class KeyboardMaterials {
  frame: string;
  bottomCase: string;
  keycap: string;
}
class KeyboardImages {
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  color?: string;
}
class Color {
  @IsString()
  name: string;
  @IsString()
  hex: string;
}
export class AddKeyboardDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  colors?: Color[];

  @IsNumber()
  price: number;

  battery: KeyboardBattery;

  @IsArray()
  images: KeyboardImages[];

  materials: KeyboardMaterials;

  @IsEnum(KeyboardProfileEnum)
  profile: KeyboardProfileEnum;

  @IsEnum(KeyboardSeriesEnum)
  series: KeyboardSeriesEnum;

  @IsEnum(KeyboardConnectivityEnum)
  connectivity: KeyboardConnectivityEnum;

  @IsEnum(KeyboardSizeEnum)
  size: KeyboardSizeEnum;

  @IsArray()
  @IsIn(keyboardFeatures, { each: true })
  features: KeyboardFeaturesType[];
}
