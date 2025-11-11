import { Pipe, PipeTransform } from '@angular/core';
import { environment as ENV } from '@environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  private baseImg: string = ENV.resources.base_img;

  transform(value: string, isImageSourceOnline?: boolean): string {
    const baseUrl = isImageSourceOnline
      ? ENV.resources.baseAssetsUrl
      : this.baseImg;

    return `${baseUrl}${value}`;
  }
}
