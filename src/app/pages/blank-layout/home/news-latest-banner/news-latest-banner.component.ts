import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { StringTrimPipe } from '../../../../core/pipes/string-trim.pipe';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';
import { INewsletterData } from '../../../../core/interfaces/news-letters/INewsLetterData';

@Component({
  selector: 'app-news-latest-banner',
  standalone: true,
  imports: [CarouselModule, StringTrimPipe, CommonModule],
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 15,
    autoplay: true,
    autoplayHoverPause: true,
    nav: false,
    autoplaySpeed: 1000,
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
      940: {
        items: 4,
      },
    },
  };
}
