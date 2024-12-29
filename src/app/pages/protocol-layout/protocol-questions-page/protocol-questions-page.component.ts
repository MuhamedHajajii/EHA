import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SplitterModule } from 'primeng/splitter';
import { ProtocolQuestionsFlowChartsComponent } from './protocol-questions-flow-charts/protocol-questions-flow-charts.component';
import { ProtocolQuestionsFlowRadiosComponent } from './protocol-questions-flow-radios/protocol-questions-flow-radios.component';

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
  protocolId!: string;
  @ViewChild('componentB') componentB!: ProtocolQuestionsFlowRadiosComponent;
  @ViewChild('componentA') componentA!: ProtocolQuestionsFlowChartsComponent;

  constructor(
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {}

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.protocolId = params.get('id') as string;
      },
    });
  }

  showRelatedProtocols(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let sub_category_id = localStorage.getItem('sub_category_id');
      this._Router.navigate([
        `/protocols/sub-protocols-categories/${sub_category_id}`,
      ]);
    }
  }

  handleActionB(e: any): void {
    this.componentB.onCheckPreviousQuestionCheck(e.Question);
    this.componentB.onDisplayNextQuestionChange(e.Choice);
    console.log('works');
  }
  handleActionA(e: any): void {
    this.componentA.onNodeClick(e);
    console.log('works');
  }
  copy(): void {
    let lastChild = document.querySelector('#Questions__Description')
      ?.lastElementChild as HTMLDivElement;
    navigator.clipboard.writeText(lastChild.innerText);
    this._ToastrService.success('Assessment Copied');
  }
}
