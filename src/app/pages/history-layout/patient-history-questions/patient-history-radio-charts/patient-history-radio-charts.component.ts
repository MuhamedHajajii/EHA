import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IHistory } from '../../../../core/interfaces/history/IHistory';
import {
  IQuestion,
  ISpecificProtocol,
} from '../../../../core/interfaces/protocols/ISpecificProtocol';
import { CurrentQuestionsService } from '../../../../core/services/protocols/current-questions.service';
import { HistoryProtocolsService } from '../../../../core/services/protocols/history-protocols.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient-history-radio-charts',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './patient-history-radio-charts.component.html',
  styleUrl: './patient-history-radio-charts.component.scss',
})
export class PatientHistoryRadioChartsComponent {
  @Output() actionTriggeredA = new EventEmitter<any>();
  @ViewChild('Questions__Description') Questions__Description!: ElementRef;
  @ViewChildren('Question') Question!: QueryList<ElementRef>;
  @Input() History!: IHistory | null;

  @Input() specificProtocol!: ISpecificProtocol;
  @Input() currentQuestionArr: IQuestion[] = [];

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
    }
  }
  updateChart(next_question_id: any) {
    this.actionTriggeredA.emit({
      id: next_question_id,
    });
  }
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
