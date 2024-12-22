import { Pipe, PipeTransform } from '@angular/core';
import { IProtocolsSubCategories } from '../interfaces/protocols/IProtocolsSubCategories';
import { ISubcategory } from './../interfaces/protocols/IProtocolsCategories';

@Pipe({
  name: 'searchProtocols',
  standalone: true,
})
export class SearchProtocolsPipe implements PipeTransform {
  transform(transactions: ISubcategory[], inputText: string): ISubcategory[] {
    return transactions.filter((protocol) =>
      protocol.title.includes(inputText)
    );
  }
}
