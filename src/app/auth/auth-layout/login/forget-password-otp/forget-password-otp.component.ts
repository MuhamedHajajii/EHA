import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  NgxOtpInputComponent,
  NgxOtpInputComponentOptions,
} from 'ngx-otp-input';
import { PasswordModule } from 'primeng/password';
import { PrivacySettingsService } from '../../services/privacy-settings.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password-otp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgxOtpInputComponent,
    CommonModule,
    PasswordModule,
    FormsModule,
  ],
  templateUrl: './forget-password-otp.component.html',
  styleUrl: './forget-password-otp.component.scss',
})
export class ForgetPasswordOtpComponent {
  startValidation: boolean = false;
  userEmail!: string;
  isValidOtp: boolean = false;
  otpValue: string = ''; // Holds the OTP value
  otpOptions = {
    length: 6, // Number of OTP input boxes
    allowNumbersOnly: true, // Restrict to numbers only
    hideInputValues: false,
    autoBlur: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _PrivacySettingsService: PrivacySettingsService
  ) {}

  ngOnInit(): void {
    this.getUserEmail();
    if (!this.userEmail) {
      this._Router.navigate(['/login/reset']);
    }
  }

  userPasswordForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    { validators: this.passwordMatchValidators }
  );
  onOtpChange(e: any) {
    this.otpValue = e.join('');
    this.isValidOtp = false;
  }
  /** Submit */
  onSubmitUpdateUserPassword(): void {
    this.startValidation = true;
    if (this.userPasswordForm.valid && this.otpValue.length === 6) {
      let userData = {
        email: this.userEmail,
        password: +(this.userPasswordForm.value.password || 0),
        reset_code: +this.otpValue,
      };
      this._PrivacySettingsService
        .updateUserForgetPassword(userData)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.startValidation = false;
              this._ToastrService.success('Password Changed');
              this._Router.navigate(['/login']);
            } else {
              this.isValidOtp = true;
            }
          },
        });
      console.log(userData);
    }
  }

  /** Custom Validation */
  passwordMatchValidators(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password && rePassword && password !== rePassword
      ? { passwordMismatch: true }
      : null;
  }

  get password() {
    return this.userPasswordForm.get('password');
  }
  get rePassword() {
    return this.userPasswordForm.get('rePassword');
  }

  /** Get User Email from Local Storage */
  getUserEmail(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userEmail = JSON.parse(localStorage.getItem('email') as string);
    }
  }
}
