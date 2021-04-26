import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  // https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */
  private genRandomString(length: number) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') /** convert to hexadecimal format */
      .slice(0, length); /** return required number of characters */
  }

  /**
   * var crypto  = require('crypto');
var salt = crypto.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
const hasher = crypto.createHmac('sha512', salt); 
hasher.update(password);
const hash = hasher.digest('hex');

   * hash password with sha512.
   * @
   * @param {string} password - List of required fields.
   * @param {string} salt - Data to be validated.
   */
  private sha512(password: string, salt: string) {
    const hasher = crypto.createHmac(
      'sha512',
      salt,
    ); /** Hashing algorithm sha512 */
    hasher.update(password);
    const hash = hasher.digest('hex');
    return {
      salt: salt,
      hash: hash,
    };
  }

  /**
   * takes a string passsword and encrypts it and returns salt and hash
   * @param password
   */
  encrypt(password: string): { hash: string; salt: string } {
    const salt = this.genRandomString(16);
    return this.sha512(password, salt);
  }

  /**
   * When given og password and another to test against, it handles the process
   * @param passsword
   * @param password
   */
  verify(
    accountPassword: { hash: string; salt: string },
    password: string,
  ): boolean {
    const hasher = crypto.createHmac('sha512', accountPassword.salt);
    const newHash = hasher.update(password).digest('hex');
    if (newHash === accountPassword.hash) {
      return true;
    } else {
      throw new HttpException('Wrong password provided', HttpStatus.FORBIDDEN);
    }
  }
}
