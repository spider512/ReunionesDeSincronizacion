import { Component, ElementRef, ViewChild } from '@angular/core';
import { ITarea } from 'src/app/shared/clases';
import { PantallaQueVoyHacerHoyComponent } from '../pantalla-que-voy-hacer-hoy.component';

@Component({
  selector: 'app-pop-up-cargar-tarea',
  templateUrl: './pop-up-cargar-tarea.component.html',
  styleUrls: ['./pop-up-cargar-tarea.component.css']
})
export class PopUpCargarTareaComponent {

  constructor(public pantallaQueVoyHacerHoyComponent: PantallaQueVoyHacerHoyComponent) { }

  @ViewChild('inputCargarTarea') inputCargarTarea!: ElementRef<HTMLInputElement>;



  // Podes precargar una tarea o cargarla


  precargarTarea() {
    let tareaNueva: ITarea;
    tareaNueva = { d: this.inputCargarTarea.nativeElement.value };

    if (!tareaNueva.d) {
      this.pantallaQueVoyHacerHoyComponent.cargarTarea(tareaNueva)
    }
    this.inputCargarTarea.nativeElement.value = '';
  }

  agregarTareaHoy() {
    let tareaNueva: ITarea;
    tareaNueva = { d: this.inputCargarTarea.nativeElement.value };

    if (!tareaNueva.d) {
      this.pantallaQueVoyHacerHoyComponent.agregarTareaHoy(tareaNueva)
    }
    this.inputCargarTarea.nativeElement.value = ''
  }

}
