import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-frutas-favoritas',
  standalone: true,
  imports: [],
  templateUrl: './frutas-favoritas.component.html',
  styleUrl: './frutas-favoritas.component.scss'
})
export class FrutasFavoritasComponent {
  @Input() frutasFavoritas: string = " ";
}
