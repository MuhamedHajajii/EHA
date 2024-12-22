import { Component } from '@angular/core';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ProtocolsNavbarComponent } from '../../../core/components/protocols-navbar/protocols-navbar.component';
import { IProtocolsCategories } from '../../../core/interfaces/protocols/IProtocolsCategories';
import { ProtocolsCategoriesService } from '../../../core/services/protocols/protocols-categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchProtocolsPipe } from '../../../core/pipes/search-protocols.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-protocol-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchProtocolsPipe, FormsModule],
  templateUrl: './protocol-categories.component.html',
  styleUrl: './protocol-categories.component.scss',
})
export class ProtocolCategoriesComponent {
  protocolsCategories!: IProtocolsCategories;
  inputSearch: string = '';
  constructor(
    private _ProtocolsCategoriesService: ProtocolsCategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllProtocols();
  }

  getAllProtocols() {
    this._ProtocolsCategoriesService.getAllProtocols().subscribe({
      next: (response) => {
        this.protocolsCategories = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
