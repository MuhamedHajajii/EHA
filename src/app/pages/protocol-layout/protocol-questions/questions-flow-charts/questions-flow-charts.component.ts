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
  isNewNode: boolean;
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
  currentQuestionArr: IQuestion[] = [];
  private data: INode[] = [];
  chart!: OrgChart<any>;
  isChartRendered = false;
  currentQuestion: IQuestion | null = null;
  currentChoice: IChoice | null = null;
  @Output() actionTriggered = new EventEmitter<any>();
  constructor(private _CurrentQuestionsService: CurrentQuestionsService) {}

  ngOnInit(): void {
    this._CurrentQuestionsService.currentData.subscribe((data) => {
      this.currentQuestionArr = data;
      if (this.currentQuestionArr.length > 0) {
        console.log(data, 'data');
        this.updateChartData();
        this.renderChart();
      }
    });
  }

  updateChartData(): void {
    // Clear existing data to avoid duplicates
    this.data = [];

    // Add root node
    this.data.push({
      id: 'root',
      name: 'WelCome',
      parentId: null,
      collapsed: false,
      isNewNode: false, // Root is not a new node
    });

    // Add questions and choices
    this.currentQuestionArr.forEach((question) => {
      // Add question as a child of the root
      this.data.push({
        id: question.id.toString(),
        name: question?.description || '',
        parentId: 'root',
        collapsed: false,
        isNewNode: true, // Mark as new node
      });

      // Add choices as children of the question
      question.choices?.forEach((choice: IChoice) => {
        this.data.push({
          id: `${question.id}-${choice.id}-${choice.next_question_id}`,
          name: choice.text,
          parentId: question.id.toString(),
          collapsed: false,
          isNewNode: true, // Mark as new node
        });
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
      .nodeWidth((node: any) => 300) // Ensure enough width for long text
      .nodeHeight((node: any) => 100) // Set fixed node height
      .childrenMargin((node: any) => 150) // Space between parent and children
      .siblingsMargin((node: any) => 150) // Space between sibling nodes
      .nodeContent((d: any) => this.getCustomNodeHTML(d))
      .nodeButtonY((node: any) => 100)
      .onNodeClick((d: any) => this.onNodeClick(d))
      .compact(true)
      .expandAll()
      .fit()
      .render();
  }

  onNodeClick(d: any): void {
    console.log('Node clicked:', d);
    if (d.id.includes('-')) {
      let currentQuestion = this.currentQuestionArr.find(
        (e) => e.id == d.id.split('-')[0]
      );
      let currentChoice = +d.id.split('-')[2];

      this.actionTriggered.emit({
        Question: currentQuestion,
        Choice: currentChoice,
      });
    }
    this.updateChartData();
  }
  getCustomNodeHTML(d: any): string {
    return `
      <div class="custom-node w-auto h-auto text-bg-dark" style="word-wrap: break-word;">
        <div>
          <label class="node-header">${d.data.name}</label>
        </div>
      </div>
    `;
  }
}
