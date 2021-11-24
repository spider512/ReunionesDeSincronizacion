import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PantallaQueHiceAyerComponent } from './page-reuniones-diarias/pantalla-que-hice-ayer/pantalla-que-hice-ayer.component';
import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "reunion-diaria", component: ReunionDiariaComponent },
  { path: "ayer", component: PantallaQueHiceAyerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
