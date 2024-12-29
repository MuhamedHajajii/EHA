import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
@Component({
  selector: 'app-protocols-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AvatarModule,
    BadgeModule,
  ],
  templateUrl: './protocols-navbar.component.html',
  styleUrl: './protocols-navbar.component.scss',
})
export class ProtocolsNavbarComponent {
  isLogIn: boolean = false;
  userName: string = '';
  constructor(
    private _Renderer2: Renderer2,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.isLoggedIn());
  }

  @ViewChild('navbar') navbar!: ElementRef;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navbar.nativeElement, 'active');
    } else {
      this._Renderer2.removeClass(this.navbar.nativeElement, 'active');
    }
  }

  /** Check if user is logged in */
  isLoggedIn() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      if (localStorage.getItem('token')) {
        this.userName = (localStorage.getItem('userName') || '')
          .replaceAll('"', '')
          .split('')
          .slice(0, 15)
          .join('');
        this.isLogIn = true;
      } else {
        this.isLogIn = false;
      }
    }
  }

  logOut() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.clear();
      this._Router.navigate(['/login']);
    }
  }
}
