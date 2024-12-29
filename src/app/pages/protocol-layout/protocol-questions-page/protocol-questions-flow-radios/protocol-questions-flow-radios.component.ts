import { query } from 'express';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
  QueryList,
  viewChild,
  ViewChild,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IQuestion,
  ISpecificProtocol,
} from '../../../../core/interfaces/protocols/ISpecificProtocol';
import { CurrentQuestionsService } from '../../../../core/services/protocols/current-questions.service';
import { SpecificProtocolService } from '../../../../core/services/protocols/specific-protocol.service';
import { HistoryProtocolsService } from '../../../../core/services/protocols/history-protocols.service';
import { IHistory } from '../../../../core/interfaces/history/IHistory';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ISendPatient } from '../../../../core/interfaces/history/ISendPatient';
import { last } from 'rxjs';

@Component({
  selector: 'app-protocol-questions-flow-radios',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './protocol-questions-flow-radios.component.html',
  styleUrl: './protocol-questions-flow-radios.component.scss',
})
export class ProtocolQuestionsFlowRadiosComponent {
  @Output() actionTriggeredA = new EventEmitter<any>();
  @ViewChild('Questions__Description') Questions__Description!: ElementRef;
  specificProtocol!: ISpecificProtocol;
  currentQuestionArr: IQuestion[] = [];
  protocolId!: string;
  History!: IHistory | null;
  currentUserId!: Number;
  SendPatient!: ISendPatient;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SpecificProtocolService: SpecificProtocolService,
    private _CurrentQuestionsService: CurrentQuestionsService,
    private cdr: ChangeDetectorRef,
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.currentUserId = +(localStorage.getItem('userId') as string);
      this.SendPatient = JSON.parse(
        localStorage.getItem('PatientData') as string
      );
    }
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
  }

  ngOnDestroy(): void {
    this._HistoryProtocolsService.History.next(null);
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('PatientData');
    }
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
          this._CurrentQuestionsService.updateQuestions(
            response.protocol.questions
          );
          if (isPlatformBrowser(this._PLATFORM_ID)) {
            localStorage.setItem(
              'sub_category_id',
              response.protocol.sub_category_id.toString()
            );
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /** Display First Question */
  displayFirstQuestion(): void {
    const FIRST_QUESTION = this.specificProtocol.protocol.questions[0];
    this.currentQuestionArr.push(FIRST_QUESTION);
    this._CurrentQuestionsService.updateData(this.currentQuestionArr);
  }

  /** Handle Display Next Question */
  onDisplayNextQuestionChange(Choices: number): void {
    const nextQuestion = this.specificProtocol.protocol.questions.find(
      (q) => q.id === Choices
    );

    if (nextQuestion) {
      this.currentQuestionArr.push(nextQuestion);
    }
    this._CurrentQuestionsService.updateData(this.currentQuestionArr);
  }

  addToHistory(data: { user_id: string; id: string }) {
    let UserData;
    if (this.SendPatient) {
      console.log(this.SendPatient);
      UserData = {
        ...this.SendPatient,
        protocol_id: this.protocolId,
        user_id: this.currentUserId.toString(),
      };
      this._HistoryProtocolsService
        .addToHistoryPatient(UserData, data.id)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      UserData = data;
      this._HistoryProtocolsService.addToHistory(UserData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
    console.log(UserData);
  }

  /** Check if The Answer From Previous Questions */
  onCheckPreviousQuestionCheck(Question: IQuestion): void {
    const INDEX = this.currentQuestionArr.indexOf(Question);
    if (INDEX !== -1) {
      let splices = this.currentQuestionArr.splice(INDEX + 1);
      console.log(splices);
      splices.forEach((s) => {
        s.choices.forEach((c) => {
          let inputs = document.querySelectorAll(`[for="${c.id}"]`) as NodeList;
          inputs.forEach((C) => {
            let prev = C.previousSibling as HTMLInputElement;
            prev.checked = false;
          });
        });
      });
      this._CurrentQuestionsService.updateData(this.currentQuestionArr);
    }
  }
  updateChart(ChoicesId: any, next_question_id: any) {
    this._CurrentQuestionsService.updateData(this.currentQuestionArr);
    this.actionTriggeredA.emit({
      id: next_question_id,
    });
    this.addToHistory({
      user_id: this.currentUserId.toString(),
      id: ChoicesId,
    });
  }
  @ViewChildren('Question') Question!: QueryList<ElementRef>;
  onChangeMoving(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
      console.log(this.Question.last.nativeElement);
      const lastChild = this.Question.last.nativeElement;
      lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 0);
    // console.log(document.getElementById('Questions__Description')?.lastChild);
  }
}
