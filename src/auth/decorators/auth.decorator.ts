import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthenticationGuard } from '../authentication.guard';
import { AuthorizationGuard } from '../authorization.guard';

export type AuthRoleType = 'admin' | 'trader' | 'open';


/**
 *
 * @param roles
 */
export function Auth(roles: AuthRoleType[]): any {
  console.log('Roles before metadata = ', roles);

  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
}
