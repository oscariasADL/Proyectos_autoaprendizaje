import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inactive-channel',
  templateUrl: './inactive-channel.component.html',
  styleUrls: ['./inactive-channel.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InactiveChannelComponent implements OnInit, OnDestroy {
  @Input() props: AlertSheetProperties;

  private subscription: Subscription;

  constructor(
    private facade: AppFacade,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.third,
      () => {
        this.closeModal();
      }
    );
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
  }

  public closeModal(data: any = null): void {
    this.modalCtrl.dismiss(data);
  }

  public redirectLink(): void {
    this.facade.redirectExternal(LinkKey.linkOfficeMap);
    this.closeModal(true);
  }
}
