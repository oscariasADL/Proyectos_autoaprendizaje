import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum ViewMoreKeysType {
  primary = 'primary',
  secondary = 'secondary'
}

@Component({
  selector: 'app-view-more-keys-button',
  templateUrl: './view-more-keys-button.component.html',
  styleUrls: ['./view-more-keys-button.component.sass']
})
export class ViewMoreKeysButtonComponent {
  @Input() type: ViewMoreKeysType;
  @Input() buttonLabel = 'BRE_B.VIEW_MORE_KEYS';
  @Input() translateParams = null;
  @Output() goToBreB: EventEmitter<void> = new EventEmitter<void>();

  public onClick(): void {
    this.goToBreB.emit();
  }

  get viewMoreKeysType(): typeof ViewMoreKeysType {
    return ViewMoreKeysType;
  }
}
