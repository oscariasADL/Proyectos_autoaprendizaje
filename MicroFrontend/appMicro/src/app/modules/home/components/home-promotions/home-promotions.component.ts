import { Component, OnInit } from '@angular/core';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { AlertService } from '@commons/services/alert.service';
import { HOME_PROMOTION_ALERT } from '@modules/home/constants/home.constants';
import { HomeFacade } from '@modules/home/home.facade';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.sass']
})
export class HomePromotionsComponent implements OnInit {
  public activeImg: string;
  private readonly promotions: string[] = [
    'home-promotions/home-promotion-1.jpg',
    'home-promotions/home-promotion-2.jpg',
    'home-promotions/home-promotion-3.jpg'
  ];

  constructor(private facade: HomeFacade, private alertService: AlertService) {}

  ngOnInit(): void {
    this.activeImg = this.promotions[this.getRandomImageIndex()];
  }

  public redirectLink(): void {
    this.alertService.create(HOME_PROMOTION_ALERT).then((confirm) => {
      if (!!confirm) {
        this.facade.logout();
        this.facade.redirectExternal(LinkKey.linkPromotion);
      }
    });
  }

  private getRandomImageIndex(): number {
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] % this.promotions.length;
    }
    return 0;
  }
}
