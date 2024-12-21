import { Component } from '@angular/core';
import { NewsLatestBannerComponent } from '../home/news-latest-banner/news-latest-banner.component';

@Component({
  selector: 'app-news-letters',
  standalone: true,
  imports: [NewsLatestBannerComponent],
  templateUrl: './news-letters.component.html',
  styleUrl: './news-letters.component.scss',
})
export class NewsLettersComponent {}
