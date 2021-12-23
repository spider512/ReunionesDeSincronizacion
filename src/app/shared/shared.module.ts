import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';
import { MatMenuModule } from '@angular/material/menu';
import { SubHeadVolverComponent } from './sub-head-volver/sub-head-volver.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    NavbarUsuarioComponent,
    SubHeadVolverComponent,
    
  ],
  exports: [NavbarUsuarioComponent, SubHeadVolverComponent],
  imports: [
    
    CommonModule,
    MatMenuModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
