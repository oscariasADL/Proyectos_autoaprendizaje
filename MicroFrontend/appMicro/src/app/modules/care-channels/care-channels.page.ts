import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue, isNullOrUndefined } from '@commons/helpers/text.helpers';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { Observable, Subscription } from 'rxjs';
import { CareChannelsFacade } from './care-channels.facade';
import {
  CARE_CHANNELS_BENEFITS_ALERT,
  CARE_CHANNELS_PHONE_NUMBERS_LIST,
  OPEN_BENEFITS_URL,
  OPEN_MAP_EXTERNAL_URL_ALERT,
  OPEN_MAP_URL_SEARCHER_ATH,
  URL_CUSTOMER
} from './constants/care-channels.constants';
import { Adviser } from './entities/adviser.interface';
import { ParameterType } from '@store/state/parameter.state';

@Component({
  selector: 'app-care-channels',
  templateUrl: './care-channels.page.html',
  styleUrls: ['./care-channels.page.sass']
})
export class CareChannelsPage implements OnInit, OnDestroy {
  public emailParts: string[] = [];
  public phoneNumbersList: any[] = CARE_CHANNELS_PHONE_NUMBERS_LIST;
  public urlAth: string = OPEN_MAP_URL_SEARCHER_ATH;
  public customerURL: string = URL_CUSTOMER;
  public benefitsUrl: string = OPEN_BENEFITS_URL;
  public isGuest: boolean = true;
  public subscription: Subscription;
  public adviser: Adviser = null;

  constructor(
    private secureStorage: AdlSecureStorageService,
    private facade: CareChannelsFacade
  ) {}

  ngOnInit(): void {
    this.secureStorage
      .getAll()
      .then(
        (db) =>
          !isNullOrUndefined(db) &&
          isNullOrUndefined(getDBValue(db, SecureKeys.token))
      )
      .then((isGuest) => {
        this.isGuest = isGuest;
        if (!isGuest) {
          this.facade.fetchAdviser();
        }
      });

    this.subscription = this.adviser$.subscribe((data) => {
      this.adviser = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getEmailUsername(email: string): string {
    return email.split('@')[0];
  }

  public getEmailDomain(email: string): string {
    return email.split('@')[1];
  }

  public openUrl(url: string) {
    this.facade.openExternalLinks(url);
  }

  public openMapUrl(url: string) {
    this.facade.openExternalLinks(url, '_blank', OPEN_MAP_EXTERNAL_URL_ALERT);
  }

  public openBenefitsUrl(url: string) {
    this.facade.openExternalLinks(url, '_blank', CARE_CHANNELS_BENEFITS_ALERT);
  }

  public mapPhoneNumber(num: string): string {
    const arg = num.split(' ');
    if (arg.length === 2) {
      const [indicative, number] = arg;
      return indicative.replace('(', '').replace(')', '') + number;
    }
    return num.replace(/\s/g, '');
  }

  get adviser$(): Observable<Adviser> {
    return this.facade.adviser$;
  }

  get working$(): Observable<boolean> {
    return this.facade.working$;
  }

  get financialConsumerAdvocate(): any {
    const parameters = this.facade
      .parameterByKey(ParameterType.financialConsumerAdvocate)
      .currentValue();
    if (parameters.length) {
      const fcaValues = {};
      parameters.map((item) => {
        fcaValues[item.value] = item.label;
      });
      return fcaValues;
    }
    return null;
  }
}
