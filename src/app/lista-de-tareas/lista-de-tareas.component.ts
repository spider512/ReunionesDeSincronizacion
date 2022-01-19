import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IoService } from 'src/app/shared/io.service';
import { IProyecto, ITarea } from '../shared/clases';



export class TableBasicExample {
}
@Component({
  selector: 'app-lista-de-tareas',
  templateUrl: './lista-de-tareas.component.html',
  styleUrls: ['./lista-de-tareas.component.css']
})


export class ListaDeTareasComponent {
  constructor(public io: IoService, public ruta: Router, router: ActivatedRoute) {
    this.proyectoSeleccionado = router.snapshot.paramMap.get("id");
    if (this.proyectoSeleccionado) {
      this.cargarProyecto(this.proyectoSeleccionado);
    }
  }
  public proyectoSeleccionado: any;
  public estados: any[] = [{ estado: 1, descripcion: "No iniciado" }, { estado: 2, descripcion: "Iniciado" }, { estado: 3, descripcion: "Finalizado" }, { estado: 4, descripcion: "Cancelado" }];
  public tareas: ITarea[] = []
  public oProyecto: IProyecto = {};

  async cargarProyecto(id: number) {

    let proyectos: IProyecto[] = await this.io.proyectos(id);
    this.oProyecto = proyectos[0];
  }
  async verTareas() {
    const nuevo = await (this.io.tareas())

    this.tareas = nuevo

    console.log(this.tareas)

  }

}

