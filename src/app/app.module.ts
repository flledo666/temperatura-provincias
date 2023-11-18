import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TemperaturaComponent } from './temperatura/temperatura.component';
import { LoggerService, NoLoggerService } from './servicios/logger.servicio';
import { BooleanPipe } from './pipes/boolean.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { MonedaPipe } from './pipes/moneda.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroCiudadesPipe } from './pipes/filtro-ciudades.pipe';
import { ResaltarDirective } from './directivas/resaltar.directive';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [
        AppComponent,
        TemperaturaComponent,
        BooleanPipe,
        FechaPipe,
        MonedaPipe,
        FiltroCiudadesPipe,
        ResaltarDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [{
        /* Con esto controlo la clase que se usará cuando me pidan un logger */
        provide: LoggerService, useClass: NoLoggerService
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
