import { AccountDocument, AccountModel, JwtService, PasswordService } from '@/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from '../DTOs/signup-dto';


@Injectable()
export class SignupService {
  /**
   *
   * @param accountModel
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectModel('Account') private readonly accountModel: AccountModel,
  ) { }


  /**
   * Creates an account
   * @param account
   */
   createAccount(account: SignupDto): Promise<AccountDocument> {
    return new this.accountModel({
      ...account,
      password: this.passwordService.encrypt(account.password),
    })
      .save()
      .then(resp => {
        resp.password = undefined;
        return resp;
      });
  }

}
