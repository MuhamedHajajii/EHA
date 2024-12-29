import { Pipe, PipeTransform } from '@angular/core';
import { IArticle, IGuideline } from '../interfaces/guideline/IGuideline';
import { History, IUserHistory } from '../interfaces/history/IUserHistory';

@Pipe({
  name: 'searchProtocolsHistory',
  standalone: true,
})
export class searchProtocolsHistoryPipe implements PipeTransform {
  transform(transactions: History[], inputText: string): History[] {
    return transactions.filter((protocol) =>
      protocol.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())
    );
  }
}
