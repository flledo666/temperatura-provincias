import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../servicios/http.service';

export enum EstadoCielo {
  Soleado='Despejado',
  PocoNuboso='Poco nuboso',
  Nuboso='Nuboso',
  MuyNuboso='Muy nuboso',
  NubesAltas='Nubes altas',
  Cubierto='Cubierto',
  Lluvioso='Lluvioso',
  MuyLluvioso='Muy lluvioso',
  Tormenta='Tormenta',
  Nieve='Nieve',
  Desconocido=''
}

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {
    @Input() nombre: string = "";
    @Input() tempMax: number= NaN;
    @Input() tempMin: number= NaN;
    @Input() cielo: EstadoCielo=EstadoCielo.Desconocido;
    @Input() codigo: string="";

    @Output() temperaturaChange = new EventEmitter<number>();

    EstadoCielo = EstadoCielo;
    
    constructor (private Http: HttpService) {}

    ngOnInit()
    {
      this.Http.getTemperaturas(this.codigo.substring(0,2))
        .subscribe(data => 
        {
          let xml = JSON.parse(JSON.stringify(data));
          this.tempMax = 999;            
          this.tempMin = 999;  
          this.cielo = EstadoCielo.Desconocido;          
          if (xml.ciudades.length > 0)
          {
            for (let i = 0; i < xml.ciudades.length; i++) 
            {
              if (xml.ciudades[i].id == this.codigo)
              {
                //console.log(xml.ciudades[i].stateSky.description + " " + xml.ciudades[i].name);
                this.tempMax = xml.ciudades[i].temperatures.max;
                this.tempMin = xml.ciudades[i].temperatures.min;
                this.cielo = xml.ciudades[i].stateSky.description;
                return;
              }
            }
          }
        });
    }
    
    /*incrementar():void{
        this.temperatura++;
        this.temperaturaChange.emit(this.temperatura);
    }
    decrementar():void{
        this.temperatura--;
        this.temperaturaChange.emit(this.temperatura);
    }*/
}
