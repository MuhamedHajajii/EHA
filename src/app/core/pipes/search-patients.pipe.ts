import { Pipe, PipeTransform } from '@angular/core';
import { History } from '../interfaces/history/IPatientHistory';

@Pipe({
  name: 'searchPatients',
  standalone: true,
})
export class SearchPatientsPipe implements PipeTransform {
  transform(history: History[], inputText: string): History[] {
    const lowerCaseInput = inputText.toLocaleLowerCase();

    return history.filter((entry) => {
      // Trim and concatenate patient_name and patient_case
      const combinedText =
        `${entry.patient_name.trim()} ${entry.patient_case.trim()}`.toLocaleLowerCase();
      console.log(combinedText);
      console.log(inputText);
      return combinedText.includes(lowerCaseInput);
    });
  }
}
