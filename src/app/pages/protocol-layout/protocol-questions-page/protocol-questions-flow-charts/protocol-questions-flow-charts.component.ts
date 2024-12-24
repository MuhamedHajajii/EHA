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
interface INode {
  id: string | number; // Support both strings and numbers
  name: string;
  parentId: string | number | null; // Support both strings and numbers or null
  collapsed: boolean;
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
  currentQuestionArr: IQuestion[] = []; // Current Displayed Questions
  AllQuestions!: IQuestion[]; // Receive The Whole Questions
  chart!: OrgChart<any>; // Start The Chart
  private data: INode[] = []; // Chart Data
  currentChoiceId!: number;
  isChartRendered = false;
  @Output() actionTriggered = new EventEmitter<any>();
  constructor(private _CurrentQuestionsService: CurrentQuestionsService) {}

  ngOnInit(): void {
    this._CurrentQuestionsService.currentQuestions.subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.AllQuestions = response;
          console.log(response);
          this.startTheFirstChartQuestion();
          this.updateChartData();
          this.renderChart();
        }
      },
    });
    this._CurrentQuestionsService.currentData.subscribe((data) => {
      this.currentQuestionArr = data;
    });
  }

  updateChartData(): void {}

  startTheFirstChartQuestion() {
    this.data = []; // Reset the data to avoid multiple roots being added

    // Add the root node explicitly
    this.data.push({
      id: 'root', // Ensure this is the only root node
      name: this.AllQuestions[0].charts[0].title,
      parentId: null, // This is the only root node
      collapsed: false,
    });

    // Add choices to the root node
    this.AllQuestions[0].choices.forEach((choice) => {
      this.data.push({
        id: choice.id,
        name: choice.text,
        parentId: 'root', // Link to the root node
        collapsed: false,
      });
    });
  }

  renderChart(): void {
    if (!this.isChartRendered) {
      this.chart = new OrgChart();
      this.isChartRendered = true;
    }
    // Render the chart with the updated data
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth((node: any) => 200) // Ensure enough width for long text
      .nodeHeight((node: any) => 100) // Set fixed node height
      .childrenMargin((node: any) => 150) // Space between parent and children
      .siblingsMargin((node: any) => 150) // Space between sibling nodes
      .nodeContent((d: any) => this.getCustomNodeHTML(d))
      .nodeButtonY((node: any) => 100)
      .onNodeClick((d: any) => this.onNodeClick(d))
      .compact(false)
      .expandAll()
      .render();
  }

  onNodeClick(d: any): void {
    console.log('Node clicked:', d);
    if (d.id.includes('-')) {
      let currentQuestion = this.currentQuestionArr.find(
        (e) => e.id == d.id.split('-')[0]
      );
      let currentChoice = +d.id.split('-')[2];
      this.currentChoiceId = +d.id.split('-')[1];
      const element = document.querySelector(
        `[value="${currentChoice}"]`
      ) as HTMLInputElement | null;
      if (element && !element.checked) {
        element.click();
      }

      this.actionTriggered.emit({
        Question: currentQuestion,
        Choice: currentChoice,
      });
    }
  }
  getCustomNodeHTML(d: any): string {
    return `
      <div class="custom-node w-auto h-auto text-white bg-main" style="word-wrap: break-word;">
        <div>
          <label class="node-header">${d.data.name}</label>
        </div>
      </div>
    `;
  }
}
