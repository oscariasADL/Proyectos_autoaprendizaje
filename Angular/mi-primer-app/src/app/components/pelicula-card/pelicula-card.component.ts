import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pelicula-card',
  standalone: true,
  imports: [],
  templateUrl: './pelicula-card.component.html',
  styleUrl: './pelicula-card.component.scss'
})
export class PeliculaCardComponent {
  @Input() titulo: string = " ";
}



