import { MinLength, IsDefined } from 'class-validator';

export class ChangePasswordDto {
  @MinLength(6)
  @IsDefined({ always: true })
  password: string;
}
