import { Component, ViewChild } from '@angular/core';

import { IQuestion } from '../../../core/interfaces/protocols/ISpecificProtocol';
import { ProtocolQuestionsFlowChartsComponent } from './protocol-questions-flow-charts/protocol-questions-flow-charts.component';
import { ProtocolQuestionsFlowRadiosComponent } from './protocol-questions-flow-radios/protocol-questions-flow-radios.component';

@Component({
  selector: 'app-protocol-questions-page',
  standalone: true,
  imports: [
    ProtocolQuestionsFlowChartsComponent,
    ProtocolQuestionsFlowRadiosComponent,
  ],
  templateUrl: './protocol-questions-page.component.html',
  styleUrl: './protocol-questions-page.component.scss',
})
export class ProtocolQuestionsPageComponent {
  @ViewChild('componentB') componentB!: ProtocolQuestionsFlowRadiosComponent;
  handleAction(e: any): void {
    this.componentB.onCheckPreviousQuestionCheck(e.Question);
    this.componentB.onDisplayNextQuestionChange(e.Choice);
  }
}
