import { Pipe, PipeTransform } from '@angular/core';
import { IProtocol } from '../interfaces/protocols/IProtocolsSubCategories';

@Pipe({
  name: 'searchSupProtocols',
  standalone: true,
})
export class SearchSupProtocolsPipe implements PipeTransform {
  transform(transactions: IProtocol[], inputText: string): IProtocol[] {
    return transactions.filter((protocol) =>
      protocol.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())
    );
  }
}
