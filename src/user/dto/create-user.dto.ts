import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
