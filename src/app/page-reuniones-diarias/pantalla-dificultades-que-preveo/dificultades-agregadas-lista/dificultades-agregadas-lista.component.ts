import { Component, ElementRef, ViewChild } from '@angular/core';
import { PantallaDificultadesQuePreveoComponent } from '../pantalla-dificultades-que-preveo.component';


@Component({
  selector: 'app-dificultades-agregadas-lista',
  templateUrl: './dificultades-agregadas-lista.component.html',
  styleUrls: ['./dificultades-agregadas-lista.component.css']
})
export class DificultadesAgregadasListaComponent {



 

  constructor(public PantallaDificultadesQuePreveoComponent: PantallaDificultadesQuePreveoComponent) { }



}
