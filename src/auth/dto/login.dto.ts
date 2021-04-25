import { PartialType } from '@nestjs/mapped-types';
import { SignuDto } from './signup.dto';

export class LoginDto extends PartialType(SignuDto) {}
