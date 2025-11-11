import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CustomizeAvalTagForm } from '@modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';
import { CustomizeAvalTagFacade } from '@modules/product-options/customize-aval-tag/customize-aval-tag.facade';
import { ProductSpiUserKey } from '@modules/product/entities/product-spi-user-key';
import { getProductType } from '@modules/product/helpers/product.helper';
import {
  customizeAvalTagAccentCharactersPattern,
  customizeAvalTagLengthPattern,
  customizeAvalTagSpecialCharactersPattern
} from '@modules/product-options/customize-aval-tag/helpers/customize-aval-tag.helpers';
import { ModalController } from '@commons/controllers/modal.controller';
import {
  TAG_AVAL_CONTINUE_CUSTOMIZATION_EVENT,
  TAG_AVAL_UPDATE_NAME_CUSTOMIZATION_EVENT,
  TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT_ALT
} from './constants/customize-aval-tag.constants';
import { CustomizeAvalTagModalTermsComponent } from '@modules/product-options/customize-aval-tag/components/customize-aval-tag-modal-terms/customize-aval-tag-modal-terms.component';
import { mapCustomizeAvalTagPayload } from '@modules/product-options/customize-aval-tag/mappers/customize-aval-tag.mapper';
import { TermsAndConditionsKey } from '@commons/entities/parameters/terms-and-conditions.entities';

const ROUTE_PARAM = 'aval_tag';

@Component({
  selector: 'app-customize-aval-tag',
  templateUrl: './customize-aval-tag.page.html',
  styleUrls: ['./customize-aval-tag.page.sass']
})
export class CustomizeAvalTagPage implements OnInit {
  public form: FormGroup<CustomizeAvalTagForm>;
  protected readonly getProductType = getProductType;

  public TAG_AVAL_UPDATE_NAME_CUSTOMIZATION_EVENT =
    TAG_AVAL_UPDATE_NAME_CUSTOMIZATION_EVENT;

  public TAG_AVAL_CONTINUE_CUSTOMIZATION_EVENT =
    TAG_AVAL_CONTINUE_CUSTOMIZATION_EVENT;

  public TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT_ALT =
    TAG_AVAL_CANCEL_CUSTOMIZATION_EVENT_ALT;
  avalTag: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private facade: CustomizeAvalTagFacade
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.avalTag = params.get(ROUTE_PARAM);
      this.initForm();
    });
  }

  public async modifyAvalTagAction(): Promise<void> {
    this.form.markAsDirty();
    if (this.form.valid) {
      this.facade.modifyAvalTag(mapCustomizeAvalTagPayload(this.form.value));
    }
  }

  public async showTermsAndConditions(): Promise<void> {
    const termsAndConditions = this.facade.termsAndConditionsByKey(
      TermsAndConditionsKey.CUSTOMIZE_TAG_AVAL
    );
    const modal = await this.modalCtrl.create({
      id: 'customize-aval-tag-terms-modal',
      component: CustomizeAvalTagModalTermsComponent,
      componentProps: {
        termsAndConditions
      },
      cssClass: 'avv-custom-modal'
    });
    await modal.present();
  }

  public cancelAction(): void {
    void this.navCtrl.pop();
  }

  private initForm(): void {
    const currentSpiUserKey = this.currentSpiUserKey$.currentValue();
    const avalTag = this.avalTag.slice(1);
    this.form = this.formBuilder.group({
      newKeyId: [
        avalTag,
        [
          customizeAvalTagLengthPattern(),
          customizeAvalTagSpecialCharactersPattern(),
          customizeAvalTagAccentCharactersPattern(),
          Validators.required
        ]
      ],
      currentSpiUserKey: [currentSpiUserKey, Validators.required]
    });
  }

  get currentSpiUserKey$(): Observable<ProductSpiUserKey> {
    return this.facade.findSpiUserKeyByKey(this.avalTag);
  }

  get newKeyIdControl(): AbstractControl {
    return this.form.get('newKeyId');
  }
}
