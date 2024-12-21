import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-news-letters',
  standalone: true,
  imports: [NewsComponent],
  templateUrl: './news-letters.component.html',
  styleUrl: './news-letters.component.scss',
})
export class NewsLettersComponent {}
