import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AccountDocument } from '../database/schemas/account.schema';

interface JwtData {
  id: string;
  role: string;
  date: Date;
}
interface JwtVerifyData extends JwtData {
  iat: Date;
  exp: Date;
}
@Injectable()
export class JwtService {
  /**
   *
   * Receives a user and generates a JWT for him/her
   * @param account
   */
  assignToken(account: AccountDocument): string {
    return jwt.sign(
      {
        id: account._id,
        role: account.role,
        date: new Date(),
      } as JwtVerifyData,
      process.env.JWT_SECRET,
      { expiresIn: '30d' }, // Expires in 30 days
    );
  }

  /**
   * Receives the token and verifies if it was provided by CoCo
   * @param token
   */
  verify(token?: string): Promise<JwtData> {
    if (!token) {
      throw new HttpException("Provide a JWT for verification", HttpStatus.FORBIDDEN);
    }
    try {
      return Promise.resolve(
        jwt.verify(token, process.env.JWT_SECRET) as JwtData,
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
