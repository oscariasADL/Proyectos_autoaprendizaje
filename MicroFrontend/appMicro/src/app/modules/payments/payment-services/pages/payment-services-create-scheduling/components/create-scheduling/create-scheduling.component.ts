import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { Product } from '@commons/entities/product/product.interface';
import { paymentServicesCreateSchedulingValidators } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/helpers/payment-services-create-scheduling.helpers';
import { PaymentBill } from '@modules/payments/payment-services/entities/payment-services.interface';
import { mapPaymentServiceCreateSchedulingPayload } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/mappers/payment-service-create-scheduling-payload.mapper';
import { SERVICES_SCHEDULING_CONFIRM } from '@commons/constants/navigate.constants';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';
import { SCHEDULE_TYPES_OPTIONS } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/constants/payment-services-create-scheduling.constants';

@Component({
  selector: 'app-create-scheduling',
  templateUrl: './create-scheduling.component.html',
  styleUrls: ['./create-scheduling.component.sass']
})
export class CreateSchedulingComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private router: ActivatedRoute,
    private facade: PaymentServicesFacade
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.isEdit) {
      const bill = this.facade.billSelected$.currentValue() as PaymentBill;
      const product = this.facade
        .findProductByProductId(bill?.productId)
        .currentValue();
      this.form.setValue({
        productId: product,
        scheduleType: bill.scheduleType,
        maxAmountRecurring: bill.maxAmountRecurring
      });
    }
  }

  public async continue(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const billSelected = this.facade.billSelected$.currentValue();
      const bill: PaymentBill = {
        ...billSelected,
        productId: this.productId.value.id,
        scheduleType: this.scheduleType.value,
        maxAmountRecurring: this.maxAmountRecurring.currencyValue()
      };
      this.facade.setBillSchedulingPayload(
        mapPaymentServiceCreateSchedulingPayload(this.form.value, bill)
      );
      this.facade.setBill(bill);
      await this.navCtrl.navigateForward(SERVICES_SCHEDULING_CONFIRM, {
        ...(this.isEdit
          ? {
              queryParams: {
                edit: true
              }
            }
          : {})
      });
    }
  }

  public selectProduct(product: Product): void {
    this.productId.setValue(product);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      productId: new FormControl<Product | null>(null, [Validators.required]),
      scheduleType: new FormControl<string | null>('1', [Validators.required]),
      maxAmountRecurring: new FormControl<number | null>(null, [
        Validators.required,
        paymentServicesCreateSchedulingValidators.bind(this)
      ])
    });
  }

  get scheduleTypesOptions(): typeof SCHEDULE_TYPES_OPTIONS {
    return SCHEDULE_TYPES_OPTIONS;
  }

  get productId(): AbstractControl<Product> {
    return this.form.get('productId');
  }

  get scheduleType(): AbstractControl<string> {
    return this.form.get('scheduleType');
  }

  get maxAmountRecurring(): AbstractControl<number> {
    return this.form.get('maxAmountRecurring');
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
  }

  get isEdit(): boolean {
    return !isNullOrUndefinedOrEmpty(
      this.router.snapshot.queryParamMap.get('edit')
    );
  }
}
