import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProtocolsNavbarComponent } from '../../core/components/protocols-navbar/protocols-navbar.component';

@Component({
  selector: 'app-protocol-layout',
  standalone: true,
  imports: [ProtocolsNavbarComponent, RouterOutlet],
  templateUrl: './protocol-layout.component.html',
  styleUrl: './protocol-layout.component.scss',
})
export class ProtocolLayoutComponent {}
