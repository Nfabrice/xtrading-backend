import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { LoginDto } from './DTOs/login-dto';
import { LoginService } from './auth-services/login.service';
import { VerifyService } from './auth-services/verify.service';
import { AuthBasicService } from './auth-services/auth-basic.service';
import { SignupService } from './auth-services/signup.service';
import { SignupDto } from './DTOs/signup-dto';
import { AccountDocument } from '@/shared';
@Controller('auth')
export class AuthController {
  /**
   *
   * @param loginService
   */
  constructor(
    private loginService: LoginService,
    private signupService: SignupService,
    private authBasicService: AuthBasicService,
    private verifyService: VerifyService) { }

  /**
   * Login process handler
   * @param loginDto
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.loginService.verifyAssign(loginDto.email, loginDto.password);
  }

  /**
   * signup process handler
   * @param signupDto
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    return this.signupService.createAccount(signupDto);
  }


  /**
   * 1. verifies the token and 
   * 2. returns the data with associated account
   */
  @Get('verify')
  async verify(@Headers('Authorization') token: string): Promise<{ account: AccountDocument }> {
    return {
      account: await this.verifyService.verify(token)
    };
  }

  /**
   * logout  handler
   * @param res
   * @param loginDto
   */
  @Get('logout')
  async logout(
    @Headers('Authorization') token: string,
  ): Promise<any> {
    return this.authBasicService.logout()
  }
}
