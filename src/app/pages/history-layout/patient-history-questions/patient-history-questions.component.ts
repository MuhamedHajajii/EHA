import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { IHistory, Question } from '../../../core/interfaces/history/IHistory';
import {
  IQuestion,
  ISpecificProtocol,
} from '../../../core/interfaces/protocols/ISpecificProtocol';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
import { SpecificProtocolService } from '../../../core/services/protocols/specific-protocol.service';
import { PatientHistoryFlowChartsComponent } from './patient-history-flow-charts/patient-history-flow-charts.component';
import { PatientHistoryRadioChartsComponent } from './patient-history-radio-charts/patient-history-radio-charts.component';
import { query } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-history-questions',
  standalone: true,
  imports: [
    SplitterModule,
    PatientHistoryFlowChartsComponent,
    PatientHistoryRadioChartsComponent,
  ],
  templateUrl: './patient-history-questions.component.html',
  styleUrl: './patient-history-questions.component.scss',
})
export class PatientHistoryQuestionsComponent {
  isDisabled: boolean = false;
  protocolId!: string;
  specificProtocol!: ISpecificProtocol;
  PatientData: any;
  History!: IHistory;
  currentQuestionArr: IQuestion[] = [];

  @ViewChild('componentB') componentB!: PatientHistoryRadioChartsComponent;
  @ViewChild('componentA') componentA!: PatientHistoryFlowChartsComponent;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SpecificProtocolService: SpecificProtocolService,
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserHistoryDetails();
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
  }

  handleActionB(e: any): void {
    // this.componentB.onCheckPreviousQuestionCheck(e.Question);
    // this.componentB.onDisplayNextQuestionChange(e.Choice);
    this.getHistory();
  }
  handleActionA(e: any): void {
    // this.componentA.onNodeClick(e);
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.protocolId = params.get('id') as string;
      },
    });
  }

  /** Get Current Category Apis */
  getCurrentCategory(): void {
    this._SpecificProtocolService
      .getSpecificProtocol(this.protocolId)
      .subscribe({
        next: (response) => {
          this.specificProtocol = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUserHistoryDetails(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.PatientData = JSON.parse(
        localStorage.getItem('PatientData') as string
      );
      this.getHistory();
    }
  }

  getHistory() {
    console.log(this.componentA);
    console.log(this.componentB);
    this._HistoryProtocolsService
      .getPatientHistory(this.PatientData)
      .subscribe({
        next: (response) => {
          this.History = response;
          this.filterHistory();
          // this.componentB.displayFirstQuestion();
          console.log(this.componentA);
          console.log(this.componentA.startNode());
          this.componentA.renderChart();
        },
      });
  }

  filterHistory(): void {
    this.currentQuestionArr = this.History.Historys.map((H) => {
      return H.question;
    });
    let allQuestions = this.History.Historys.map((q) => q.question).map(
      (q) => q.id
    );
    allQuestions.forEach((n) => {
      console.log(n);
      // this.componentB.onDisplayNextQuestionChange(n);
      let id = { id: n };
      // this.componentA.onNodeClick(id);
    });
    console.log(allQuestions, '================================');
    this.checkAllInputs();
  }

  checkAllInputs() {
    console.log(this.History, 'from radio button');
    setTimeout(() => {
      this.History.Historys.forEach((c) => {
        console.log(c.choice_id);
        let input = document.querySelector(
          `[for="${c.choice_id}"]`
        ) as HTMLInputElement;
        input.click();
      });
      document.querySelectorAll('input').forEach((i) => {
        i.setAttribute('disabled', 'true');
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    this._HistoryProtocolsService.History.next(null);
    localStorage.removeItem('PatientData');
  }
  copy(): void {
    let lastChild = document.querySelector('#Questions__Description')
      ?.lastElementChild as HTMLDivElement;
    navigator.clipboard.writeText(lastChild.innerText);
    this._ToastrService.success('Assessment Copied');
  }
}
