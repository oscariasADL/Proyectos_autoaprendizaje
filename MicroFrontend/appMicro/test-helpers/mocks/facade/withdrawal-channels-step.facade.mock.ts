import { Injectable } from '@angular/core';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppFacadeMock } from './app.facade.mock';

@Injectable()
export class WithdrawalChannelsStepFacadeMock extends AppFacadeMock {
  withdrawalChannels$: Observable<DropdownList[]> = new BehaviorSubject([]);
}
