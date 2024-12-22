import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IChoice,
  IQuestion,
  ISpecificProtocol,
} from '../../../../core/interfaces/protocols/ISpecificProtocol';
import { CurrentQuestionsService } from '../../../../core/services/protocols/current-questions.service';
import { SpecificProtocolService } from '../../../../core/services/protocols/specific-protocol.service';

@Component({
  selector: 'app-questions-radio-buttons',
  standalone: true,
  imports: [],
  templateUrl: './questions-radio-buttons.component.html',
  styleUrl: './questions-radio-buttons.component.scss',
})
export class QuestionsRadioButtonsComponent {
  specificProtocol!: ISpecificProtocol;
  currentQuestionArr: IQuestion[] = [];

  protocolId!: string;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SpecificProtocolService: SpecificProtocolService,
    private _CurrentQuestionsService: CurrentQuestionsService
  ) {}
  ngOnInit(): void {
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
          console.log(response);
          this.displayFirstQuestion();
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
    console.log(Choices, 'choices parameter');
    const nextQuestion = this.specificProtocol.protocol.questions.find(
      (q) => q.id === Choices
    );

    if (nextQuestion) {
      this.currentQuestionArr.push(nextQuestion);
      console.log(this.currentQuestionArr, 'inner Display');
    }
    this._CurrentQuestionsService.updateData(this.currentQuestionArr);
  }

  /** Check if The Answer From Previous Questions */
  onCheckPreviousQuestionCheck(Question: IQuestion): void {
    console.log(this.currentQuestionArr);
    const INDEX = this.currentQuestionArr.indexOf(Question);
    if (INDEX !== -1) {
      this.currentQuestionArr.splice(INDEX + 1);
      console.log(this.currentQuestionArr);
      this._CurrentQuestionsService.updateData(this.currentQuestionArr);
    }
  }
}
