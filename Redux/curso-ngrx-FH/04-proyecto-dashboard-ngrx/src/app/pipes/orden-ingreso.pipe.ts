import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[] {
    // Crear una copia del array antes de ordenarlo para evitar mutar el original
    //return items.sort( (a, b) => {
    return [...items].sort( (a, b) => {

      if ( a.tipo === 'ingreso' ) {
        return -1;
      } else {
        return 1;
      }

    });
  }

}
