import { Pipe, PipeTransform } from '@angular/core';
import { IArticle, IGuideline } from '../interfaces/guideline/IGuideline';
import { History } from '../interfaces/history/IHistory';
import { Bookmark } from '../interfaces/history/IBookMarkHistory';

@Pipe({
  name: 'searchProtocolsHistoryBookMark',
  standalone: true,
})
export class searchProtocolsHistoryBookMarkPipe implements PipeTransform {
  transform(transactions: Bookmark[], inputText: string): Bookmark[] {
    return transactions.filter((history) =>
      history.protocolscopes.title
        .toLocaleLowerCase()
        .includes(inputText.toLocaleLowerCase())
    );
  }
}
