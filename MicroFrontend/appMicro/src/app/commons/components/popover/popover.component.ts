import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
  @Input() title: string;
  @Input() text: string;

  constructor(private popoverCtrl: PopoverController) {}

  public async closePopover(): Promise<void> {
    await this.popoverCtrl.dismiss();
  }
}
