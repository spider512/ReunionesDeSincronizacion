import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { PantallaQueVoyHacerHoyComponent } from './pantalla-que-voy-hacer-hoy/pantalla-que-voy-hacer-hoy.component';
import { PantallaQueHiceAyerComponent } from './pantalla-que-hice-ayer/pantalla-que-hice-ayer.component';
import { PantallaDificultadesQuePreveoComponent } from './pantalla-dificultades-que-preveo/pantalla-dificultades-que-preveo.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageReunionesService } from './services/page-reuniones.service';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { PopUpCargarTareaComponent } from './pantalla-que-voy-hacer-hoy/pop-up-cargar-tarea/pop-up-cargar-tarea.component';
import { TareasAgregadasComponent } from './pantalla-que-voy-hacer-hoy/tareas-agregadas/tareas-agregadas.component'; 



@NgModule({
  declarations: [
    PantallaPrincipalComponent,
    PantallaQueVoyHacerHoyComponent,
    PantallaQueHiceAyerComponent,
    PantallaDificultadesQuePreveoComponent,
    PopUpCargarTareaComponent,
    TareasAgregadasComponent
  ],
  exports: [PantallaQueVoyHacerHoyComponent,PantallaQueHiceAyerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    SharedModule
  ],
  providers: [
    PageReunionesService,
    MatListModule,
    SharedModule,
    CommonModule
  ]
})
export class PageReunionesDiariasModule { }
