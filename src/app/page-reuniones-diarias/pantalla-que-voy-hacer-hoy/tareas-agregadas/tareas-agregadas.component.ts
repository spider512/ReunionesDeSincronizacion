import { Component } from '@angular/core';
import { PantallaQueVoyHacerHoyComponent } from '../pantalla-que-voy-hacer-hoy.component';

@Component({
  selector: 'app-tareas-agregadas',
  templateUrl: './tareas-agregadas.component.html',
  styleUrls: ['./tareas-agregadas.component.css']
})
export class TareasAgregadasComponent {

  constructor(public instancia: PantallaQueVoyHacerHoyComponent) { }


}
