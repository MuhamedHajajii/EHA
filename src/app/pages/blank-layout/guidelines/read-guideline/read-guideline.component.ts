import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { GuidelineService } from '../../../../core/services/guideline/guideline.service';
import { IArticle } from './../../../../core/interfaces/history/IAllHistory';
import { BookmarkService } from '../../../../core/services/protocols/bookmark.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-read-guideline',
  standalone: true,
  imports: [TooltipModule, DatePipe, CommonModule],
  templateUrl: './read-guideline.component.html',
  styleUrl: './read-guideline.component.scss',
})
export class ReadGuidelineComponent {
  Article!: IArticle;
  ArticleId!: string;
  constructor(
    private _GuidelineService: GuidelineService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _ActivatedRoute: ActivatedRoute,
    private _BookmarkService: BookmarkService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllGuidLines();
    this.handleGetCurrentCategoryId();
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.ArticleId = params.get('id') as string;
      },
    });
  }

  getUserId(): string {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    } else return '';
  }

  getAllGuidLines(): void {
    this._GuidelineService.getAllGuidelines(this.getUserId()).subscribe({
      next: (response) => {
        this.Article = response.articles.find(
          (article) => article.id == +this.ArticleId
        ) as IArticle;
        console.log(this.Article);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  addBookmark(guidlineId: number, e: Event) {
    e.stopPropagation();
    let bookMark = {
      user_id: +this.getUserId(),
      protocol_id: guidlineId,
      bookmark_type: 'guideline',
    };
    console.log(bookMark);
    this._BookmarkService.addBookmark(bookMark).subscribe({
      next: (response) => {
        this.getAllGuidLines();
        this._ToastrService.success('Bookmark added');
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // need the bookmark array to be an id
  removeBookmark(guidelineId: number, e: Event) {
    e.stopPropagation();
    let bookMark = {
      user_id: +this.getUserId(),
      bookmark_id: guidelineId,
    };
    this._BookmarkService.deleteBookmark(bookMark).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Bookmark removed');
        this.getAllGuidLines();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
