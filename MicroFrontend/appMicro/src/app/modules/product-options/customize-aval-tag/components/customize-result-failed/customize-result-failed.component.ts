import { Component, OnInit } from '@angular/core';
import { VoucherItem } from '@app/commons/components/voucher/entities/voucher.entities';
import { CustomizeAvalTagPayload } from '../../entities/customize-aval-tag.interface';
import { Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import { customizeResulFailedtMapper } from './customize-result-failed.mapper';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { CustomizeAvalTagFacade } from '../../customize-aval-tag.facade';

@Component({
  selector: 'app-customize-result-failed',
  templateUrl: './customize-result-failed.component.html',
  styleUrls: ['./customize-result-failed.component.sass']
})
export class CustomizeResultFailedComponent implements OnInit {
  error: CustomizeAvalTagPayload;

  voucherItems: VoucherItem[];
  constructor(private router: Router, private facade: CustomizeAvalTagFacade) {}
  public readonly utag: UtagEvent = {
    track: 'link',
    tealium_event: 'click',
    event_category: 'modificar llave',
    event_label: 'modificar llave - fallido'
  };
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.error = navigation.extras.state['payload'];
      const userData = this.facade.userData$.currentValue();
      const ip = userData.dataBasicClientDto.ip;
      this.voucherItems = customizeResulFailedtMapper(
        navigation.extras.state['payload'],
        ip
      );
    }
  }
  public retry() {
    this.facade.modifyAvalTag(this.error);
  }
}
