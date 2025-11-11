import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HOME } from '@commons/constants/navigate.constants';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { NavController } from '@ionic/angular';
import { HOME_PROMOTION_ALERT } from '@modules/home/constants/home.constants';
import {
  MEDIA_ACTIVATION_PASSWORD_DATA,
  MEDIA_ACTIVATION_PASSWORD_ERROR,
  UTAG_FOR_SECURITY_MEDIA_ACTIVATION
} from '@modules/security/security-media-activation/constants/security-media-activation.constants';
import { mapMediaDataInfo } from '@modules/security/security-media-activation/mappers/security-media-activation.mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ActivationPayloadRequest,
  ActivationProduct,
  MediaActivationData,
  MediaActivationType
} from '../../entities/security-media.interface';
import { SecurityMediaActivationFacade } from '../../security-media-activation.facade';
import {
  ActivateProductSteps,
  OperationType
} from '../../store/security-media.state';
import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { getDate } from '@app/commons/helpers/general.helpers';
import { srcImgFranchiseV2 } from '@app/modules/product/helpers/product.helper';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';

@Component({
  selector: 'app-activate-product',
  templateUrl: './activate-product.component.html',
  styleUrls: ['./activate-product.component.sass']
})
export class ActivateProductComponent implements OnInit, OnDestroy {
  public readonly utagForVoucher: UtagEvent =
    UTAG_FOR_SECURITY_MEDIA_ACTIVATION;

  private creditCardPayload: ActivationPayloadRequest;
  private operationType: OperationType;

  public items: VoucherItem[] = [
    {
      id: 'product',
      label: 'Producto',
      fields: [
        this.product$.currentValue()
          ? `<img alt="icon"
          class="franchise-img"
          src="${srcImgFranchiseV2(
            this.product$.currentValue().cardFranchise
          )}">  ${this.product$.currentValue().name}`
          : '',
        this.product$.currentValue()
          ? `No. ${this.product$.currentValue().cardId}`
          : ''
      ]
    },
    {
      id: 'date-time',
      label: 'VOUCHER.DATE_LABEL',
      fields: [...getDate.bind(this)()]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertService: AlertService,
    private facade: SecurityMediaActivationFacade
  ) {}

  ngOnInit(): void {
    const products: ActivationProduct[] =
      this.facade.productList$.currentValue();
    if (isNullOrUndefined(products)) {
      this.facade.fetchProductsToActivate();
    }
  }

  ngOnDestroy(): void {
    this.facade.activateProductSetStep(ActivateProductSteps.from);
    this.facade.setMediaActivationType(null);
  }

  public nextStep({ step, data }: any): void {
    if (step === ActivateProductSteps.activateProduct) {
      this.facade.activateProduct({
        ...this.creditCardPayload,
        id: this.product$.currentValue().id,
        pin: data,
        operationType: !isNullOrUndefined(this.operationType)
          ? this.operationType
          : OperationType.PC
      });
    } else if (step === ActivateProductSteps.sendBlockProduct) {
      this.facade.blockProduct(this.product$.currentValue().id);
    } else if (step === ActivateProductSteps.sendBlockTemporary) {
      this.facade.temporaryBlockProduct({
        id: this.product$.currentValue().id,
        endDate: data
      });
    } else if (step === ActivateProductSteps.unlockProduct) {
      this.facade.unlockProduct(data);
    } else if (step === ActivateProductSteps.unblockProduct) {
      this.facade.activateProduct({
        id: this.product$.currentValue().id,
        pin: data,
        operationType: !isNullOrUndefined(this.operationType)
          ? this.operationType
          : OperationType.PC
      });
    } else {
      if (data.hasOwnProperty('expirationDate') && data.hasOwnProperty('cvc')) {
        this.operationType = OperationType.ASP;
        const { expirationDate, cvc } = data;
        this.creditCardPayload = {
          id: this.product$.currentValue().id,
          pin: null,
          expirationDate,
          cvc
        };
      }
      this.facade.activateProductSetStep(step);
    }
  }

  public goHome(): void {
    this.navCtrl.navigateRoot(HOME);
  }

  public redirectHomePromotion(): void {
    this.alertService.create(HOME_PROMOTION_ALERT).then((confirm) => {
      if (!!confirm) {
        this.facade.logout();
        this.facade.redirectExternal(LinkKey.linkPromotion);
      }
    });
  }

  get product$(): Observable<ActivationProduct> {
    return this.facade.productDetail$(this.route.snapshot.params.id);
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get passwordData$(): Observable<{ title: string; description: string }> {
    return this.securityMediaType$.pipe(
      map((type: MediaActivationType) => MEDIA_ACTIVATION_PASSWORD_DATA[type])
    );
  }

  get successData$(): Observable<MediaActivationData> {
    return this.securityMediaType$.pipe(
      map((type: MediaActivationType) =>
        mapMediaDataInfo(type, this.product$.currentValue())
      )
    );
  }

  get errorData$(): Observable<string> {
    return this.securityMediaType$.pipe(
      map((type: MediaActivationType) => MEDIA_ACTIVATION_PASSWORD_ERROR[type])
    );
  }

  get currentStep$(): Observable<ActivateProductSteps> {
    return this.facade.currentStep$;
  }

  get securityMediaType$(): Observable<MediaActivationType> {
    return this.facade.securityMediaType$;
  }

  get message$(): Observable<string> {
    return this.facade.securityMediaMessage$;
  }

  get ActivateProductSteps(): typeof ActivateProductSteps {
    return ActivateProductSteps;
  }

  get MediaActivationType(): typeof MediaActivationType {
    return MediaActivationType;
  }
}
