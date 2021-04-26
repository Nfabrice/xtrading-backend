import { AccountDocument, AccountModel, JwtService, PasswordService } from '@/shared';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class LoginService {
  /**
   *
   * @param accountModel
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectModel('Account') private readonly accountModel: AccountModel,
  ) {}
  /**
   * When given an email and password, verifies if there is an email of
   * that password that exists in the database
   * @param email
   */
  private userExists(email: string) {
    console.log('email', email);
    return this.accountModel
      .findOne({
        email: email,
      },{
        password: 1
      })
      .then(resp => {
        /**
         * verify email
         */
        if (!resp || resp._id == null)
          throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        return resp;
      });
  }

  /**
   *
   * @param email
   * @param password
   */
  verifyAssign(email: string, password: string): Promise<{ token: string }> {
    let account: AccountDocument;
    return this.userExists(email)
      .then(resp => {
        account = resp;
        /**
         * verify password
         */
        return this.passwordService.verify(resp.password, password);
      })
      .then(() => {
        /**
         * Assign token and return it
         */
        console.log('Reached assign #343', {
          token: this.jwtService.assignToken(account),
        });
        return {
          token: this.jwtService.assignToken(account),
        };
      });
  }
}
