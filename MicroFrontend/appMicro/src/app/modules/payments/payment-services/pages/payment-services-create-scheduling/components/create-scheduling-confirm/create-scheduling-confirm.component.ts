import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentServicesFacade } from '@modules/payments/payment-services/payment-services.facade';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { map, switchMap } from 'rxjs/operators';
import { mapPaymentServiceCreateSchedulingConfirm } from '@modules/payments/payment-services/pages/payment-services-create-scheduling/mappers/payment-service-create-scheduling-confirm.mapper';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefinedOrEmpty } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-create-scheduling-confirm',
  templateUrl: './create-scheduling-confirm.component.html',
  styleUrls: ['./create-scheduling-confirm.component.sass']
})
export class CreateSchedulingConfirmComponent implements OnInit {
  public summaryCreateScheduling$: Observable<VoucherItem[]> = null;

  constructor(
    private facade: PaymentServicesFacade,
    private navCtrl: NavController,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.summaryCreateScheduling$ = this.facade.billSelected$.pipe(
      switchMap((bill) =>
        this.facade
          .findProductByProductId(bill.productId)
          .pipe(
            map((product) =>
              mapPaymentServiceCreateSchedulingConfirm(bill, product)
            )
          )
      )
    );
  }

  public createScheduling(): void {
    const summaryCreateScheduling =
      this.summaryCreateScheduling$.currentValue();
    if (!this.isEdit) {
      this.facade.createBillScheduling(summaryCreateScheduling);
      return;
    }
    this.facade.editBillScheduling(summaryCreateScheduling);
  }

  public editInfo(): void {
    this.navCtrl.back();
  }

  get isEdit(): boolean {
    const isEdit = this.router.snapshot.queryParamMap.get('edit');
    return !isNullOrUndefinedOrEmpty(isEdit);
  }
}
