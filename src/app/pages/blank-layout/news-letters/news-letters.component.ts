import { Component } from '@angular/core';
import { NewsLettersBannerComponent } from './news-letters-banner/news-letters-banner.component';

@Component({
  selector: 'app-news-letters',
  standalone: true,
  imports: [NewsLettersBannerComponent],
  templateUrl: './news-letters.component.html',
  styleUrl: './news-letters.component.scss',
})
export class NewsLettersComponent {}
