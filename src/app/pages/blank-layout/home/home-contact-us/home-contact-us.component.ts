import { Component } from '@angular/core';
import { CountUpModule } from 'ngx-countup';
import { ContactUsFormComponent } from '../../contact-us/contact-us-form/contact-us-form.component';
import { ContactUsFormUiComponent } from '../../contact-us/contact-us-form-ui/contact-us-form-ui.component';
@Component({
  selector: 'app-home-contact-us',
  standalone: true,
  imports: [CountUpModule, ContactUsFormComponent, ContactUsFormUiComponent],
  templateUrl: './home-contact-us.component.html',
  styleUrl: './home-contact-us.component.scss',
})
export class HomeContactUsComponent {}
