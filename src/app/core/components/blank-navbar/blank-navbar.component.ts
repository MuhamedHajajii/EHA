import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-blank-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.scss',
})
export class BlankNavbarComponent {
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
