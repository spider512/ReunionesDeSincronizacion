import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pantalla-dificultades-que-preveo',
  templateUrl: './pantalla-dificultades-que-preveo.component.html',
  styleUrls: ['./pantalla-dificultades-que-preveo.component.css']
})
export class PantallaDificultadesQuePreveoComponent {

  constructor() { }

  @ViewChild('dificultadInput') dificultadInput!: ElementRef<HTMLInputElement>;

  listaDificultades: string[] = []

  agregarDificultad() {
    const dificultad = this.dificultadInput.nativeElement.value
    if (dificultad.length != 0) {
      this.listaDificultades.push(dificultad)
    }
    console.log(this.listaDificultades)
    this.dificultadInput.nativeElement.value = ''


  }
  eliminarDificultad(opcion: string) {
    if (this.listaDificultades.includes(opcion)) {
      const nuevaLista = this.listaDificultades.filter((dificultad) => dificultad != opcion)
      this.listaDificultades = nuevaLista

    }
  }


}
