import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-breb-key',
  templateUrl: './register-breb-key.component.html',
  styleUrls: ['./register-breb-key.component.sass']
})
export class RegisterBrebKeyComponent {
  @Output() showTagAvalPopover: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() goToLink: EventEmitter<void> = new EventEmitter<void>();

  public getIcon(): string {
    return 'assets/img/aval-icons/bre-b.svg';
  }

  public onShowTagAvalPopover($event: Event) {
    this.showTagAvalPopover.emit($event);
  }
  public onGoToLink() {
    this.goToLink.emit();
  }
}
