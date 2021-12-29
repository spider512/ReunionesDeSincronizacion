import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';
import { MatMenuModule } from '@angular/material/menu';
import { SubHeadVolverComponent } from './sub-head-volver/sub-head-volver.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    NavbarUsuarioComponent,
    SubHeadVolverComponent
  ],
  exports: [NavbarUsuarioComponent, SubHeadVolverComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SharedModule { }
