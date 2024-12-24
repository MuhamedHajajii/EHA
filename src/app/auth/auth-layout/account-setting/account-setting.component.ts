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
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { IUser } from '../interfaces.ts/ILogedUser';
@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxIntlTelInputModule],
  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.scss',
})
export class AccountSettingComponent {
  errorMessage: string = '';
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  startValidation: boolean = false;
  PhoneNumberFormat = PhoneNumberFormat;
  userDetails!: IUser;
  constructor(
    private _LoginService: LoginService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  userForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    user_full_work_address: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let Details = localStorage.getItem('userDetails');
      if (Details) {
        console.log(JSON.parse(Details));
        this.userDetails = JSON.parse(Details) as IUser;
      }
    }
    this.userForm.get('name');
  }

  updateUser(): void {
    this.userForm.value;
  }

  // loginUser(): void {
  //   this._LoginService.loginUser(this.userForm.value).subscribe({
  //     next: (response) => {
  //       if (isPlatformBrowser(this._PLATFORM_ID)) {
  //         console.log(response, 'from Error Outer');
  //         if (response.user) {
  //           console.log(response, 'from Error Success');
  //           this.errorMessage = '';
  //           this._CookieService.set('token', response.access_token);
  //           // localStorage.setItem('userName', response.user.name);
  //           this._ToastrService.success('Login Successfully');
  //           localStorage.setItem('userId', response.user.id.toString());
  //           this._Router.navigate(['/']);
  //         } else {
  //           console.log(response, 'from Error Message');
  //           this.userForm.setErrors({ invalidLogin: true });
  //           console.log(this.userForm.valid);
  //           this.errorMessage = 'Invalid email or password';
  //         }
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
  isLoggedIn() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (!this._CookieService.check('token')) {
        this._ToastrService.show('you are logged in');
        this._Router.navigate(['/']);
      }
    }
  }
}
