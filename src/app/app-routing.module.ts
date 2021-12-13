import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes propios
import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';
import { PantallaPrincipalComponent } from './page-reuniones-diarias/pantalla-principal/pantalla-principal.component';
import { PantallaQueHiceAyerComponent } from './page-reuniones-diarias/pantalla-que-hice-ayer/pantalla-que-hice-ayer.component';
import { PantallaDificultadesQuePreveoComponent } from './page-reuniones-diarias/pantalla-dificultades-que-preveo/pantalla-dificultades-que-preveo.component';
import { PantallaQueVoyHacerHoyComponent } from './page-reuniones-diarias/pantalla-que-voy-hacer-hoy/pantalla-que-voy-hacer-hoy.component';
import { SeleccionarProyectoComponent } from './page-reuniones-diarias/seleccionar-proyecto/seleccionar-proyecto.component';

const routes: Routes = [
  { path: "", component: SeleccionarProyectoComponent },
  { path: "seleccionar-proyecto", component: SeleccionarProyectoComponent },
  { path: "reunion-diaria", component: ReunionDiariaComponent },
  { path: "principal", component: PantallaPrincipalComponent },
  { path: "ayer", component: PantallaQueHiceAyerComponent },
  { path: "dificultades", component: PantallaDificultadesQuePreveoComponent },
  { path: "hoy", component: PantallaQueVoyHacerHoyComponent },
  { path: "**", redirectTo: "" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
