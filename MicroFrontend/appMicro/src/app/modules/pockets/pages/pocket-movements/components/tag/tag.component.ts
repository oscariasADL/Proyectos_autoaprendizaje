import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  standalone: true
})
export class TagComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() isActive: boolean = false;

  @Output() status: EventEmitter<string> = new EventEmitter<string>();

  public onClick() {
    this.status.emit(this.id);
  }
}
