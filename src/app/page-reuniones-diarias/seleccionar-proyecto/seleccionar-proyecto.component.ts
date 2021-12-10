import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProyecto } from 'src/app/shared/clases';
import { IoService } from 'src/app/shared/io.service';
import { PageReunionesService } from '../services/page-reuniones.service';

@Component({
  selector: 'app-seleccionar-proyecto',
  templateUrl: './seleccionar-proyecto.component.html',
  styleUrls: ['./seleccionar-proyecto.component.css']
})
export class SeleccionarProyectoComponent implements OnInit {
  public proyectos: IProyecto[] = [];


  constructor(public io: IoService, public Reuniones: PageReunionesService, public ruta:Router) {

    this.io.proyectos().then(p => {
      this.proyectos = p;
      console.log(this.proyectos);
    })
  }

  ngOnInit(): void {
  }

  seleccionarProyecto(p: IProyecto) {
    this.Reuniones.proyectoSeleccionado = p;
    this.ruta.navigate(['/principal']);

    


  }

}
