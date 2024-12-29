import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrivacySettingsService } from '../../services/privacy-settings.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './email-forget-password.component.html',
  styleUrl: './email-forget-password.component.scss',
})
export class EmailForgetPasswordComponent {
  startValidation: boolean = false;
  isValidEmail: boolean = false;
  constructor(
    private _PrivacySettingsService: PrivacySettingsService,
    private _Router: Router,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSendOtpClick(): void {
    this.startValidation = true;
    if (this.userForm.valid) {
      this._PrivacySettingsService
        .resetUserCode(this.userForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response.success) {
              if (isPlatformBrowser(this._PLATFORM_ID))
                localStorage.setItem(
                  'email',
                  JSON.stringify(this.userForm.value.email)
                );
              this._Router.navigate(['/login/otp']);
            } else {
              this.isValidEmail = true;
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  get email() {
    return this.userForm.get('email');
  }
}
