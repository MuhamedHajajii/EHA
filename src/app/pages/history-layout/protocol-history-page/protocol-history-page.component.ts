import {
  Component,
  Inject,
  input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ProtocolHisotryFlowChartsComponent } from './protocol-hisotry-flow-charts/protocol-hisotry-flow-charts.component';
import { ProtocolHistoryRadioButtonComponent } from './protocol-history-radio-button/protocol-history-radio-button.component';
import { SplitterModule } from 'primeng/splitter';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { IHistory } from '../../../core/interfaces/history/IHistory';
import { ActivatedRoute } from '@angular/router';
import { SpecificProtocolService } from '../../../core/services/protocols/specific-protocol.service';
import {
  IQuestion,
  ISpecificProtocol,
} from '../../../core/interfaces/protocols/ISpecificProtocol';
import { HistoryProtocolsService } from '../../../core/services/protocols/history-protocols.service';
@Component({
  selector: 'app-protocol-history-page',
  standalone: true,
  imports: [
    ProtocolHisotryFlowChartsComponent,
    ProtocolHistoryRadioButtonComponent,
    SplitterModule,
  ],
  templateUrl: './protocol-history-page.component.html',
  styleUrl: './protocol-history-page.component.scss',
})
export class ProtocolHistoryPageComponent {
  isDisabled: boolean = false;
  History!: IHistory;
  currentUserId!: Number;
  specificProtocol!: ISpecificProtocol;
  protocolId!: string;
  currentQuestionArr: IQuestion[] = [];

  @ViewChild('componentB') componentB!: ProtocolHistoryRadioButtonComponent;
  @ViewChild('componentA') componentA!: ProtocolHisotryFlowChartsComponent;

  constructor(
    private _ToastrService: ToastrService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object,
    private _ActivatedRoute: ActivatedRoute,
    private _SpecificProtocolService: SpecificProtocolService,
    private _HistoryProtocolsService: HistoryProtocolsService
  ) {}

  handleActionB(e: any): void {
    this.componentB.onCheckPreviousQuestionCheck(e.Question);
    this.componentB.onDisplayNextQuestionChange(e.Choice);
  }
  handleActionA(e: any): void {
    this.componentA.onNodeClick(e);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.currentUserId = +(localStorage.getItem('userId') as string);
    }
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
  }
  /** Get Current Category From Route */
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
          this.getHistory();
          console.log(this.specificProtocol);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getHistory() {
    let getHistoryData = {
      user_id: +this.currentUserId,
      protocol_id: +this.protocolId,
    };
    console.log(getHistoryData);
    this._HistoryProtocolsService
      .getSpecificProtocolHistory(getHistoryData)
      .subscribe({
        next: (response) => {
          console.log('=========== History Response ==============');
          this.History = response;
          this.filterHistory();
          console.log(response);
          console.log('=========== History Response ==============');

          // this.displayFirstQuestion();
        },
        error: (error) => {
          console.log(error);
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
      // document.querySelectorAll('input').forEach((i) => {
      //   i.setAttribute('disabled', 'true');
      // });
    }, 1000);
  }
  copy(): void {
    let lastChild = document.querySelector('#Questions__Description')
      ?.lastElementChild as HTMLDivElement;
    navigator.clipboard.writeText(lastChild.innerText);
    this._ToastrService.success('Assessment Copied');
  }
}
