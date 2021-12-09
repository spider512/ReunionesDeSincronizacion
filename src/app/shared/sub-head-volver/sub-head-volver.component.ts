import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-head-volver',
  templateUrl: './sub-head-volver.component.html',
  styleUrls: ['./sub-head-volver.component.css']
})
export class SubHeadVolverComponent {

  constructor(public ruta: Router) { }


  volverAtras() {
    this.ruta.navigate(['/inicio'])
  }
}
