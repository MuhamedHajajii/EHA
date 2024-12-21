import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { DownloadAppBannerComponent } from './download-app-banner/download-app-banner.component';
import { HeroComponent } from './hero/hero.component';
import { HomeAboutUsComponent } from './home-about-us/home-about-us.component';
import { HomeContactUsComponent } from './home-contact-us/home-contact-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeAboutUsComponent,
    DetailsComponent,
    HeroComponent,
    DownloadAppBannerComponent,
    HomeContactUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
