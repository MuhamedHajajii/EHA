import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProtocolsSubCategories } from '../../../core/interfaces/protocols/IProtocolsSubCategories';
import { SearchSupProtocolsPipe } from '../../../core/pipes/search-sup-protocols.pipe';
import { ProtocolsSubCategoriesService } from '../../../core/services/protocols/protocols-sub-categories.service';

@Component({
  selector: 'app-sub-protocols',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, SearchSupProtocolsPipe],
  templateUrl: './sub-protocols.component.html',
  styleUrl: './sub-protocols.component.scss',
})
export class SubProtocolsComponent {
  subCategories!: IProtocolsSubCategories;
  inputSearch: string = '';
  protocolId!: string;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProtocolsSubCategoriesService: ProtocolsSubCategoriesService
  ) {}
  ngOnInit(): void {
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.protocolId = params.get('id') as string;
        console.log(this.protocolId);
      },
    });
  }

  getCurrentCategory(): void {
    this._ProtocolsSubCategoriesService
      .getAllProtocols(this.protocolId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.subCategories = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
