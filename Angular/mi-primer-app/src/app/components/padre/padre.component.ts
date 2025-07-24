import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoComponent } from '../hijo/hijo.component';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, HijoComponent],
  template: `
    <h2>Componente Padre</h2>
    <app-hijo
      [nombre]="'Carlos'"
      (saludar)="recibirSaludo($event)">
    </app-hijo>

    <p><strong>Mensaje recibido:</strong> {{ mensaje }}</p>
  `,
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent {
  mensaje = '';

  recibirSaludo(evento: string) {
    this.mensaje = evento;
  }
}
