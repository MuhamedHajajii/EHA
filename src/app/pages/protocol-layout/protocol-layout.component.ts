import { Component, OnInit } from '@angular/core';
import { ProtocolsCategoriesService } from '../../core/services/protocols/protocols-categories.service';
import { ProtocolsNavbarComponent } from '../../core/components/protocols-navbar/protocols-navbar.component';

@Component({
  selector: 'app-protocol-layout',
  standalone: true,
  imports: [ProtocolsNavbarComponent],
  templateUrl: './protocol-layout.component.html',
  styleUrl: './protocol-layout.component.scss',
})
export class ProtocolLayoutComponent implements OnInit {
  constructor(
    private _ProtocolsCategoriesService: ProtocolsCategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllProtocols();
  }

  getAllProtocols() {
    this._ProtocolsCategoriesService.getAllProtocols().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
