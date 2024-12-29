import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AvatarModule,
    BadgeModule,
  ],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss',
})
export class BlankNavbarComponent {
  isLogIn: boolean = false;
  userName: string = '';
  constructor(
    private _Renderer2: Renderer2,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('navbarBanner') navbarBanner!: ElementRef;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navbar.nativeElement, 'active');
      this._Renderer2.addClass(this.navbarBanner.nativeElement, 'd-none');
    } else {
      this._Renderer2.removeClass(this.navbar.nativeElement, 'active');
      this._Renderer2.removeClass(this.navbarBanner.nativeElement, 'd-none');
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
        console.log(this.userName);
        this.isLogIn = true;
      } else {
        this.isLogIn = false;
      }
    }
  }

  logOut() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      localStorage.clear();
      localStorage.removeItem('userName');
      setTimeout(() => {
        this._Router.navigate(['/login']);
      }, 100);
    }
  }
}
