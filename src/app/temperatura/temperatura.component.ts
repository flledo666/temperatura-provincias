import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../servicios/http.servicio';
import { LoggerService } from '../servicios/logger.servicio';

export enum EstadoCielo {
  Soleado = 'Soleado',
  PocoNuboso = 'Poco nuboso',
  Nuboso = 'Nuboso',
  MuyNuboso = 'Muy nuboso',
  NubesAltas = 'Nubes altas',
  Cubierto = 'Cubierto',
  Niebla = 'Niebla',
  PocoLluvioso = 'Poco Lluvioso',
  Lluvioso = 'Lluvioso',
  MuyLluvioso = 'Muy lluvioso',
  Tormenta = 'Tormenta',
  Nieve = 'Nieve',
  Desconocido = ''
}

function convertirStateSky(id: string) {
  /* A veces el código acaba en n y eso jode todo */
  if (id.endsWith("n"))
    id = id.slice(0, -1);

  switch (Number(id)) {
    case 11: return EstadoCielo.Soleado;
    case 12: return EstadoCielo.PocoNuboso;
    case 14: return EstadoCielo.Nuboso;
    case 15: return EstadoCielo.MuyNuboso;
    case 16: return EstadoCielo.Cubierto;
    case 17: return EstadoCielo.NubesAltas;
    case 26: return EstadoCielo.Lluvioso;
    case 43:
    case 46: return EstadoCielo.PocoLluvioso;
    case 54:
    case 64: return EstadoCielo.Tormenta;
    case 81:
    case 82: return EstadoCielo.Niebla;
    default: return EstadoCielo.Desconocido;
  }
}
@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent {
  @Input() nombre: string = "";
  temperatura: number | string = "Cargando";
  tempMin: number | string = "Cargando "
  tempMax: number | string = "Información ";
  cielo: EstadoCielo = EstadoCielo.Desconocido;
  descripcion: string = "";
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
        this.cielo = convertirStateSky(xml.stateSky.id);
        this.descripcion = xml.stateSky.description;

        if (this.cielo == EstadoCielo.Desconocido)
          console.log(`${this.nombre} ${xml.stateSky.description}(${xml.stateSky.id})`);

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
