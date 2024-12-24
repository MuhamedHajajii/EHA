import { Component } from '@angular/core';
import { NewsComponent } from '../../news-letters/news/news.component';

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [NewsComponent],
  templateUrl: './home-news.component.html',
  styleUrl: './home-news.component.scss',
})
export class HomeNewsComponent {}
