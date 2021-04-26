import { AccountModel, JwtService } from '@/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VerifyService {
  /**
   *
   * @param jwtService
   */
  constructor(
    private jwtService: JwtService,
    @InjectModel('Account') private readonly accountModel: AccountModel,
  ) {}
  /**
   * Gets a token verifies and returns the associated account if not paused
   * @param token
   */
  verify(token: string) {
    return this.jwtService
      .verify(token)
      .then(data => {
        console.log('Token data', data);
        return this.accountModel.findOne({
          _id: data.id,
          isActive: true,
        });
      })
      .then(resp => {
        if (!resp || !resp._id)
          throw new HttpException(
            'Not active account of the token was found!',
            HttpStatus.NOT_FOUND,
          );
        return resp;
      });
  }
}
