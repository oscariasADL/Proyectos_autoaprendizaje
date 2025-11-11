import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';

@Injectable()
export class TelephoneCompaniesStepFacade extends AppFacade {
  get mobileOperators$(): Observable<DropdownList[]> {
    return this.parameterByKey(ParameterType.mobileOperator);
  }
}
