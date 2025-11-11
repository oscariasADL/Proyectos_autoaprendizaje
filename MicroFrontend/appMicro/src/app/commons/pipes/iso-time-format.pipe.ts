import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoTimeFormat'
})
export class IsoTimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');

    return `${hh}:${mm} ${ampm}`;
  }
}
