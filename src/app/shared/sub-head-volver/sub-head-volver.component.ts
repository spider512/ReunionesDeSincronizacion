import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { PageReunionesService } from '../../page-reuniones-diarias/services/page-reuniones.service';

@Component({
  selector: 'app-sub-head-volver',
  templateUrl: './sub-head-volver.component.html',
  styleUrls: ['./sub-head-volver.component.css']
})
export class SubHeadVolverComponent {

  constructor(private ruta: Location, public Reuniones: PageReunionesService) { }



  volverAtras() {
    this.ruta.back()
  }
}
