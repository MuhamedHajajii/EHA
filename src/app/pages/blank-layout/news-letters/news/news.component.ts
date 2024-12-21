import { Component } from '@angular/core';
import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';
import { CommonModule, SlicePipe } from '@angular/common';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';
import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [StringTrimPipe, CommonModule, SlicePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
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
