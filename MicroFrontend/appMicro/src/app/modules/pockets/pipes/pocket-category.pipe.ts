import { Pipe, PipeTransform } from '@angular/core';
import {
  POCKET_CATEGORY_ICON,
  POCKET_CATEGORY_NAME,
  PocketCategory,
  PocketCategoryData
} from '../entities/pockets.interface';

@Pipe({
  name: 'pocketCategory',
  standalone: true
})
export class PocketCategoryPipe implements PipeTransform {
  transform(category: number): PocketCategoryData {
    const icon =
      POCKET_CATEGORY_ICON[category] ||
      POCKET_CATEGORY_ICON[PocketCategory.OTHER_EXPENSES];
    const name =
      POCKET_CATEGORY_NAME[category] ||
      POCKET_CATEGORY_NAME[PocketCategory.OTHER_EXPENSES];

    return { icon, name };
  }
}
