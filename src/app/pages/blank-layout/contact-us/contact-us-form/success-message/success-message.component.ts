import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.scss',
})
export class SuccessMessageComponent {
  userName: string = '';
  constructor(@Inject(PLATFORM_ID) private _PLATFORM_ID: object) {}

  ngOnInit(): void {
    this.getUserName();
  }
  getUserName(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userName = localStorage.getItem('userName') || '';
    }
  }
}
