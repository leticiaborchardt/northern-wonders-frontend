import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNavbarOpen:boolean = false;

  constructor(private authService: AuthService, private renderer: Renderer2) {}

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
        this.authService.removeAuthToken();
      },
      error: (error) => console.log(error)      
    });
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
