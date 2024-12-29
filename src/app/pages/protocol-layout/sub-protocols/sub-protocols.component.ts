import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SearchSupProtocolsPipe } from '../../../core/pipes/search-sup-protocols.pipe';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
import { ProtocolsSubCategoriesService } from '../../../core/services/protocols/protocols-sub-categories.service';
import { IProtocolsSubCategories } from './../../../core/interfaces/protocols/IProtocolsSubCategories';
import { BookmarkService } from './../../../core/services/protocols/bookmark.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-sub-protocols',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchSupProtocolsPipe,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    TooltipModule,
    PaginatorModule,
  ],
  templateUrl: './sub-protocols.component.html',
  styleUrl: './sub-protocols.component.scss',
})
export class SubProtocolsComponent {
  subCategories!: IProtocolsSubCategories;
  inputSearch: string = '';
  currentProtocolName!: string;
  protocolId!: string;
  specificProtocolId!: number;
  visible: boolean = false;
  currentUserId!: string;
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProtocolsSubCategoriesService: ProtocolsSubCategoriesService,
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _Router: Router,
    private _BookmarkService: BookmarkService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.currentUserId = localStorage.getItem('userId') || '';
    }
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.protocolId = params.get('id') as string;
      },
    });
  }

  getCurrentCategory(): void {
    this._ProtocolsSubCategoriesService
      .getAllProtocols(this.protocolId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.currentProtocolName = response.subcategory.title;
          this.subCategories = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getSpecificId(id: number) {
    this.specificProtocolId = id;
    console.log(id);
  }

  userDetailsForm = new FormGroup({
    // patient_name: new FormControl('hello world Case 2', [
    patient_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]), // Patient Name
    patient_code: new FormControl(''), // Patient Code
  });

  onClickShowUserDetailsMessage(): void {
    if (this.userDetailsForm.valid) {
      let currentUserName = this.userDetailsForm.value.patient_name || '';
      this._HistoryProtocolsService
        .checkPatientNameValid(currentUserName)
        .subscribe({
          next: (response) => {
            let PatientData;
            console.log(response);
            if (response.count) {
              PatientData = {
                ...this.userDetailsForm.value,
                patient_case: `case ${+response.count + 1}`,
              };
            } else {
              PatientData = {
                ...this.userDetailsForm.value,
                patient_case: 'case 1',
              };
            }
            localStorage.setItem('PatientData', JSON.stringify(PatientData));
            console.log(PatientData);
            this._Router.navigate([
              '/protocols/questions',
              this.specificProtocolId,
            ]);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.visible = false;
          },
        });
    } else {
      this.userDetailsForm.markAllAsTouched();
    }
  }

  skipPatientDetails() {
    this._Router.navigate(['/protocols/questions', this.specificProtocolId]);
  }

  // getPatientHistory(count: number) {
  //   let currentUserName = this.userDetailsForm.value.patient_name || '';
  //   let userData = {
  //     user_id: +this.currentUserId,
  //     patient_name: currentUserName,
  //     protocol_id: this.specificProtocolId,
  //   };
  //   console.log(userData);
  //   this._HistoryProtocolsService.getPatientHistory(userData).subscribe({
  //     next: (response) => {
  //       console.log(response, 'Patient History Response');
  //       this._Router.navigate([
  //         '/protocols/questions',
  //         this.specificProtocolId,
  //       ]);
  //       console.log(response);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  addBookmark(protocolId: number, e: Event) {
    e.stopPropagation();
    let bookMark = {
      user_id: +this.currentUserId,
      protocol_id: protocolId,
      bookmark_type: 'protocol',
    };
    console.log(bookMark);
    this._BookmarkService.addBookmark(bookMark).subscribe({
      next: (response) => {
        this.getCurrentCategory();
        this._ToastrService.success('Bookmark added');
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // need the bookmark array to be an id
  removeBookmark(bookMarkId: number, e: Event) {
    e.stopPropagation();
    let bookMark = {
      user_id: +this.currentUserId,
      bookmark_id: bookMarkId,
    };
    this._BookmarkService.deleteBookmark(bookMark).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success('Bookmark removed');
        this.getCurrentCategory();
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
      this.subCategories.subcategory.protocols.length
    ) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.subCategories.subcategory.protocols.length;
    }
  }
}
