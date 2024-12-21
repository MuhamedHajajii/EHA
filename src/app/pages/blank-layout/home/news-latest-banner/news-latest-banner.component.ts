import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';
import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';

@Component({
  selector: 'app-news-latest-banner',
  standalone: true,
  imports: [StringTrimPipe, CommonModule, SlicePipe],
  templateUrl: './news-latest-banner.component.html',
  styleUrl: './news-latest-banner.component.scss',
})
export class NewsLatestBannerComponent implements OnInit {
  allNewsLettersArr!: INewsletterData;

  constructor(private _NewsLetterDataService: NewsLetterDataService) {}

  ngOnInit(): void {
    this.getAllNewsLetters();
  }

  /** Handle get all news letters */
  getAllNewsLetters() {
    this._NewsLetterDataService.getNewsLetterData().subscribe({
      next: (response) => {
        console.log(response);
        this.allNewsLettersArr = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
