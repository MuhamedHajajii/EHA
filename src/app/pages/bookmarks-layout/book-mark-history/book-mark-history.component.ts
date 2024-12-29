import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBookMarkHistory } from '../../../core/interfaces/history/IBookMarkHistory';
import { searchProtocolsHistoryBookMarkPipe } from '../../../core/pipes/search-history-protocols-bookmarks.pipe';
import { BookmarkService } from '../../../core/services/protocols/bookmark.service';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-book-mark-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    searchProtocolsHistoryBookMarkPipe,
    PaginatorModule,
  ],
  templateUrl: './book-mark-history.component.html',
  styleUrl: './book-mark-history.component.scss',
})
export class BookMarkHistoryComponent {
  IBookMarks!: IBookMarkHistory;
  inputSearch: string = '';
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _BookmarkService: BookmarkService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBookMarkHistory();
  }

  getUserId(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    }
  }

  getBookMarkHistory(): void {
    this._HistoryProtocolsService
      .getBookMarksHistory(this.getUserId())
      .subscribe({
        next: (response) => {
          this.IBookMarks = response;
          console.log(response, 'IBookMarks');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
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
        this.getBookMarkHistory();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (event.first + event.rows < this.IBookMarks.bookmarks.length) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.IBookMarks.bookmarks.length;
    }
  }
}
