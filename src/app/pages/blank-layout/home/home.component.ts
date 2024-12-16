import { Component } from '@angular/core';
import { AboutUsOneComponent } from './about-us-one/about-us-one.component';
import { AboutUsTwoComponent } from './about-us-two/about-us-two.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { DetailsComponent } from './details/details.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { HeroComponent } from './hero/hero.component';
import { NewsLatestBannerComponent } from './news-latest-banner/news-latest-banner.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { OurPortfolioComponent } from './our-portfolio/our-portfolio.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { OurStepsComponent } from './our-steps/our-steps.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { OurBlogComponent } from './our-blog/our-blog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutUsOneComponent,
    AboutUsTwoComponent,
    ApplyFormComponent,
    DetailsComponent,
    FacilitiesComponent,
    HeroComponent,
    NewsLatestBannerComponent,
    OurClientsComponent,
    OurPortfolioComponent,
    OurServicesComponent,
    OurStepsComponent,
    OurTeamComponent,
    OurBlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
