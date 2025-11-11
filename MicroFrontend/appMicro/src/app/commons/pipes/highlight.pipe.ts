import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (text && search) {
      let pattern = search.replace(/[.*+?^${}()|[\]\\\-]/g, '\\$&');

      pattern = pattern
        .split(' ')
        .filter((t) => t.length > 0)
        .join('|');
      const regex = new RegExp(pattern, 'gi');

      return text.replace(regex, (match) => `<b>${match}</b>`);
    } else {
      return text;
    }
  }
}
