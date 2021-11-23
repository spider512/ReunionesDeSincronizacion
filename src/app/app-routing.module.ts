import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';
import { PantallaQueVoyHacerHoyComponent } from './page-reuniones-diarias/pantalla-que-voy-hacer-hoy/pantalla-que-voy-hacer-hoy.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "reunion-diaria", component: ReunionDiariaComponent },
  { path: "hoy", component: PantallaQueVoyHacerHoyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
