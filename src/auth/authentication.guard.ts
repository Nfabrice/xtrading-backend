import { AccountModel, JwtService } from '@/shared';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  /**
   *
   * @param reflector
   */
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectModel('Account') private readonly accountModel: AccountModel,
  ) {}
  /**
   *
   * @param context
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** */
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('In Authentication roles= ', roles);
    /**
     *
     */
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    try {
      return this.jwtService
        .verify(req.header('Authorization'))
        .then(jwtData => {
          return this.accountModel.findById(jwtData.id);
        })
        .then(account => {
          res.locals = {
            ...res.locals,
            account: account,
          };
          return true;
        });
    } catch (err) {
      return false;
    }
  }
}
