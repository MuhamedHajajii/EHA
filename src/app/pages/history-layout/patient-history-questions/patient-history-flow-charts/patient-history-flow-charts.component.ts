import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
import { ISpecificProtocol } from '../../../../core/interfaces/protocols/ISpecificProtocol';
interface INode {
  id: string | number; // Support both strings and numbers
  name: string;
  parentId: string | number | null; // Support both strings and numbers or null
  collapsed: boolean;
  isNewNode: boolean;
  choiceId?: string | number;
}
@Component({
  selector: 'app-patient-history-flow-charts',
  standalone: true,
  imports: [],
  templateUrl: './patient-history-flow-charts.component.html',
  styleUrl: './patient-history-flow-charts.component.scss',
})
export class PatientHistoryFlowChartsComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Output() actionTriggeredB = new EventEmitter<any>();
  @Input() currentQuestionArr: IQuestion[] = [];
  @Input() specificProtocol!: ISpecificProtocol;
  data: INode[] = [];
  chart: OrgChart<any> = new OrgChart();
  isChartRendered = false;
  currentChoiceId!: number;
  clickedChoiceId!: string;
  currentChartsIdPrev: any[] = [];

  ngOnInit(): void {
    this.actionTriggeredB.emit({});
    // this.renderChart();
  }

  startNode(): void {
    console.log(this.specificProtocol, 'Start Node');
    this.data.push({
      id: 'root',
      name: this.specificProtocol.protocol.questions[0].title,
      parentId: null,
      collapsed: false,
      isNewNode: false, // Root is not a new node
    });
    this.specificProtocol.protocol.questions[0].choices.forEach((CHOICE) => {
      this.data.push({
        id: CHOICE.next_question_id.toString(),
        name: CHOICE.text,
        parentId: 'root',
        collapsed: false,
        isNewNode: false, // Root is not a new node
      });
    });
    console.log(this.currentQuestionArr);
    setTimeout(() => {
      console.log(
        this.specificProtocol.protocol.questions[0].id,
        'this.specificProtocol.protocol.questions[0].id'
      );
      this.currentQuestionArr.forEach((question, i) => {
        if (question.id != this.specificProtocol.protocol.questions[0].id) {
          this.onNodeClick({ id: question.id });
        }
      });
    }, 500);
  }

  renderChart(): void {
    if (!this.isChartRendered) {
      // this.startNode();
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
    // let currentChoice = +this.currentChoiceId;
    // this.currentChoiceId = +d.id;
    // const element = document.querySelector(
    //   `[value="${currentChoice}"]`
    // ) as HTMLInputElement | null;
    // if (element && !element.checked) {
    //   element.click();
    // }
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
    // console.log(ClickedNodeID);
    if (!this.currentQuestionArr.includes(currentQuestion as IQuestion)) {
      return;
    }

    if (currentQuestion && currentQuestion.choices) {
      document.getElementById('copy')?.classList.add('d-none');
      if (currentQuestion.choices.length > 0) {
        let currentParent = currentQuestion.charts[0].id.toString();
        this.updateChart(
          currentParent,
          currentQuestion.charts[0].title,
          ClickedNodeID.id.toString(),
          true
        );

        currentQuestion.choices.forEach((Choice: IChoice) => {
          // console.log(currentQuestion.id.toString());
          const childChoiceId = ClickedNodeID.id;
          this.updateChart(
            Choice.next_question_id.toString(),
            Choice.text,
            currentParent,
            false
          );
        });
      } else {
        document.getElementById('copy')?.classList.remove('d-none');
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
      }
    }
    this.chart.expandAll();
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
      this.chart.fit().render();
    }
  }
}
