import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';
import {MatMenuModule} from '@angular/material/menu'; 



@NgModule({
  declarations: [
    NavbarUsuarioComponent
  ],
  exports: [NavbarUsuarioComponent],
  imports: [
    CommonModule,
    MatMenuModule
  ]
})
export class SharedModule { }
