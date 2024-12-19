import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProtocolsSubCategoriesService } from '../../../core/services/protocols/protocols-sub-categories.service';
import { IProtocolsSubCategories } from '../../../core/interfaces/protocols/IProtocolsSubCategories';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-protocols',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sub-protocols.component.html',
  styleUrl: './sub-protocols.component.scss',
})
export class SubProtocolsComponent {
  subCategories!: IProtocolsSubCategories;
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
