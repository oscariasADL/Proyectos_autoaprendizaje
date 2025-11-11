import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { PAYMENTS } from '@commons/constants/navigate.constants';
import {
  FeePayload,
  TransactionCostIds
} from '@commons/entities/fee/fee.interface';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import {
  SOCIAL_SECURITY_AVAILABLE_FIELD,
  SOCIAL_SECURITY_EXIT_DATA,
  SOCIAL_SECURITY_STEPS,
  SocialSecuritySlide
} from '@modules/payments/payment-social-security/constants/social-security.constants';
import { Contributor } from '@modules/payments/payment-social-security/entities/social-security.interface';
import { socialSecurityWorksheetActiveTypeValidators } from '@modules/payments/payment-social-security/helpers/payment-social-security-validators.helpers';
import {
  mapSocialSecurityConfirm,
  mapSocialSecurityVoucher
} from '@modules/payments/payment-social-security/mappers/social-security-confirm.mapper';
import { mapSocialSecurityPayload } from '@modules/payments/payment-social-security/mappers/social-security-payload.mapper';
import { mapSocialSecuritySlides } from '@modules/payments/payment-social-security/mappers/social-security-slides.mapper';
import { PaymentSocialSecurityFacade } from '@modules/payments/payment-social-security/payment-social-security.facade';
import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import {
  GenericStepperAction,
  GenericStepperfeePayload,
  GenericStepperGMFPayload,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import { GMFPayload } from '@app/commons/entities/gmf/gmf.interface';

@Component({
  selector: 'app-payment-social-security',
  templateUrl: './payment-social-security.page.html',
  styleUrls: ['./payment-social-security.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@GenericStepperInit(
  {
    initSlide: SocialSecuritySlide.from.toString(),
    alternativeSlide: SocialSecuritySlide.from.toString()
  },
  {
    backUrl: PAYMENTS,
    steps: SOCIAL_SECURITY_STEPS,
    exitData: SOCIAL_SECURITY_EXIT_DATA,
    data: (component: PaymentSocialSecurityPage) =>
      mapSocialSecuritySlides(component.form),
    confirmMapper: mapSocialSecurityConfirm,
    voucherMapper: mapSocialSecurityVoucher
  },
  {
    step: SocialSecuritySlide.from.toString(),
    field: SOCIAL_SECURITY_AVAILABLE_FIELD
  }
)
export class PaymentSocialSecurityPage
  extends GenericStepperBase
  implements OnInit
{
  constructor(
    protected injector: Injector,
    private facade: PaymentSocialSecurityFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
    this.facade.fetchContributor();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      productOrigin: [null, [Validators.required]],
      contributor: [null, [Validators.required]],
      worksheet: [null, [Validators.required]],
      worksheetActiveType: [
        null,
        [socialSecurityWorksheetActiveTypeValidators.bind(this)]
      ],
      worksheetNumber: [null],
      worksheetDate: [null],
      value: [null, [Validators.required]],
      fee: [null],
      costGmf: [null],
      confirmation: [null]
    });
  }

  @GenericStepperfeePayload
  public feePayload(): FeePayload {
    const product = this.form.get('productOrigin').value;
    return {
      transactionId: TransactionCostIds.PhoneRecharge,
      accountId: product.id,
      accountType: product.type
    };
  }

  @GenericStepperGMFPayload
  public gmfPayload(): GMFPayload {
    const { productOrigin, value } = this.form.value;

    return {
      productNumber: productOrigin.numberProduct,
      productType: productOrigin.type,
      amountTransaction: value.amount,
      availableBalance: productOrigin.availableBalance
    };
  }

  @GenericStepperAction
  public paySocialSecurity(): void {
    if (this.form.valid) {
      this.facade.paySocialSecurity(
        mapSocialSecurityPayload(this.form.value),
        this.alertStepData()
      );
    }
  }

  get contributors$(): Observable<Contributor[]> {
    return this.facade.contributors$;
  }

  get workingContributors$(): Observable<boolean> {
    return this.facade.workingContributors$;
  }

  get socialSecurityOperator$(): Observable<DropdownList[]> {
    return this.facade.parameterByKey(ParameterType.socialSecurityOperator);
  }

  get date$(): Observable<string> {
    return this.facade.date$;
  }
}
