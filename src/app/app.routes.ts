import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/components/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { UnauthorizedComponent } from './core/pages/errors/unauthorized/unauthorized.component';
import { LayoutComponent } from './core/components/layouts/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './features/pages/home/home.component';
import { NotFoundComponent } from './core/pages/errors/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard, roleGuard],
    children: [
      // Rotas protegidas
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];