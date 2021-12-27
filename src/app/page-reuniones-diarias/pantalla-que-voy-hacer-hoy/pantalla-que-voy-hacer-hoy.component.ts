import { Component, ViewChild, ElementRef } from '@angular/core';
import { ITarea } from 'src/app/shared/clases';
import { IoService } from 'src/app/shared/io.service';


@Component({
  selector: 'app-pantalla-que-voy-hacer-hoy',
  templateUrl: './pantalla-que-voy-hacer-hoy.component.html',
  styleUrls: ['./pantalla-que-voy-hacer-hoy.component.css']
})
export class PantallaQueVoyHacerHoyComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  public opciones: ITarea[] = []

  tareaAgregada: ITarea[] = []



  constructor( public io : IoService) { }

  

  cargarTarea(tarea: ITarea) {
    this.opciones.push(tarea)
  }

  quitar(opcion: ITarea) {

    this.tareaAgregada = this.tareaAgregada.filter((item) => item !== opcion)
    this.opciones.push(opcion)


  }

  agregarTareaHoy(tarea: ITarea) {
    this.tareaAgregada.push(tarea)
  }
  botonAgregarTarea() {
    let texto : string = this.txtBuscar.nativeElement.value;
    
    if (texto) {
      let nuevaTarea : ITarea = {p:1,d:texto,e:'2'}
      this.tareaAgregada.push(nuevaTarea)
      this.opciones = this.opciones.filter((opcionesNuevas) => opcionesNuevas !== nuevaTarea)
    }

  }

}
