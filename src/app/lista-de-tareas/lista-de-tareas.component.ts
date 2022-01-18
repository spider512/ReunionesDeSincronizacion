import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { IoService } from 'src/app/shared/io.service';
import { ITarea } from '../shared/clases';

export class TableBasicExample {
}
@Component({
  selector: 'app-lista-de-tareas',
  templateUrl: './lista-de-tareas.component.html',
  styleUrls: ['./lista-de-tareas.component.css']
})


export class ListaDeTareasComponent {
  constructor(public io: IoService) { }

  public tareas: ITarea[] = []

  async verTareas() {
    const nuevo = await (this.io.tareas())

    this.tareas = nuevo

    console.log(this.tareas)

  }

}

