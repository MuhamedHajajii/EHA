import { BookmarkService } from './../../../core/services/protocols/bookmark.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IGuideline } from '../../../core/interfaces/guideline/IGuideline';
import { GuidelineService } from '../../../core/services/guideline/guideline.service';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { StringTrimPipe } from '../../../core/pipes/string-trim.pipe';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchGuidelinePipe } from '../../../core/pipes/search-guideline.pipe';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-guidelines',
  standalone: true,
  imports: [
    TooltipModule,
    StringTrimPipe,
    RouterLink,
    DatePipe,
    CommonModule,
    FormsModule,
    SearchGuidelinePipe,
    PaginatorModule,
  ],
  templateUrl: './guidelines.component.html',
  styleUrl: './guidelines.component.scss',
})
export class GuidelinesComponent {
  AllGuidelines!: IGuideline;
  inputSearch: string = '';
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _GuidelineService: GuidelineService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _BookmarkService: BookmarkService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllGuidLines();
  }

  getUserId(): string {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    } else return '';
  }

  getAllGuidLines(): void {
    this._GuidelineService.getAllGuidelines(this.getUserId()).subscribe({
      next: (response) => {
        this.AllGuidelines = response;
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
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (event.first + event.rows < this.AllGuidelines.articles.length) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.AllGuidelines.articles.length;
    }
  }
}
