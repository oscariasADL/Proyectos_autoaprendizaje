import { Injectable } from '@angular/core';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';
import { Observable, of } from 'rxjs';

@Injectable()
export class AccountNotRegisterStepFacadeMock extends AppFacadeMock {
  get codeBanks$(): Observable<DropdownList[]> {
    return of([]);
  }
}
