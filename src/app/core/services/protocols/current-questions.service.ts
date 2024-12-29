import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IQuestion } from '../../interfaces/protocols/ISpecificProtocol';

@Injectable({
  providedIn: 'root',
})
export class CurrentQuestionsService {
  private dataSource = new BehaviorSubject<IQuestion[]>([]); // Initial value (null or empty)
  currentData = this.dataSource.asObservable(); // Observable data

  private QuestionsSource = new BehaviorSubject<IQuestion[]>([]); // Initial value (null or empty)
  currentQuestions = this.QuestionsSource.asObservable();

  constructor() {}

  // Method to update data
  updateData(data: IQuestion[]) {
    this.dataSource.next(data); // Emit the new data
  }

  updateQuestions(data: IQuestion[]) {
    this.QuestionsSource.next(data); // Emit the new data
  }
}
