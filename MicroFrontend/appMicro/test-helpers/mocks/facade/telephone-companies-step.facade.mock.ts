import { Injectable } from '@angular/core';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TelephoneCompaniesStepFacadeMock extends AppFacadeMock {
  get mobileOperators$(): Observable<DropdownList[]> {
    return new BehaviorSubject([]);
  }
}
