import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HasPermissionDirective, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNavbarOpen: boolean = false;
  isUserLoggedIn: boolean = false;
  @Input() showBackground: boolean = false;
  @Input() position: string = 'sticky';

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

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
        this.checkUserLoggedIn();

        window.location.reload();
      },
      error: (error) => console.log(error)
    });
  }

  checkUserLoggedIn(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }
}
