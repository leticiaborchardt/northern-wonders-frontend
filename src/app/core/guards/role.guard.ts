import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user-role';

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const expectedRoles = childRoute.data['roles'] as Array<UserRole>;

  if (!expectedRoles || expectedRoles.includes(inject(AuthService).getUserRole() as UserRole)) {
    return true;
  }

  inject(Router).navigate(['/unauthorized']);
  return false;
};
