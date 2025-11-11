import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@commons/controllers/modal.controller';
import { TIME_FOR_STORY } from '../../constants/home.constants';
import { Balance } from '@commons/entities/product/balance.interface';
import { NavController } from '@ionic/angular';
import { ProductsFacade } from '@modules/products/products.facade';

@Component({
  selector: 'app-home-stories-view',
  templateUrl: './home-stories-view.component.html',
  styleUrls: ['./home-stories-view.component.sass']
})
export class HomeStoriesViewComponent implements OnInit, OnDestroy {
  @Input() story: any;

  private timer: any;
  public test: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private productsFacade: ProductsFacade
  ) {}

  ngOnInit(): void {
    this.closeStoryAutomatically();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  public redirectUrl(): void {
    if (this.story.typeProduct !== 0) {
      const products: Balance = this.balances.find(
        (product) => product.typeProduct === this.story.typeProduct
      );
      if (products && products.products.length) {
        this.navCtrl.navigateForward([this.story.redirectUrlWithProducts]);
      } else {
        this.navCtrl.navigateForward([this.story.redirectUrlWithoutProducts]);
      }
    } else {
      if (this.story.productFilter !== -1) {
        this.productsFacade.setProductFilter(this.story.productFilter);
      }
      if (this.story.redirectUrl) {
        this.navCtrl.navigateForward(this.story.redirectUrl);
      } else if (this.story.redirectExternalUrl) {
        this.productsFacade.openExternalLinks(this.story.redirectExternalUrl);
      }
    }
    this.closeModal();
  }

  public closeModal(): void {
    if (!this.test) {
      this.modalCtrl.dismiss();
    }
  }

  private closeStoryAutomatically(): void {
    this.timer = window.setTimeout(() => {
      this.closeModal();
    }, TIME_FOR_STORY);
  }

  get balances(): Balance[] {
    return this.productsFacade.balances$.currentValue();
  }
}
