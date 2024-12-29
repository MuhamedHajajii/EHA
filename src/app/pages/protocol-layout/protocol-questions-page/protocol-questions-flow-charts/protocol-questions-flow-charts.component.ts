import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import {
  IChoice,
  IQuestion,
} from '../../../../core/interfaces/protocols/ISpecificProtocol';
import { CurrentQuestionsService } from '../../../../core/services/protocols/current-questions.service';
import { HistoryProtocolsService } from '../../../../core/services/protocols/history-protocols.service';
import {
  IHistory,
  Question,
} from '../../../../core/interfaces/history/IHistory';

interface INode {
  id: string | number; // Support both strings and numbers
  name: string;
  parentId: string | number | null; // Support both strings and numbers or null
  collapsed: boolean;
  isNewNode: boolean;
  choiceId?: string | number;
}

@Component({
  selector: 'app-protocol-questions-flow-charts',
  standalone: true,
  imports: [],
  templateUrl: './protocol-questions-flow-charts.component.html',
  styleUrl: './protocol-questions-flow-charts.component.scss',
})
export class ProtocolQuestionsFlowChartsComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Output() actionTriggeredB = new EventEmitter<any>();
  currentQuestionArr: IQuestion[] = [];
  currentQuestionArrAppended: IQuestion[] = [];
  private data: INode[] = [];
  chart!: OrgChart<any>;
  isChartRendered = false;
  currentQuestion: IQuestion | null = null;
  currentChoiceId!: number;
  clickedChoiceId!: string;
  AllQuestions!: IQuestion[];
  isRendered = true;
  currentChartsIdPrev: any[] = [];
  constructor(
    private _CurrentQuestionsService: CurrentQuestionsService,
    private _HistoryProtocolsService: HistoryProtocolsService
  ) {}

  ngOnInit(): void {
    this._CurrentQuestionsService.currentQuestions.subscribe({
      next: (data) => {
        this.AllQuestions = data;
      },
    });
    this._CurrentQuestionsService.currentData.subscribe((data) => {
      this.currentQuestionArr = data;
      if (this.currentQuestionArr.length > 0 && this.isRendered) {
        setTimeout(() => {
          this.renderChart();
          this.isRendered = false;
        }, 200);
      }
    });
  }

  ngOnDestroy(): void {
    this._CurrentQuestionsService.updateData([]);
  }

  startNode(): void {
    this.currentQuestionArrAppended.push(this.AllQuestions[0]);
    this.data.push({
      id: 'root',
      name: this.currentQuestionArr[0].charts[0].title,
      parentId: null,
      collapsed: false,
      isNewNode: false, // Root is not a new node
    });
    this.currentQuestionArr[0].choices.forEach((CHOICE) => {
      this.data.push({
        id: CHOICE.next_question_id.toString(),
        name: CHOICE.text,
        parentId: 'root',
        collapsed: false,
        isNewNode: false, // Root is not a new node
      });
    });
  }

  renderChart(): void {
    if (!this.isChartRendered) {
      this.startNode();
      this.chart = new OrgChart();
      this.isChartRendered = true;
    }

    // Render the chart with the updated data
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth((node: any) => 250) // Ensure enough width for long text
      .nodeHeight((node: any) => 150) // Set fixed node height
      .childrenMargin((node: any) => 80) // Space between parent and children
      .siblingsMargin((node: any) => 80) // Space between sibling nodes
      .nodeContent((d: any) => this.getCustomNodeHTML(d))
      .nodeButtonY((node: any) => 10)
      .onNodeClick((d: any) => this.onNodeClick(d))
      .linkYOffset(1)
      .compact(false)
      .layout('top')
      .render();
    this.isChartRendered = true;
  }

  onNodeClick(d: any): void {
    console.log('Node clicked:', d);
    this.appendChildNode(d);
    let currentChoice = +this.currentChoiceId;
    this.currentChoiceId = +d.id;
    const element = document.querySelector(
      `[value="${currentChoice}"]`
    ) as HTMLInputElement | null;
    if (element && !element.checked) {
      element.click();
    }
  }
  getCustomNodeHTML(d: any): string {
    return `
        <div data-attr="${d.data.id}" class="title__fonts__normal custom-node h-100 position-relative  d-flex justify-content-center align-items-center w-auto text-dark" 
        style="word-wrap: break-word;background-color:#e8f5fc;border-color:#409bd2;">
          <div>
            <label  class="node-header" style="font-weight:300;font-family: "Montserrat", sans-serif; ">${d.data.name}</label>
          </div>
        </div>
      `;
  }

  appendChildNode(ClickedNodeID: any): void {
    this.currentChoiceId = ClickedNodeID.id; // next question id

    const currentQuestion = this.currentQuestionArr.find(
      (Question) => Question.id.toString() == ClickedNodeID.id
    );
    console.log(ClickedNodeID);
    if (!this.currentQuestionArr.includes(currentQuestion as IQuestion)) {
      return;
    }

    if (currentQuestion && currentQuestion.choices) {
      document.getElementById('copy')?.classList.add('d-none');
      document.getElementById('responsive_copy')?.classList.add('d-none');
      if (currentQuestion.choices.length > 0) {
        let currentParent = currentQuestion.charts[0].id.toString();
        this.updateChart(
          currentParent,
          currentQuestion.charts[0].title,
          ClickedNodeID.id.toString(),
          true
        );

        currentQuestion.choices.forEach((Choice: IChoice) => {
          console.log(currentQuestion.id.toString());
          const childChoiceId = ClickedNodeID.id;
          this.updateChart(
            Choice.next_question_id.toString(),
            Choice.text,
            currentParent,
            false
          );
        });
      } else {
        currentQuestion.charts.forEach((chart, i) => {
          const totalCharts = currentQuestion.charts.length;
          let isCenter = Math.floor(totalCharts / 2) == i + 1;
          this.updateChart(
            chart.id.toString(),
            chart.title,
            ClickedNodeID.id,
            isCenter
          );
        });
        document.getElementById('copy')?.classList.remove('d-none');
        document.getElementById('responsive_copy')?.classList.remove('d-none');
      }
    }
    this.chart.expandAll();
    this.collapse(ClickedNodeID);
  }

  updateChart(
    nodeId: string,
    nodeName: string,
    parentId: string,
    setCentered: boolean
  ): void {
    this.chart
      .addNode({
        id: nodeId,
        name: nodeName,
        parentId: parentId,
        collapsed: false,
        isNewNode: true,
      })
      .render();
    if (setCentered) {
      this.chart.setCentered(nodeId);
    }
  }
  collapse(ClickedNodeID: any): void {
    let currentChartsId: any[] = [];
    this.currentQuestionArr.forEach((Question) => {
      Question.charts.forEach((chart) => {
        currentChartsId.push(chart.id);
        this.currentChartsIdPrev.push(chart.id);
      });
    });

    this.currentChartsIdPrev.forEach((chartId) => {
      if (!currentChartsId.includes(chartId)) {
        this.chart.removeNode(chartId);
        this.currentChartsIdPrev = currentChartsId;
      }
    });
  }
}
