import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { AdlSecureStorageService } from '@app/commons/services/adl-secure-storage.service';
import { catchError, from, map, Observable, of } from 'rxjs';

export const EmptyAvalTagGuardParam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const secureStorage = inject(AdlSecureStorageService);

  const avalTag = route.paramMap.get('aval_tag');

  if (!avalTag) {
    return from(secureStorage.get(SecureKeys.tagAval)).pipe(
      catchError((error) => {
        console.error('Error al obtener tagAval:', error);
        return of(null);
      }),
      map((storedTagAval) => {
        const newUrlTree = router.createUrlTree([state.url, storedTagAval]);

        return newUrlTree;
      })
    );
  }

  return of(true);
};
