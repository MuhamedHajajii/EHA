import { Component } from '@angular/core';
import { BlankNavbarComponent } from '../../core/components/blank-navbar/blank-navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [BlankNavbarComponent, HomeComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {}
