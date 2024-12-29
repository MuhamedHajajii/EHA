import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IProtocolsCategories } from '../../../core/interfaces/protocols/IProtocolsCategories';
import { SearchProtocolsPipe } from '../../../core/pipes/search-protocols.pipe';
import { ProtocolsCategoriesService } from '../../../core/services/protocols/protocols-categories.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-protocol-categories',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    RouterLink,
    SearchProtocolsPipe,
    FormsModule,
  ],
  templateUrl: './protocol-categories.component.html',
  styleUrl: './protocol-categories.component.scss',
})
export class ProtocolCategoriesComponent {
  protocolsCategories!: IProtocolsCategories;
  inputSearch: string = '';
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _ProtocolsCategoriesService: ProtocolsCategoriesService
  ) {}

  ngOnInit(): void {
    this.getAllProtocols();
    console.log('2-Protocol Categories Component');
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
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (
      event.first + event.rows <
      this.protocolsCategories.category.subcategories.length
    ) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.protocolsCategories.category.subcategories.length;
    }
  }
}
