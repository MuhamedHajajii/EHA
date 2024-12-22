import { Component, ViewChild } from '@angular/core';
import { QuestionsFlowChartsComponent } from './questions-flow-charts/questions-flow-charts.component';
import { QuestionsRadioButtonsComponent } from './questions-radio-buttons/questions-radio-buttons.component';
import { IQuestion } from '../../../core/interfaces/protocols/ISpecificProtocol';

@Component({
  selector: 'app-protocol-questions',
  standalone: true,
  imports: [QuestionsRadioButtonsComponent, QuestionsFlowChartsComponent],
  templateUrl: './protocol-questions.component.html',
  styleUrl: './protocol-questions.component.scss',
})
export class ProtocolQuestionsComponent {
  @ViewChild('componentB') componentB!: QuestionsRadioButtonsComponent;
  handleAction(e: any): void {
    this.componentB.onCheckPreviousQuestionCheck(e.Question);
    this.componentB.onDisplayNextQuestionChange(e.Choice);
  }
}
