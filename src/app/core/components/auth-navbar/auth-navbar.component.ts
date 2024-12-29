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

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss',
})
export class AuthNavbarComponent {
  isLogIn: boolean = false;
  userName: string = '';
  constructor(
    private _Renderer2: Renderer2,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _CookieService: CookieService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.clear();
    }
    console.log(this.isLoggedIn());
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
          .split('')
          .slice(0, 10)
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
