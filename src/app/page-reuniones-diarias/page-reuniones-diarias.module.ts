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
import { DificultadesAgregadasListaComponent } from './pantalla-dificultades-que-preveo/dificultades-agregadas-lista/dificultades-agregadas-lista.component';
import { SeleccionarProyectoComponent } from './seleccionar-proyecto/seleccionar-proyecto.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { CargarReunionComponent } from './cargar-reunion/cargar-reunion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PantallaPrincipalComponent,
    PantallaQueVoyHacerHoyComponent,
    PantallaQueHiceAyerComponent,
    PantallaDificultadesQuePreveoComponent,
    PopUpCargarTareaComponent,
    TareasAgregadasComponent,
    DificultadesAgregadasListaComponent,
    SeleccionarProyectoComponent,
    CargarReunionComponent
  ],
  exports: [PantallaQueVoyHacerHoyComponent, PantallaQueHiceAyerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    SharedModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    PageReunionesService,
    MatListModule,
    SharedModule,
    CommonModule,
    MatMenuModule
  ]
})
export class PageReunionesDiariasModule { }
