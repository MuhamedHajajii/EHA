import { CommonModule, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';
import { RouterLink } from '@angular/router';
import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    StringTrimPipe,
    SlicePipe,
    CarouselModule,
    RouterLink,
  ],
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 30,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };
}
