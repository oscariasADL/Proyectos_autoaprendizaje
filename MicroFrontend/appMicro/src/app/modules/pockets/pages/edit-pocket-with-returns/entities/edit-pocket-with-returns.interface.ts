import { FormControl } from '@angular/forms';
import { PocketWithReturns } from '@app/modules/pockets/entities/pockets.interface';

export interface EditPocketWithReturnsForm {
  name: FormControl<string>;
  quota: FormControl<number>;
  goal: FormControl<string>;
  category: FormControl<any>;
  period: FormControl<any>;
  pocket: FormControl<PocketWithReturns>;
}

export interface EditPocketWithReturns {
  name: string;
  quota: number;
  goal: string;
  category: any;
  period: any;
  pocket: PocketWithReturns;
}
