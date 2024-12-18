import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss',
})
export class ContactUsFormComponent {
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  startValidation: boolean = false;
  PhoneNumberFormat = PhoneNumberFormat;

  messagesForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required]),
    userPhone: new FormControl('', [Validators.required]),
    userMessage: new FormControl('', [Validators.required]),
  });
}
