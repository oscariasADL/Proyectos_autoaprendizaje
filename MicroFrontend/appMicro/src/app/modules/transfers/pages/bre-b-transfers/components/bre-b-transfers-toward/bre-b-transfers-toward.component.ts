import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { filter, Subscription, withLatestFrom } from 'rxjs';

import { BreBTransfersForm } from '../../entities/bre-b-transfers.interface';
import { BreBTransfersFacade } from '../../bre-b-transfers.facade';
import { transfersAvalKeyValidator } from '../../../transfers-aval-key/helpers/transfer-aval-key.helper';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import {
  CONTINUE_BUTTON_UTAG_EVENT,
  TAG_AVAL_OR_KEY_UTAG_EVENT
} from '../../constants/bre-b-transfers.constants';

import { removeSubscriptions } from '@app/commons/utils/util';
import { TowardAccount } from '../../entities/bre-b-transfers.interface';
import { SPI_MF } from '@commons/constants/navigate.constants';
import { mapTargetAccountFromSpiUserKey } from '@modules/transfers/pages/bre-b-transfers/mappers/bre-b-transfer.mapper';
import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';

@Component({
  selector: 'app-bre-b-transfers-toward',
  templateUrl: './bre-b-transfers-toward.component.html',
  styleUrls: ['./bre-b-transfers-toward.component.sass']
})
export class BreBTransfersTowardComponent implements OnDestroy, AfterViewInit {
  @Input() form: FormGroup<BreBTransfersForm>;
  @Output() continue: EventEmitter<void> = new EventEmitter<void>();

  public tagAvalOtKeyUtagEvent: UtagEvent = TAG_AVAL_OR_KEY_UTAG_EVENT;
  public continueButtonUtagEvent: UtagEvent = CONTINUE_BUTTON_UTAG_EVENT;
  public readonly featureFlagsKey = FeatureFlagsKey;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private navCtrl: NavController,
    private facade: BreBTransfersFacade
  ) {}

  ngAfterViewInit() {
    this.setAvalTagConfiguration();
  }

  ngOnDestroy() {
    this.facade.clearTowardAvalKey();
    removeSubscriptions(this.subscriptions);
  }

  public async openKeyDirectory(): Promise<void> {
    void this.navCtrl.navigateForward(SPI_MF, {
      skipLocationChange: true,
      queryParams: {
        routeTo: 'open-breb-contact-book'
      }
    });
  }

  public continueAction() {
    this.facade.fetchAccount(this.towardAvalKey.value);
    this.subscriptions.push(
      this.facade.breBSpiKeyData$
        .pipe(
          withLatestFrom(this.facade.brebBAccountKeyCompleted$),
          filter(([accountAvalKey, completed]) => completed && !!accountAvalKey)
        )
        .subscribe(([accountAvalKey, completed]) => {
          this.towardProduct.setValue(
            mapTargetAccountFromSpiUserKey(accountAvalKey)
          );
          this.contactName.setValue(accountAvalKey.name);

          this.continue.emit();
        })
    );
  }

  private setAvalTagConfiguration() {
    this.towardAvalKey.setErrors(null);
    this.towardAvalKey.clearValidators();

    this.towardAvalKey.setValidators([
      Validators.required,
      transfersAvalKeyValidator.call(this)
    ]);
    this.towardAvalKey.updateValueAndValidity();

    this.subscriptions.push(
      this.towardAvalKey.valueChanges.subscribe((value) => {
        if (value) {
          this.towardAvalKey.setValue(value.trim().toUpperCase(), {
            emitEvent: false
          });
          this.towardAvalKey.updateValueAndValidity({
            onlySelf: true,
            emitEvent: false
          });
        }
      })
    );
  }

  get towardAvalKey(): AbstractControl<string> {
    return this.form.get('towardAvalKey');
  }

  get towardProduct(): AbstractControl<TowardAccount> {
    return this.form.get('towardProduct');
  }

  get contactName(): AbstractControl<string> {
    return this.form.get('contactName');
  }

  get fee(): AbstractControl<string> {
    return this.form.get('fee');
  }
}
