import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-pantalla-que-voy-hacer-hoy',
  templateUrl: './pantalla-que-voy-hacer-hoy.component.html',
  styleUrls: ['./pantalla-que-voy-hacer-hoy.component.css']
})
export class PantallaQueVoyHacerHoyComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  opciones: string[] = ["Realizar mockup de app", "Terminar esquema en html", "Comenzar con la arquitectura"]
  tareaAgregada: string[] = []



  constructor() { }

  cargarTarea(tarea: string) {
    this.opciones.push(tarea)
  }

  quitar(opcion: string) {

    this.tareaAgregada = this.tareaAgregada.filter((item) => item !== opcion)
    this.opciones.push(opcion)


  }

  agregarTareaHoy(tarea: string) {
    this.tareaAgregada.push(tarea)
  }
  botonAgregarTarea() {
    const valor = this.txtBuscar.nativeElement.value
    if (valor !== 'ingrese la tarea precargada...') {
      this.tareaAgregada.push(valor)
      this.opciones = this.opciones.filter((opcionesNuevas) => opcionesNuevas !== valor)
    }
  }

}
