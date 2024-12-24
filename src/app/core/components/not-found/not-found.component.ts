import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { BlankLayoutComponent } from '../../../pages/blank-layout/blank-layout.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    BlankNavbarComponent,
    BlankLayoutComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
