import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@commons/services/translate.service';
import {
  TranslatePipe as TranslatePipeSource,
  TranslateService as TranslateServiceSource
} from '@ngx-translate/core';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe
  extends TranslatePipeSource
  implements PipeTransform
{
  constructor(
    _ref: ChangeDetectorRef,
    _translate: TranslateServiceSource,
    private service: TranslateService
  ) {
    super(_translate, _ref);
  }

  transform(value: string, ...args: any[]): any {
    return super.transform(value, Object.assign(this.service.bounds, ...args));
  }
}
