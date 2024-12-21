import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';
import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, SlicePipe, StringTrimPipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  @Input() ImageSrc = '';
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
