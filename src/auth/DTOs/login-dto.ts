import { IsString, IsEmail, Min, MinLength, isNotEmpty, IsNotEmpty, IsDefined } from 'class-validator';
export class LoginDto {
  @MinLength(4)
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;

  
  @IsDefined()
  @MinLength(4)
  @IsString({})
  password;
}
