import { Injectable } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollService {
  private _infiniteScroll: IonInfiniteScroll;

  get infiniteScroll(): IonInfiniteScroll {
    return this._infiniteScroll;
  }

  set infiniteScroll(infiniteScroll: IonInfiniteScroll) {
    this._infiniteScroll = infiniteScroll;
  }
}
