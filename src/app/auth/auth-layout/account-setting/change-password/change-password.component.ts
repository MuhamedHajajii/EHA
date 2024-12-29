import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { PrivacySettingsService } from '../../services/privacy-settings.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  startValidation: boolean = false;
  isSuccess: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _PrivacySettingsService: PrivacySettingsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  getUserId(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
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

  onSubmitUpdateUserPassword(): void {
    this.startValidation = true;
    console.log(this.userPasswordForm);
    if (this.userPasswordForm.valid) {
      let userData = {
        user_id: this.getUserId() || '',
        password: this.userPasswordForm.value.password || '',
      };
      this._PrivacySettingsService.changePassword(userData).subscribe({
        next: (response) => {
          this.startValidation = false;
          console.log(response);
          this.isSuccess = true;
          this._ToastrService.success('Password Changed Successfully');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  passwordMatchValidators(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    console.log(password && rePassword && password !== rePassword);
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
}
