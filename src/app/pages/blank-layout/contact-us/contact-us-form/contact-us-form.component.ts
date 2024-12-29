import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { ContactUsService } from '../../../../core/services/contact-us/contact-us.service';
@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss',
})
export class ContactUsFormComponent {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  startValidation: boolean = false;
  PhoneNumberFormat = PhoneNumberFormat;

  constructor(
    private _ContactUsService: ContactUsService,
    private _Router: Router,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}

  messagesForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]+$/),
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    this.startValidation = true;
    const USER_DATA = this.messagesForm.value;
    if (this.messagesForm.valid) {
      console.log('Form Submitted:', USER_DATA);
      this._ContactUsService.submitUserContactForm(USER_DATA).subscribe({
        next: (response) => {
          console.log(response);
          this.messagesForm.reset();

          this._Router.navigate(['/contact-us-success']);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.messagesForm.reset();
      this.startValidation = false;
    } else {
      console.log('Form is invalid.');
    }
  }
}
