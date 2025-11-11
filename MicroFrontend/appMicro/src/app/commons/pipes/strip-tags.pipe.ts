import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripTags'
})
export class StripTagsPipe implements PipeTransform {
  transform(value: string | null): string {
    return !value ? '' : value.replace(/<[^<>]*?>/g, '');
  }
}
