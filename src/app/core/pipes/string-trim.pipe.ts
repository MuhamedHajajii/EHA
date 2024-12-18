import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringTrim',
  standalone: true,
})
export class StringTrimPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    return value.slice(0, limit) + '...';
  }
}
