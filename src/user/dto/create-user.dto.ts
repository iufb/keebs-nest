import { IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Min(6)
  @Max(12)
  password: string;
}
