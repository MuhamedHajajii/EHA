import { Component, ViewChild } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { ProtocolQuestionsFlowChartsComponent } from './protocol-questions-flow-charts/protocol-questions-flow-charts.component';
import { ProtocolQuestionsFlowRadiosComponent } from './protocol-questions-flow-radios/protocol-questions-flow-radios.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-protocol-questions-page',
  standalone: true,
  imports: [
    ProtocolQuestionsFlowRadiosComponent,
    ProtocolQuestionsFlowChartsComponent,
    SplitterModule,
  ],
  templateUrl: './protocol-questions-page.component.html',
  styleUrl: './protocol-questions-page.component.scss',
})
export class ProtocolQuestionsPageComponent {
  isDisabled: boolean = false;

  @ViewChild('componentB') componentB!: ProtocolQuestionsFlowRadiosComponent;
  @ViewChild('componentA') componentA!: ProtocolQuestionsFlowChartsComponent;

  constructor(private _ToastrService: ToastrService) {}

  handleActionB(e: any): void {
    this.componentB.onCheckPreviousQuestionCheck(e.Question);
    this.componentB.onDisplayNextQuestionChange(e.Choice);
  }
  handleActionA(e: any): void {
    this.componentA.onNodeClick(e);
  }
  copy(): void {
    let lastChild = document.querySelector('#Questions__Description')
      ?.lastElementChild as HTMLDivElement;
    navigator.clipboard.writeText(lastChild.innerText);
    this._ToastrService.success('Assessment Copied');
  }
}
