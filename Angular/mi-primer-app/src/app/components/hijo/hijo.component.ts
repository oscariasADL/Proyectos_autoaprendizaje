import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.scss'
})
export class HijoComponent {
  @Input() nombre: string = '';
  @Output() saludar = new EventEmitter<string>();

  enviarSaludo() {
    this.saludar.emit(`Hola papá/mamá, soy ${this.nombre}!`);
  }

}
