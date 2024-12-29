import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import {
  History,
  IPatientHistory,
} from '../../../core/interfaces/history/IPatientHistory';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
import { Router } from '@angular/router';
import { SearchPatientsPipe } from '../../../core/pipes/search-patients.pipe';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-patients-history',
  standalone: true,
  imports: [
    MenubarModule,
    FormsModule,
    PaginatorModule,
    CommonModule,
    SearchPatientsPipe,
  ],
  templateUrl: './patients-history.component.html',
  styleUrl: './patients-history.component.scss',
})
export class PatientsHistoryComponent {
  IPatientHistory!: IPatientHistory;
  inputSearch: string = '';
  first: number = 0;
  rows: number = 10;
  next: number = 10;
  constructor(
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getPatientHistory();
  }

  getUserId(): any {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('userId') || ('' as string);
    }
  }

  getPatientHistory(): void {
    this._HistoryProtocolsService
      .getPatientsHistory(this.getUserId())
      .subscribe({
        next: (response) => {
          this.IPatientHistory = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onClickGetSpecificHistory(Patient: History): void {
    let PatientData = {
      patient_name: Patient.patient_name,
      patient_case: Patient.patient_case,
      protocol_id: +Patient.protocol_id,
      user_id: +this.getUserId(),
    };
    localStorage.setItem('PatientData', JSON.stringify(PatientData));
    this._Router.navigate([`/protocols/patient-history`, Patient.protocol_id]);
  }
  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    if (event.first + event.rows < this.IPatientHistory.Historys.length) {
      {
        this.first = event.first;
        this.rows = event.rows;
        this.next = this.first + event.rows;
      }
    } else {
      this.next = this.IPatientHistory.Historys.length;
    }
  }
}
