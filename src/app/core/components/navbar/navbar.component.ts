import { CommonModule } from '@angular/common';
import { Component, Input, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user-role';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HasPermissionDirective, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNavbarOpen: boolean = false;
  @Input() showBackground: boolean = false;
  @Input() position: string = 'sticky';

  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;

    if (this.isNavbarOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (error) => console.log(error)
    });
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
