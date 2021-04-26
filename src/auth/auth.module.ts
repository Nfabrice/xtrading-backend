import { Module } from '@nestjs/common';
import { LoginDto } from './DTOs/login-dto';
import { AuthAccountUtil, AuthBasicService } from './auth-services/auth-basic.service';
import { LoginService } from './auth-services/login.service';
import { VerifyService } from './auth-services/verify.service';
import { AuthController } from './auth.controller';
import { DatabaseModule, GlobalModule } from '@/shared';
import { AuthenticationGuard } from './authentication.guard';
import { AuthorizationGuard } from './authorization.guard';
import { SignupService } from './auth-services/signup.service';

@Module({
  imports: [DatabaseModule, GlobalModule],
  controllers: [AuthController],
  providers: [
    LoginDto,
    VerifyService,
    LoginService,
    SignupService,
    AuthorizationGuard,
    AuthenticationGuard,
    AuthBasicService,
    AuthAccountUtil
  ],
  exports: [
    AuthAccountUtil
  ],
})
export class AuthModule { }
