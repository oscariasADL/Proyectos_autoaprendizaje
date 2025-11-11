import { Component, OnInit } from '@angular/core';
import { TransferBasePhoneTowardCellPhoneComponent } from '@modules/transfers/components/transfer-base-phone-toward-cell-phone/transfer-base-phone-toward-cell-phone.component';

@Component({
  selector: 'app-transfers-send-money-toward-cell-phone',
  templateUrl: './transfers-send-money-toward-cell-phone.component.html',
  styleUrls: ['./transfers-send-money-toward-cell-phone.component.sass']
})
export class TransfersSendMoneyTowardCellPhoneComponent
  extends TransferBasePhoneTowardCellPhoneComponent
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }
}
