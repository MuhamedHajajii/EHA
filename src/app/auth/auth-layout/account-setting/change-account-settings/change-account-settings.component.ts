import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../interfaces/ILogedUser';
import { UpdateAccountService } from '../../services/update-account.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-change-account-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxIntlTelInputModule,
    RouterLink,
  ],
  templateUrl: './change-account-settings.component.html',
  styleUrl: './change-account-settings.component.scss',
})
export class ChangeAccountSettingsComponent {
  errorMessage: string = '';
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  startValidation: boolean = false;
  PhoneNumberFormat = PhoneNumberFormat;
  userDetails!: IUser;
  constructor(
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _UpdateAccountService: UpdateAccountService
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let Details = localStorage.getItem('userDetails');
      if (Details) {
        this.userDetails = JSON.parse(Details) as IUser;
        this.setValues();
      }
    }
    this.userForm.get('name');
  }
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl({ value: '', disabled: true }),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    user_id: new FormControl('', [Validators.required]),
    phone: new FormControl({ value: '', disabled: true }),
    user_full_work_address: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmitUpdateUserData(): void {
    this.startValidation = true;

    if (this.userForm.valid) {
      {
        this._UpdateAccountService
          .updateUserAccount(this.userForm.value)
          .subscribe({
            next: (response) => {
              console.log(response);
              if (isPlatformBrowser(this._PLATFORM_ID))
                localStorage.setItem(
                  'userDetails',
                  JSON.stringify(response.user)
                );
              localStorage.setItem(
                'userName',
                JSON.stringify(response.user.name)
              );
              this._ToastrService.success('Account updated successfully');
              this.userForm
                .get('user_full_work_address')
                ?.setValue(response.user.user_full_work_address);

              this.userForm.get('name')?.setValue(response.user.name);
              this.userForm.get('address')?.setValue(response.user.address);
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    }
  }

  setValues(): void {
    this.userForm.get('name')?.setValue(this.userDetails.name);
    this.userForm.get('email')?.setValue(this.userDetails.email);
    this.userForm.get('address')?.setValue(this.userDetails.address);
    this.userForm.get('user_id')?.setValue(this.userDetails.id);
    this.userForm.get('phone')?.setValue(this.userDetails.phone);
    this.userForm
      .get('user_full_work_address')
      ?.setValue(this.userDetails.user_full_work_address);
    console.log(
      this.userDetails.name,
      this.userDetails.email,
      this.userDetails.address,
      this.userDetails.id,
      this.userDetails.user_full_work_address
    );
  }

  isLoggedIn() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (!localStorage.getItem('token')) {
        this._ToastrService.show('you are logged in');
        this._Router.navigate(['/']);
      }
    }
  }
}
