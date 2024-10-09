import { Component } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.doLogout();
  }

  reloadPage() {
    window.location.reload();
  }
}
