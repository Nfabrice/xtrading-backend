import { Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './DTOs/change-password-dto';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from "mongodb";
import { AccountModel, PasswordService } from '@/shared';

@Injectable()
export class AccountAuthService {
  /**
   *
   * @param account
   */
  constructor(
    @InjectModel('Account') private accountModel: AccountModel,
    private passwordService: PasswordService,
  ) { }
  /**
   * Changes account's password
   * @param passwordForm
   * @param account
   */
  password(
    passwordForm: ChangePasswordDto,
    account: string | ObjectID,
  ): Promise<{ message: string }> {
    return this.accountModel
      .findOneAndUpdate(
        {
          _id: account,
        },
        {
          $set: { password: this.passwordService.encrypt(passwordForm.password), },
        },
        {
          new: true,
        },
      )
      .then(() => {
        return {
          message: 'Password changed successfully!',
        };
      });
  }
}
