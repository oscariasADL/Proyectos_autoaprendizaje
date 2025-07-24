import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-colores',
  standalone: true,
  imports: [],
  templateUrl: './colores.component.html',
  styleUrl: './colores.component.scss'
})
export class ColoresComponent {
  @Input() coloresFavoritos: string = " ";
}
