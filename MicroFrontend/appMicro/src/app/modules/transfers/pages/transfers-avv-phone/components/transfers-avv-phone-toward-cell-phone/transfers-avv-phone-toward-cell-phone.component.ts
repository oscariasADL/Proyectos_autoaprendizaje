import { Component, OnInit } from '@angular/core';
import { TransferBasePhoneTowardCellPhoneComponent } from '@modules/transfers/components/transfer-base-phone-toward-cell-phone/transfer-base-phone-toward-cell-phone.component';

@Component({
  selector: 'app-transfers-avv-phone-toward-cell-phone',
  templateUrl: './transfers-avv-phone-toward-cell-phone.component.html',
  styleUrls: ['./transfers-avv-phone-toward-cell-phone.component.sass']
})
export class TransfersAvvPhoneTowardCellPhoneComponent
  extends TransferBasePhoneTowardCellPhoneComponent
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }
}
