import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatureFlagsKey } from '@app/commons/entities/parameters/feature-flags.entities';
import { ProductSpiUserKey } from '@app/modules/product/entities/product-spi-user-key';

@Component({
  selector: 'app-aval-key-details',
  templateUrl: './aval-key-details.component.html',
  styleUrls: ['./aval-key-details.component.sass']
})
export class AvalKeyDetailsComponent {
  @Input() item: ProductSpiUserKey;

  @Output() showTagAvalPopover: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() copyKey: EventEmitter<void> = new EventEmitter<void>();
  public readonly featureFlagsKey = FeatureFlagsKey;

  public onShowTagAvalPopover($event: Event) {
    this.showTagAvalPopover.emit($event);
  }

  public onCopy() {
    this.copyKey.emit();
  }
}
