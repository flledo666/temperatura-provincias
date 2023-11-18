import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fecha'
})
export class FechaPipe implements PipeTransform {

    transform(d: Date|null|undefined, opcion:string = 'completo'): string
    {
        var mes:string;

        if (d === null) return "Fecha nula";
        if (d === undefined) return "Fecha no definida";

        switch (d.getMonth()+1)
        {
            case 1: mes ='Enero'; break;
            case 2: mes ='Febrero'; break;
            case 3: mes ='Marzo'; break;
            case 4: mes ='Abril'; break;
            case 5: mes ='Mayo'; break;
            case 6: mes ='Junio'; break;
            case 7: mes ='Julio'; break;
            case 8: mes ='Agosto'; break;
            case 9: mes ='Septiembre'; break;
            case 10: mes ='Octubre'; break;
            case 11: mes ='Noviembre'; break;
            case 12: mes ='Diciembre'; break;
            default: mes = 'ERROR';
        }
        
        if (opcion == "corta")
            return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
        else if (opcion == "fecha")
            return `${d.getDate()} de ${mes} de ${d.getFullYear()}`;
        else if (opcion == "fechaCorta")
            return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        else if (opcion == "hora")
            return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
        else /* completo */
            return `${d.getDate()} de ${mes} de ${d.getFullYear()} a las ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
    }
}
