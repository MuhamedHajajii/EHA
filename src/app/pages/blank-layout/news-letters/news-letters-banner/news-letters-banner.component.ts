import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';
import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';

@Component({
  selector: 'app-news-letters-banner',
  standalone: true,
  imports: [],
  templateUrl: './news-letters-banner.component.html',
  styleUrl: './news-letters-banner.component.scss',
})
export class NewsLettersBannerComponent {}
