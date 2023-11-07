import { IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @Min(6)
  @Max(12)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
