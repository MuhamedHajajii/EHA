import { Pipe, PipeTransform } from '@angular/core';
import { IArticle, IGuideline } from '../interfaces/guideline/IGuideline';
import { Bookmark } from '../interfaces/history/IGuideLineHistory';

@Pipe({
  name: 'searchGuidelineHistory',
  standalone: true,
})
export class SearchGuidelineHistoryPipe implements PipeTransform {
  transform(transactions: Bookmark[], inputText: string): Bookmark[] {
    return transactions.filter((BookMark) =>
      BookMark.guide_line.article_title
        .toLocaleLowerCase()
        .includes(inputText.toLocaleLowerCase())
    );
  }
}
