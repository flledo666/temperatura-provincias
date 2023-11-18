import { Pipe, PipeTransform } from '@angular/core';
import { Ciudad } from '../app.component';

@Pipe({
  name: 'filtroCiudades'
})
export class FiltroCiudadesPipe implements PipeTransform {

  transform(datos:Ciudad[],filtro:string): Ciudad[] {
    /* Si tengo filtro y no es sólo el simbolo - para el filtro inverso */
    if (filtro && (filtro[0]!== '-'|| filtro.length >1))
    {
      /* Convierto a minusculas y quito acentos */
      function normalizar(s:string):string
      {
        return s.toLowerCase().replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u");
      }

      /* filtro inverso */
      if (filtro[0] === '-')
      {
        return datos.filter(c => {
          return !normalizar(c.nombre).includes(normalizar(filtro.substring(1)));
        });
      }
      else /* filtro normal */
      {
        return datos.filter(c => {
          return normalizar(c.nombre).includes(normalizar(filtro));
        });
      }
      /* También se puede hacer así, encadenando los dos return en uno solo */
      return datos.filter(c => normalizar(c.nombre).includes(normalizar(filtro)));
    }
    else return datos;
  }
}
