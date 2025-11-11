import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtagEvent } from '@app/commons/directives/tealium/constants/utag.entities';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import {
  ProductSpiUserKey,
  SpiKeyType
} from '@app/modules/product/entities/product-spi-user-key';

@Component({
  selector: 'app-card-footer-item',
  templateUrl: './card-footer-item.component.html',
  styleUrls: ['./card-footer-item.component.sass']
})
export class CardFooterItemComponent {
  @Input() utagForModifyKey: UtagEvent;
  @Input() utagForCopyKey: UtagEvent;
  @Input() item: ProductSpiUserKey;

  @Output() showTagAvalPopover: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() copyKey: EventEmitter<void> = new EventEmitter<void>();
  @Output() modifyKey: EventEmitter<void> = new EventEmitter<void>();
  public readonly featureFlagsKey = FeatureFlagsKey;
  public getIcon(): string {
    return `assets/img/aval-icons/${
      this.item.keyType !== SpiKeyType.AlphanumericIdentifier
        ? 'bre-b.svg'
        : 'tag-aval-colored.svg'
    }`;
  }

  public isModificationEnabled(): boolean {
    return this.item.keyType === SpiKeyType.AlphanumericIdentifier;
  }

  public onShowTagAvalPopover($event: Event) {
    this.showTagAvalPopover.emit($event);
  }
  public onCopyKey() {
    this.copyKey.emit();
  }

  public onModifyKey() {
    this.modifyKey.emit();
  }
}
