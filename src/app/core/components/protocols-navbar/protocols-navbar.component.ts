import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-protocols-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './protocols-navbar.component.html',
  styleUrl: './protocols-navbar.component.scss',
})
export class ProtocolsNavbarComponent {
  constructor(private _Renderer2: Renderer2) {}

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
}
