import { Component } from '@angular/core';
import { NewsLetterDataService } from '../../../../core/services/home/news-letter-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-present-news',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './present-news.component.html',
  styleUrl: './present-news.component.scss',
})
export class PresentNewsComponent {
  allNewsLettersArr!: any;
  currentNewsLetter: any;
  newsId: any;
  constructor(
    private _NewsLetterDataService: NewsLetterDataService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllNewsLetters();
    this.handleGetCurrentCategoryId();
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.newsId = params.get('id') as string;
      },
    });
  }

  /** Handle get all news letters */
  getAllNewsLetters() {
    this._NewsLetterDataService.getNewsLetterData().subscribe({
      next: (response) => {
        console.log(response);
        this.allNewsLettersArr = response.newsletter;
        this.currentNewsLetter = this.allNewsLettersArr.find(
          (n: any) => n.id == this.newsId
        );
        console.log(this.currentNewsLetter);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
