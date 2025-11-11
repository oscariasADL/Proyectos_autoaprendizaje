import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProductType } from '@app/modules/product/helpers/product.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSpiUserKey } from '@app/modules/product/entities/product-spi-user-key';

import {
  RandomKeyResponse,
  RandomKeyPayload,
  CustomizeAvalTagFormValue
} from '../../entities/customize-aval-tag.interface';
import { getRandomKeyAction } from '../../store/customize-aval-tag.actions';
import {
  selectRandomKey,
  selectLoading,
  selectError
} from '../../store/customize-aval-tag.selectors';
import { mapCustomizeAvalTagPayload } from '../../mappers/customize-aval-tag.mapper';
import { CustomizeAvalTagFacade } from '../../customize-aval-tag.facade';

@Component({
  selector: 'app-customize-aval-tag-select',
  templateUrl: './customize-aval-tag-select.component.html',
  styleUrls: ['./customize-aval-tag-select.component.sass']
})
export class CustomizeAvalTagSelectComponent implements OnInit {
  account: ProductSpiUserKey | null = null;
  paramkey = '';
  selectedOption: any = null;

  userCard = {
    id: 1,
    title: '',
    subtitle: 'CUSTOMIZE_AVAL_TAG.EDIT_SELECT.USER_SELECTED_TAG',
    value: '',
    tag: 'CUSTOMIZE_AVAL_TAG.EDIT_SELECT.HINT'
  };

  randomKeyData$: Observable<RandomKeyResponse | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  protected readonly getProductType = getProductType;

  constructor(
    private router: Router,
    private store: Store,
    private facade: CustomizeAvalTagFacade,
    private activatedRoute: ActivatedRoute
  ) {
    this.randomKeyData$ = this.store.select(selectRandomKey);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.initializeComponent();
    this.loadRandomKey();
  }

  private initializeComponent(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.paramkey = params.get('aval_tag');
    });

    const navigation = this.router.getCurrentNavigation();
    this.account = navigation?.extras.state?.['account'];
    this.userCard = {
      ...this.userCard,
      title: navigation?.extras.state?.['new_key']?.toUpperCase(),
      value: navigation?.extras.state?.['new_key']?.toUpperCase()
    };
  }

  private loadRandomKey(): void {
    if (this.account) {
      const { accountType, accountId } = this.account;
      const payload: RandomKeyPayload = {
        accountType,
        accountId
      };

      this.store.dispatch(getRandomKeyAction({ payload }));
    }
  }

  public onRadioChange(value: any): void {
    this.selectedOption = value;
  }
  public confirmForm() {
    const form: CustomizeAvalTagFormValue = {
      currentSpiUserKey: { ...this.account },
      newKeyId:
        this.selectedOption[0] === '@'
          ? this.selectedOption.slice(1)
          : this.selectedOption
    };

    this.facade.modifyAvalTag(mapCustomizeAvalTagPayload(form));
  }
}
