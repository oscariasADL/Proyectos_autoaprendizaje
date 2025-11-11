import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseDashCase'
})
export class ReverseDashCasePipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/-/g, ' ').trim();
  }
}
