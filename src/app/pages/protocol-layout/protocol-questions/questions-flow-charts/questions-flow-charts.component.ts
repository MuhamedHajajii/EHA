import { OrgChart } from 'd3-org-chart';
import {
  IChoice,
  IQuestion,
} from '../../../../core/interfaces/protocols/ISpecificProtocol';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CurrentQuestionsService } from '../../../../core/services/protocols/current-questions.service';
import * as d3 from 'd3';

interface INode {
  id: string | number; // Support both strings and numbers
  name: string;
  parentId: string | number | null; // Support both strings and numbers or null
  collapsed: boolean;
  isNewNode: boolean;
  choiceId?: string | number;
}

@Component({
  selector: 'app-questions-flow-charts',
  standalone: true,
  imports: [],
  templateUrl: './questions-flow-charts.component.html',
  styleUrls: ['./questions-flow-charts.component.scss'], // Correct property name is `styleUrls`
})
export class QuestionsFlowChartsComponent {
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
  History: Set<string> = new Set();
  private addedNodesMap: Map<string, string[]> = new Map();
  constructor(private _CurrentQuestionsService: CurrentQuestionsService) {}

  ngOnInit(): void {
    this._CurrentQuestionsService.currentQuestions.subscribe({
      next: (data) => {
        this.AllQuestions = data;
      },
    });
    this._CurrentQuestionsService.currentData.subscribe((data) => {
      this.currentQuestionArr = data;
      if (this.currentQuestionArr.length > 0) {
        this.renderChart();
      }
    });
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
        id: `${CHOICE.id}-${CHOICE.next_question_id}`,
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
      .nodeWidth((node: any) => 300) // Ensure enough width for long text
      .nodeHeight((node: any) => 120) // Set fixed node height
      .childrenMargin((node: any) => 20) // Space between parent and children
      .siblingsMargin((node: any) => 20) // Space between sibling nodes
      .nodeContent((d: any) => this.getCustomNodeHTML(d))
      .nodeButtonY((node: any) => 10)
      .onNodeClick((d: any) => this.onNodeClick(d))
      .compact(false)
      .expandAll()
      .layout('top')
      .render();
  }

  onNodeClick(d: any): void {
    console.log('Node clicked:', d);

    this.appendChildNode(d);
    let currentChoice = +this.currentChoiceId;
    this.currentChoiceId = +d.id.split('-')[1];
    const element = document.querySelector(
      `[value="${currentChoice}"]`
    ) as HTMLInputElement | null;
    if (element && !element.checked) {
      element.click();
    }
  }
  getCustomNodeHTML(d: any): string {
    return `
      <div class="custom-node w-auto h-auto bg-main text-white" style="word-wrap: break-word;">
        <div>
          <label class="node-header">${d.data.name}</label>
        </div>
      </div>
    `;
  }
  appendChildNode(ClickedNodeID: any): void {
    this.currentChoiceId = ClickedNodeID.id.split('-')[1];
    console.log(ClickedNodeID.id);

    const currentQuestion = this.AllQuestions.find(
      (Question) => Question.id.toString() == ClickedNodeID.id.split('-')[1]
    );

    if (
      this.currentQuestionArrAppended.includes(currentQuestion as IQuestion)
    ) {
      return; // Avoid duplicates
    }

    if (currentQuestion && currentQuestion.choices) {
      this.currentQuestionArrAppended.push(currentQuestion);

      if (currentQuestion.choices.length > 0) {
        const newChoiceId = `${ClickedNodeID.id}-${
          ClickedNodeID.id.split('-')[1]
        }`;
        this.History.add(newChoiceId);

        // Update chart for the main node
        this.updateChart(
          newChoiceId,
          currentQuestion.charts[0].title,
          ClickedNodeID.id,
          true
        );

        // Update chart for child choices
        currentQuestion.choices.forEach((Choice) => {
          const childChoiceId = `${
            currentQuestion.id.toString().split('-')[0]
          }-${Choice.next_question_id}`;
          this.History.add(childChoiceId);

          this.updateChart(childChoiceId, Choice.text, newChoiceId, false);
        });
      } else {
        currentQuestion.charts.forEach((chart) => {
          const chartNodeId = `${ClickedNodeID.id}-${
            ClickedNodeID.id.split('-')[1]
          }-${chart.id}`;
          this.History.add(chartNodeId);

          this.updateChart(chartNodeId, chart.title, ClickedNodeID.id, true);
        });
      }

      this.chart.expandAll();
      console.log(this.History);
    }
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

  onClickPrint() {
    this.chart.exportImg({
      full: true, // Export the full chart
      scale: 3,
      onLoad: (d) => d,
      save: true,
      backgroundColor: '#FFFFFF', // Set a clear background
    });
    this.chart.fullscreen();
  }
  onClickFullScreen() {
    this.chart.fullscreen();
  }
}