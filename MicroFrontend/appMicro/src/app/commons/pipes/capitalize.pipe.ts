import { Pipe, PipeTransform } from '@angular/core';
import { capitalize, capitalizeAll } from '../helpers/text.helpers';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, all: boolean = false): string {
    return all ? capitalizeAll(value) : capitalize(value);
  }
}
