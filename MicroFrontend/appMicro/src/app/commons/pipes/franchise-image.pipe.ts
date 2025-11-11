import { Pipe, PipeTransform } from '@angular/core';
import { FRANCHISE_ICONS, FRANCHISE_IMAGES } from '../constants/card.constants';
import { ImageUrlPipe } from './image-url.pipe';

@Pipe({
  name: 'franchiseImage'
})
export class FranchiseImagePipe extends ImageUrlPipe implements PipeTransform {
  transform(type: string, icon: boolean = false): string {
    if (!type) return '';

    return icon
      ? super.transform(FRANCHISE_ICONS[type])
      : super.transform(FRANCHISE_IMAGES[type]);
  }
}
