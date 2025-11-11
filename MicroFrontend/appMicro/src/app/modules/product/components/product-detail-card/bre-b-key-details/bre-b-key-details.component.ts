import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductSpiUserKey } from '@app/modules/product/entities/product-spi-user-key';

@Component({
  selector: 'app-bre-b-key-details',
  templateUrl: './bre-b-key-details.component.html',
  styleUrls: ['./bre-b-key-details.component.sass']
})
export class BreBKeyDetailsComponent {
  @Input() item: ProductSpiUserKey;

  @Output() showTagAvalPopover: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() copyKey: EventEmitter<void> = new EventEmitter<void>();

  public onShowTagAvalPopover($event: Event) {
    this.showTagAvalPopover.emit($event);
  }

  public onCopy() {
    this.copyKey.emit();
  }
}
