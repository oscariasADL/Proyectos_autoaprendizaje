import { Pipe, PipeTransform } from '@angular/core';
import { environment as ENV } from '@environment';

@Pipe({
  name: 'imageUrlAlt'
})
export class ImageUrlAltPipe implements PipeTransform {
  private domainBase: string = ENV.resources.base;

  transform(value: string): string {
    return this.domainBase + value;
  }
}
