import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { TransfersContactsFacade } from '@modules/transfers/pages/transfers-contacts/transfers-contacts.facade';

@Injectable()
export class TransfersContactsGuard implements CanActivate {
  constructor(private facade: TransfersContactsFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // this.facade.setProductFilter(parseInt(route.params.filter, 10));
    return true;
  }
}
