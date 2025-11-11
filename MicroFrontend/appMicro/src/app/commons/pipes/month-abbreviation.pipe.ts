import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'monthAbbreviation'
})
export class MonthAbbreviationPipe implements PipeTransform {
  transform(date: string): string {
    return format(new Date(date), 'MMM', { locale: es }).toUpperCase();
  }
}
