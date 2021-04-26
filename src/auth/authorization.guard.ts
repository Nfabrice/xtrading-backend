import { AccountDocument } from '@/shared';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { AuthRoleType } from './decorators/auth.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  /**
   *
   * @param reflector
   */
  constructor(private reflector: Reflector) {}
  /**
   *
   * @param context
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**
     * Accepted roles
     */
    const roles: Array<AuthRoleType> = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    ) as AuthRoleType[];
    /**
     *
     */
    console.log('In AuthorizationGuard roles= ', roles);
    const res: Response = context.switchToHttp().getResponse();
    const account: AccountDocument = res.locals.account;
    /**
     * Check role
     * and then if isActive
     * @return true otherwise false
     */
    if (
      this.roleIsOkay(roles, account) 
      // account.isActive
    ) {
      return true;
    }
    return false;
  }
  /**
   *
   * @param roles
   * @param account
   */
  roleIsOkay(roles: Array<string>, account: AccountDocument): boolean {
    if (roles.includes(account.role)) return true;
    throw new HttpException(
      'Wrong resource for your role!',
      HttpStatus.FORBIDDEN,
    );
  }

  /**
   *
   * @param dpts
   * @param account
   */
  // dptIsOkay(dpts: Array<string>, account: AccountDocument): boolean {
  //   if (
  //     SetUtil.intersection(new Set(dpts), new Set(account.departments)).length >
  //     0
  //   )
  //     return true;
  //   throw new HttpException(
  //     'Wrong resource for your departments!',
  //     HttpStatus.FORBIDDEN,
  //   );
  // }
}

export class SetUtil {
  /**
   *
   * @param seta
   * @param setb
   */
  static intersection(seta: Set<any>, setb: Set<any>): Array<any> {
    const ints = [];
    for (const elem of setb) {
      if (seta.has(elem)) ints.push(elem);
    }
    return ints;
  }
}
