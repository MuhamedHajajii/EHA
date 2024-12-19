import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificProtocolService } from '../../../core/services/protocols/specific-protocol.service';
import { OrgChart } from 'd3-org-chart';
import {
  IChoice,
  IQuestion,
  ISpecificProtocol,
} from '../../../core/interfaces/protocols/ISpecificProtocol';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-protocol-questions',
  standalone: true,
  imports: [],
  templateUrl: './protocol-questions.component.html',
  styleUrl: './protocol-questions.component.scss',
})
export class ProtocolQuestionsComponent {
  specificProtocol!: ISpecificProtocol;
  currentQuestionArr: IQuestion[] = [];
  orgChart!: OrgChart<any>;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  protocolId!: string;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _SpecificProtocolService: SpecificProtocolService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.handleGetCurrentCategoryId();
    this.getCurrentCategory();
  }

  handleGetCurrentCategoryId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.protocolId = params.get('id') as string;
      },
    });
  }

  getCurrentCategory(): void {
    this._SpecificProtocolService
      .getSpecificProtocol(this.protocolId)
      .subscribe({
        next: (response) => {
          this.specificProtocol = response;
          this.displayFirstQuestion();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  renderChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const chartData = this.getChartData();

      if (!this.orgChart) {
        this.orgChart = new OrgChart()
          .container(this.chartContainer.nativeElement)
          .nodeWidth(() => 200)
          .nodeHeight(() => 80)
          .nodeContent((d: any) => this.getCustomNodeHTML(d))
          .onNodeClick((d: any) => console.log('Node clicked:', d));
      }

      this.orgChart.data(chartData).render();

      // Automatically expand all nodes
      chartData.forEach((node) => this.orgChart.expand(node.id));

      // Ensure chart is centered after rendering
      this.orgChart.fit(); // Alternatively, use `this.orgChart.center()`
    }
  }

  getChartData(): any[] {
    return this.currentQuestionArr.map((q, index) => ({
      id: q.id,
      name: q.text,
      title: `Question ${index + 1}`,
      parentId: index > 0 ? this.currentQuestionArr[index - 1].id : null, // Check if `parentId` is accurate
    }));
  }

  getCustomNodeHTML(d: any): string {
    return `
      <div class="custom-node">
        <div class="node-header" style="background-color: #4CAF50; color: white; padding: 10px;">
          ${d.data.name}
        </div>
        <div class="node-subtitle" style="padding: 5px; font-size: 12px;">
          ${d.data.title}
        </div>
      </div>
    `;
  }

  displayFirstQuestion(): void {
    const FIRST_QUESTION = this.specificProtocol.protocol.questions[0];
    this.currentQuestionArr.push(FIRST_QUESTION);
    this.renderChart();
  }
  onDisplayNextQuestionChange(Choices: IChoice, question: IQuestion): void {
    const nextQuestion = this.specificProtocol.protocol.questions.find(
      (q) => q.id === Choices.next_question_id
    );
    if (nextQuestion) {
      this.currentQuestionArr.push(nextQuestion);

      this.renderChart(); // Ensure chart updates with new data
    }
  }

  onCheckPreviousQuestionCheck(Question: IQuestion): void {
    const INDEX = this.currentQuestionArr.indexOf(Question);
    if (INDEX !== -1) {
      this.currentQuestionArr.splice(INDEX + 1);
      this.renderChart();
    }
  }
}
