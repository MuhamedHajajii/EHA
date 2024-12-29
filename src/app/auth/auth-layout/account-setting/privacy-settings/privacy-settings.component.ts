import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeAccountSettingsComponent } from '../change-account-settings/change-account-settings.component';

@Component({
  selector: 'app-privacy-settings',
  standalone: true,
  imports: [ChangePasswordComponent, ChangeAccountSettingsComponent],
  templateUrl: './privacy-settings.component.html',
  styleUrl: './privacy-settings.component.scss',
})
export class PrivacySettingsComponent {}
