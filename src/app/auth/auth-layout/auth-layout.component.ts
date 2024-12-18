import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { AuthNavbarComponent } from '../../core/components/auth-navbar/auth-navbar.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    LoginComponent,
    FooterComponent,
    FooterComponent,
    AuthNavbarComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
