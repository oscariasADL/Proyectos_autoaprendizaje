import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { valueToNumberFormat } from '@commons/helpers/text.helpers';
import { AvalFacade } from '@modules/aval/aval.facade';
import { TuplusProduct } from '@modules/aval/entities/tuplus.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tu-plus',
  templateUrl: './tu-plus.component.html',
  styleUrls: ['./tu-plus.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TuPlusComponent {
  constructor(private facade: AvalFacade) {}

  public redirectTuplus(): void {
    this.facade.redirectExternal(LinkKey.linkTuPlus);
  }

  public convertValue(value: any): string {
    return valueToNumberFormat(value);
  }

  get tuplus$(): Observable<TuplusProduct> {
    return this.facade.tuplus$;
  }

  get tuplusWorking$(): Observable<boolean> {
    return this.facade.tuplusWorking$;
  }
}
