import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppPreloadStrategy implements PreloadingStrategy {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
