import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string = '';
  constructor(
    private _LoginService: LoginService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.isLoggedIn();
  }

  loginUser(): void {
    this._LoginService.loginUser(this.userForm.value).subscribe({
      next: (response) => {
        if (isPlatformBrowser(this._PLATFORM_ID)) {
          console.log(response, 'from Error Outer');
          if (!response.error) {
            console.log(response, 'from Error Success');
            this.errorMessage = '';
            this._CookieService.set('token', response.access_token);
            localStorage.setItem('userName', response.user.name);
            localStorage.setItem('userDetails', JSON.stringify(response.user));
            this._ToastrService.success('Login Successfully');
            localStorage.setItem('userId', response.user.id.toString());
            this._Router.navigate(['/']);
          } else {
            console.log(response, 'from Error Message');
            this.userForm.setErrors({ invalidLogin: true });
            console.log(this.userForm.valid);
            this.errorMessage = 'Invalid email or password';
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.userForm.reset();
  }

  isLoggedIn() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (this._CookieService.check('token')) {
        this._ToastrService.show('you are logged in');
        this._Router.navigate(['/']);
      }
    }
  }
}
