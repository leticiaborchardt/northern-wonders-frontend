import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }

  inject(Router).navigate(['/login'], { queryParams: { stateUrl: state.url }});
  return false;
};
