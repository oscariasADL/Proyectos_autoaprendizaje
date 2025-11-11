import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { SLIDE_OPTIONS_FLIP } from '@commons/constants/ion-slide.constants';
import { normalize, replaceWhiteSpaces } from '@commons/helpers/text.helpers';
import { format, lastDayOfMonth } from 'date-fns';
import { creditcardFaceType } from '../../constants/security-media-activation.constants';
import {
  ActivationProduct,
  CardCoverType,
  ProductTypeActivation
} from '../../entities/security-media.interface';
import {
  cvcValidations,
  expirationValidations
} from '../../helpers/security-media-activation.helpers';
import {
  ActivateProductSteps,
  MediaStepsData
} from '../../store/security-media.state';
import Swiper from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-activate-product-from',
  templateUrl: './activate-product-from.component.html',
  styleUrls: ['./activate-product-from.component.sass']
})
export class ActivateProductFromComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperComponent: SwiperComponent;
  swiper: Swiper;
  @Input() product: ActivationProduct;

  @Output()
  continue: EventEmitter<MediaStepsData> = new EventEmitter<MediaStepsData>();

  public form: UntypedFormGroup;
  public face: string = '';
  public isCVC: boolean = false;

  public slideOpts: any = SLIDE_OPTIONS_FLIP;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    if (this.swiperComponent) {
      this.swiper = this.swiperComponent.swiperRef;
    }
  }

  public activateProduct(): void {
    if (this.form.valid) {
      let data = {};
      if (this.isCreditCardOrMasterDebit && !this.isDigitalCoverType()) {
        const { expiration, cvc } = this.form.value;
        const month = expiration.substr(0, 2);
        const year = `20${expiration.substr(3, 2)}`;
        const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 10);
        data = {
          expirationDate: format(lastDayOfMonth(date), 'yyyy-MM-dd'),
          cvc
        };
      }
      this.continue.emit({
        step: ActivateProductSteps.password,
        data
      });
    }
  }

  public getCromalite(
    product: ActivationProduct,
    face: creditcardFaceType = ''
  ): string {
    if (!!product.cardFranchise) {
      return `cromalites/${product.cardFranchise.toLowerCase()}-${replaceWhiteSpaces(
        normalize(product.cardType.toLowerCase())
      )}${face}.png`;
    }
    return 'cromalites/maestro-debit.png';
  }

  public setFace(type: creditcardFaceType, swiper: SwiperComponent): void {
    if (type === '-cvc') {
      swiper.swiperRef.slideTo(1, 500);
    } else {
      swiper.swiperRef.slideTo(0, 500);
    }
    this.face = type;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      expiration: [
        null,
        this.isCreditCardOrMasterDebit && !this.isDigitalCoverType()
          ? [Validators.required, expirationValidations.bind(this)]
          : []
      ],
      cvc: [
        null,
        this.isCreditCardOrMasterDebit && !this.isDigitalCoverType()
          ? [Validators.required, cvcValidations.bind(this)]
          : []
      ]
    });
  }

  public isDigitalCoverType(): boolean {
    return this.product && this.product.cardCover === CardCoverType.Digital;
  }

  get cvc(): AbstractControl {
    return this.form.get('cvc');
  }

  get expiration(): AbstractControl {
    return this.form.get('expiration');
  }

  get isCreditCardOrMasterDebit(): boolean {
    const activationType = ProductTypeActivation[this.product?.activationType];
    return (
      activationType === ProductTypeActivation.R ||
      activationType === ProductTypeActivation.V ||
      activationType === ProductTypeActivation.T
    );
  }

  get hasImg(): boolean {
    return (
      this.product.cardType.toLowerCase() !== 'desconocida' &&
      this.product.cardFranchise.toLowerCase() !== 'unknown'
    );
  }
}
