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
}
