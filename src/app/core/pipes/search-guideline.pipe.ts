import { Pipe, PipeTransform } from '@angular/core';
import { IArticle, IGuideline } from '../interfaces/guideline/IGuideline';

@Pipe({
  name: 'searchGuideline',
  standalone: true,
})
export class SearchGuidelinePipe implements PipeTransform {
  transform(transactions: IArticle[], inputText: string): IArticle[] {
    return transactions.filter((Articles) =>
      Articles.article_title
        .toLocaleLowerCase()
        .includes(inputText.toLocaleLowerCase())
    );
  }
}
