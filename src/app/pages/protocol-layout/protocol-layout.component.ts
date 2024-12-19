import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { ProtocolsNavbarComponent } from '../../core/components/protocols-navbar/protocols-navbar.component';

@Component({
  selector: 'app-protocol-layout',
  standalone: true,
  imports: [ProtocolsNavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './protocol-layout.component.html',
  styleUrl: './protocol-layout.component.scss',
})
export class ProtocolLayoutComponent {}
