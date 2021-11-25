import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes propios
import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';
import { InicioComponent } from './inicio/inicio.component';
import { PantallaQueVoyHacerHoyComponent } from './page-reuniones-diarias/pantalla-que-voy-hacer-hoy/pantalla-que-voy-hacer-hoy.component';
import { PantallaQueHiceAyerComponent } from './page-reuniones-diarias/pantalla-que-hice-ayer/pantalla-que-hice-ayer.component';

const routes: Routes = [
  { path: "", component: InicioComponent, pathMatch: 'full' },
  { path: "reunion-diaria", component: ReunionDiariaComponent },
  { path: "hoy", component: PantallaQueVoyHacerHoyComponent },
  { path: "ayer", component: PantallaQueHiceAyerComponent },
  { path: "**", component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
