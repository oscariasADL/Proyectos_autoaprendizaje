import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Animation, createAnimation } from '@ionic/core';
import { ProductFacade } from '@modules/product/product.facade';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

@Pipe({
  name: 'hiddenFormat'
})
export class HiddenFormatPipe implements PipeTransform {
  constructor(private facade: ProductFacade, private el: ElementRef) {}

  transform(value: string): Observable<any> {
    return this.facade.workingHiddenBalance$.pipe(
      withLatestFrom(this.facade.hiddenBalance$),
      map(([working, hiddenBalance]) => {
        if (working) {
          this.animate();
        }
        return !isNullOrUndefined(value) && hiddenBalance
          ? value.includes('$')
            ? '$ ***'
            : '***'
          : value;
      })
    );
  }

  public animate(): void {
    const animation: Animation = createAnimation('')
      .addElement(this.el.nativeElement)
      .duration(600)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 0.5, opacity: '0.5' },
        { offset: 1, opacity: '1' }
      ]);
    animation.play();
  }
}
