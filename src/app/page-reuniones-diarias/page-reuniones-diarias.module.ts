import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { PantallaQueVoyHacerHoyComponent } from './pantalla-que-voy-hacer-hoy/pantalla-que-voy-hacer-hoy.component';
import { PantallaQueHiceAyerComponent } from './pantalla-que-hice-ayer/pantalla-que-hice-ayer.component';
import { PantallaDificultadesQuePreveoComponent } from './pantalla-dificultades-que-preveo/pantalla-dificultades-que-preveo.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PantallaPrincipalComponent,
    PantallaQueVoyHacerHoyComponent,
    PantallaQueHiceAyerComponent,
    PantallaDificultadesQuePreveoComponent
  ],
  exports: [PantallaQueVoyHacerHoyComponent],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class PageReunionesDiariasModule { }
