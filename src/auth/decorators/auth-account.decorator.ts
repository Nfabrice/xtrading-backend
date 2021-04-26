import { AccountDocument } from '@/shared';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

/**
 *
 * returns authenticated account data
 */
export const AuthAccount = createParamDecorator(
  (data: string, ctx: ExecutionContext): AccountDocument => {
    const response: Response = ctx.switchToHttp().getResponse();
    return response.locals.account as AccountDocument;
  },
);
