import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginatorModule } from 'primeng/paginator';
import { IUserHistory } from '../../../core/interfaces/history/IUserHistory';
import { searchProtocolsHistoryPipe } from '../../../core/pipes/search-history-protocols.pipe';
import { BookmarkService } from '../../../core/services/protocols/bookmark.service';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    searchProtocolsHistoryPipe,
    PaginatorModule,
  ],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.scss',
})
export class UserHistoryComponent {
  inputSearch: string = '';
  IProtocolHisory!: IUserHistory;
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _BookmarkService: BookmarkService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getPatientHistory();
  }

  getUserId(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    }
  }

  getPatientHistory(): void {
    this._HistoryProtocolsService
      .getProtocolsHistory(this.getUserId())
      .subscribe({
        next: (response) => {
          this.IProtocolHisory = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // need the bookmark array to be an id
  removeBookmark(bookMarkId: number, e: Event) {
    e.stopPropagation();
    let bookMark = {
      user_id: +this.getUserId(),
      bookmark_id: bookMarkId,
    };
    this._BookmarkService.deleteBookmark(bookMark).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Bookmark removed');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClickGetSpecificHistory(id: number): void {
    console.log(id);
    this._Router.navigate([`/protocols/protocol-history`, id]);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (event.first + event.rows < this.IProtocolHisory.Historys.length) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.IProtocolHisory.Historys.length;
    }
  }
}
