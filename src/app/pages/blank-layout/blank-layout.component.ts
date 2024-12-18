import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../../core/components/blank-navbar/blank-navbar.component';
import { FooterComponent } from '../../core/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [BlankNavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss',
})
export class BlankLayoutComponent {
  @ViewChild('scrollToTop') navElement!: ElementRef;

  @HostListener('window:scroll')
  onWindowScroll() {
    if (scrollY > 500) {
      this.navElement.nativeElement.classList.remove('d-none');
    } else {
      this.navElement.nativeElement.classList.add('d-none');
    }
  }
}
