import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../servicios/http.service';

export enum EstadoCielo {
  Soleado = 'Despejado',
  IntervalosNubosos = 'Intervalos nubosos',
  PocoNuboso = 'Poco nuboso',
  Nuboso = 'Nuboso',
  MuyNuboso = 'Muy nuboso',
  NubesAltas = 'Nubes altas',
  Cubierto = 'Cubierto',
  Niebla = 'Niebla',
  PocoLluvioso = 'Cubierto con lluvia escasa',
  Lluvioso = 'Lluvioso',
  MuyLluvioso = 'Muy lluvioso',
  Tormenta = 'Tormenta',
  Nieve = 'Nieve',
  Desconocido = ''
}

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {
  @Input() nombre: string = "";
  @Input() temperatura: number | string = "Cargando";
  @Input() tempMax: number | string = "Cargando";
  @Input() tempMin: number | string = "Información"
  @Input() cielo: EstadoCielo = EstadoCielo.Desconocido;
  @Input() codigo: string = "";

  @Output() temperaturaChange = new EventEmitter<number>();

  EstadoCielo = EstadoCielo;

  constructor(private Http: HttpService) { }

  ngOnInit() {
    this.Http.getTemperaturas(this.codigo)
      .subscribe(data => {
        let xml = JSON.parse(JSON.stringify(data));
        this.temperatura = xml.temperatura_actual;
        this.tempMax = xml.temperaturas.max;
        this.tempMin = xml.temperaturas.min;
        this.cielo = xml.stateSky.description;
        //console.log (xml.stateSky.description);
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
