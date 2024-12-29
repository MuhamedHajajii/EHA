import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { IAllHistory } from '../../core/interfaces/history/IAllHistory';
import { HistoryProtocolsService } from '../../core/services/protocols/history-protocols.service';

@Component({
  selector: 'app-history-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './history-layout.component.html',
  styleUrl: './history-layout.component.scss',
})
export class HistoryLayoutComponent {
  activeRouteClass: string = '';

  ngOnInit(): void {
    this.getCurrentActiveLink();
    this.getAllHistory();
  }

  constructor(
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _HistoryProtocolsService: HistoryProtocolsService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  getCurrentActiveLink(): void {
    let currentRoute = this._ActivatedRoute.snapshot.url[0].path;
    this.activeRouteClass = currentRoute;
    console.log(currentRoute);
    this._Router.events.subscribe({
      next: (response) => {
        response.toString();
        const currentRoute = this._Router.url.split('/')[3]; // Get first part of the route
        this.activeRouteClass = currentRoute; // Assign to active class
      },
    });
  }

  getAllHistory(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let userId = localStorage?.getItem('userId') as string;
      this._HistoryProtocolsService.getAllHistory(userId).subscribe({
        next: (response: IAllHistory[]) => {
          console.log(response);
          this._HistoryProtocolsService.AllHistory.next(response);
          const [{ bookmarks }, { Historys }] = response;
          console.log(bookmarks);
          console.log(Historys);
        },
      });
    }
  }
}
