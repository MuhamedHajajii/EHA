import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  QueryList,
  ViewChild,
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

@Component({
  selector: 'app-protocol-history-radio-button',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './protocol-history-radio-button.component.html',
  styleUrl: './protocol-history-radio-button.component.scss',
})
export class ProtocolHistoryRadioButtonComponent {
  @Output() actionTriggeredA = new EventEmitter<any>();
  @ViewChild('Questions__Description') Questions__Description!: ElementRef;
  @Input() currentQuestionArr: IQuestion[] = [];
  @Input() specificProtocol!: ISpecificProtocol;
  protocolId!: string;
  History!: IHistory;
  currentUserId!: Number;

  constructor(
    private _CurrentQuestionsService: CurrentQuestionsService,
    private _HistoryProtocolsService: HistoryProtocolsService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}

  ngOnDestroy(): void {
    this._HistoryProtocolsService.History.next(null);
    localStorage.removeItem('PatientData');
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.currentUserId = +(localStorage.getItem('userId') as string);
    }
  }
  /** Display First Question */
  displayFirstQuestion(): void {
    const FIRST_QUESTION = this.specificProtocol.protocol.questions[0];
    this.currentQuestionArr.push(FIRST_QUESTION);
  }

  /** Handle Display Next Question */
  onDisplayNextQuestionChange(Choices: number): void {
    const nextQuestion = this.specificProtocol.protocol.questions.find(
      (q) => q.id === Choices
    );

    if (nextQuestion) {
      this.currentQuestionArr.push(nextQuestion);
    }
  }

  addToHistory(data: { user_id: string; id: string }) {
    this._HistoryProtocolsService.addToHistory(data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /** Check if The Answer From Previous Questions */
  onCheckPreviousQuestionCheck(Question: IQuestion): void {
    const INDEX = this.currentQuestionArr.indexOf(Question);
    if (INDEX !== -1) {
      this.currentQuestionArr.splice(INDEX + 1);
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
      console.log(this.Question.last.nativeElement);
      const lastChild = this.Question.last.nativeElement;
      lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 0);
  }
}
