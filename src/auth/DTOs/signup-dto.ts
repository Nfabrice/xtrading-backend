import { IsString, IsEmail, Min, MinLength, isNotEmpty, IsNotEmpty, IsDefined } from 'class-validator';
export class SignupDto {
  @MinLength(4)
  @IsString()
  @IsDefined()
  names: string;

  @MinLength(4)
  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;


  @IsDefined()
  @MinLength(4)
  @IsString({})
  password: string;


  @IsString({})
  market_name: String;

  @IsString({})
  value: String;

  @IsString({})
  value_share: String;
}
