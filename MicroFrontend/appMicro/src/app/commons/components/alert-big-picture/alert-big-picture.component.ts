import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BigPictureAlertSheetProps } from '@commons/entities/alert/alert-sheet.entities';
import { ImageUrlPipe } from '@app/commons/pipes/image-url.pipe';
import { AlertService } from '@commons/services/alert.service';

@Component({
  selector: 'app-big-picture-alert-sheet',
  templateUrl: './alert-big-picture.component.html',
  styleUrls: ['./alert-big-picture.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertBigPictureComponent {
  @Input() props: BigPictureAlertSheetProps;

  public backgroundStyle;

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    private imageUrl: ImageUrlPipe
  ) {
    const url = this.imageUrl.transform(
      '/assets/images/illustrations/popup-home/login-background-popup.png',
      true
    );

    this.backgroundStyle = {
      'background-image': `url('${url}')`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }

  public closeModal(): void {
    void this.alertService.close();
  }
  public closeWithRedirect() {
    void this.alertService.close();
    if (this.props.navigateOnCloseUrl) {
      void this.navCtrl.navigateForward(this.props.navigateOnCloseUrl);
    }
  }
}
