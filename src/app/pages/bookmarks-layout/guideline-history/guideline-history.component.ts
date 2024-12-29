import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { IGuideLineHistory } from '../../../core/interfaces/history/IGuideLineHistory';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BookmarkService } from '../../../core/services/protocols/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchGuidelineHistoryPipe } from '../../../core/pipes/search-history-guideline.pipe';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-guideline-history',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    RouterLink,
    SearchGuidelineHistoryPipe,
    FormsModule,
  ],
  templateUrl: './guideline-history.component.html',
  styleUrl: './guideline-history.component.scss',
})
export class GuidelineHistoryComponent {
  IGuideLine!: IGuideLineHistory;
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
    this.getGuideLineHistory();
  }

  getUserId(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    }
  }

  getGuideLineHistory(): void {
    this._HistoryProtocolsService
      .getGuidelineHistory(this.getUserId())
      .subscribe({
        next: (response) => {
          this.IGuideLine = response;
          console.log(response, 'IGuideLine');
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
        this.getGuideLineHistory();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (event.first + event.rows < this.IGuideLine.bookmarks.length) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.IGuideLine.bookmarks.length;
    }
  }
}
