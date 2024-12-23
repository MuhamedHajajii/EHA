import { Component } from '@angular/core';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { ContactUsFormUiComponent } from './contact-us-form-ui/contact-us-form-ui.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ContactUsFormComponent, ContactUsFormUiComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
