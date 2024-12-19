import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _LoginService: LoginService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService
  ) {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl('yousrakhaled05@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456789', [Validators.required]),
  });

  loginUser(): void {
    this._LoginService.loginUser(this.userForm.value).subscribe({
      next: (response) => {
        if (isPlatformBrowser(this._PLATFORM_ID)) {
          this._CookieService.set('token', response.access_token);
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userId', response.user.id.toString());
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
