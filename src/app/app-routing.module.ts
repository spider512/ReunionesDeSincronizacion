import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "reunion-diaria", component: ReunionDiariaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
