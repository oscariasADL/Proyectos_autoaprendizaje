import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeliculaCardComponent } from './components/pelicula-card/pelicula-card.component';
import { FrutasFavoritasComponent } from './components/frutas-favoritas/frutas-favoritas.component';
import { ColoresComponent } from './components/colores/colores.component';
import { SaludoComponent } from './components/saludo/saludo.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PeliculaCardComponent, FrutasFavoritasComponent, ColoresComponent, SaludoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mi-primer-app';
  nombre = 'Oscar Arias';
  peliculas = ["Interstellar", "Inception", "The Dark Knight"];
  frutas = ["Manzana", "Pera", "Naranja"];
  colores = ["Verde", "Negro", "Naranja", "Vinotinto"];
}
