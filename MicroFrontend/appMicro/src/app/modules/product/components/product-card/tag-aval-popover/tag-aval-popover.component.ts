import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { TAG_AVAL_CUTOMIZATION_FROM_LINK_EVENT } from '@app/modules/product/constants/product.constants';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tag-aval-popover',
  templateUrl: './tag-aval-popover.component.html',
  styleUrls: ['./tag-aval-popover.component.sass']
})
export class TagAvalPopoverComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() tag: string = '';
  @Input() isCustomizationEnabled: boolean = false;

  public tagAvalEvent = TAG_AVAL_CUTOMIZATION_FROM_LINK_EVENT;
  public readonly featureFlagsKey = FeatureFlagsKey;

  constructor(private popoverCtrl: PopoverController, private router: Router) {}

  public async closePopover(): Promise<void> {
    await this.popoverCtrl.dismiss();
  }

  public redirectToTagAval() {
    this.closePopover();
    this.router.navigateByUrl(`/customize-aval-tag/${this.tag}`);
  }
}
