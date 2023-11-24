import { Type } from 'class-transformer';
import { IsArray, IsString, IsOptional } from 'class-validator';

class Filter {
  @IsString()
  filterSlug: string;
  @IsString()
  value: string;
}
export class FilterKeyboardDto {
  @IsArray()
  @Type(() => Filter)
  filters: Filter[];

  @IsOptional()
  sort?: 'asc' | 'desc';
}
