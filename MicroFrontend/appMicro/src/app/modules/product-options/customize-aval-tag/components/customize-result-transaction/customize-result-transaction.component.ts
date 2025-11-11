import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizeAvalTagResponse } from '../../entities/customize-aval-tag.interface';
import { Observable } from 'rxjs';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { AppFacade } from '@app/app.facade';
import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { customizeResultMapper } from './customize-result.transaction.mapper';

@Component({
  selector: 'app-customize-result-transaction',
  templateUrl: './customize-result-transaction.component.html',
  styleUrls: ['./customize-result-transaction.component.sass']
})
export default class CustomizeResultTransactionComponent implements OnInit {
  constructor(private router: Router, private facade: AppFacade) {}
  serviceResponse: CustomizeAvalTagResponse;
  voucherItems: VoucherItem[];
  public readonly utag: UtagEvent = {
    track: 'link',
    tealium_event: 'click',
    event_category: 'modificar llave',
    event_label: 'modificar llave - confirmar'
  };
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.serviceResponse = navigation.extras.state['response'];
      const userData = this.facade.userData$.currentValue();
      const ip = userData.dataBasicClientDto.ip;
      this.voucherItems = customizeResultMapper(
        navigation.extras.state['response'],
        ip
      );
    }
  }
}
