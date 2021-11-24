import { Component, ElementRef, ViewChild } from '@angular/core';
import { PantallaQueVoyHacerHoyComponent } from '../pantalla-que-voy-hacer-hoy.component';

@Component({
  selector: 'app-pop-up-cargar-tarea',
  templateUrl: './pop-up-cargar-tarea.component.html',
  styleUrls: ['./pop-up-cargar-tarea.component.css']
})
export class PopUpCargarTareaComponent {

  constructor(public pantallaQueVoyHacerHoyComponent: PantallaQueVoyHacerHoyComponent) { }

  @ViewChild('inputCargarTarea') inputCargarTarea!: ElementRef<HTMLInputElement>;

  nuevo() {
    if (this.inputCargarTarea.nativeElement.value.length !== 0 )
    {
      this.pantallaQueVoyHacerHoyComponent.cargarTarea(this.inputCargarTarea.nativeElement.value)
      this.inputCargarTarea.nativeElement.value = ''
    }
  }

}
