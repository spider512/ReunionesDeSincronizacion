import { Component, Input } from '@angular/core';
import { PageReunionesService } from '../services/page-reuniones.service';
import { Tarea } from '../interface/page-ayer.interface';

@Component({
	selector: 'app-pantalla-que-hice-ayer',
	templateUrl: './pantalla-que-hice-ayer.component.html',
	styleUrls: ['./pantalla-que-hice-ayer.component.css']
})
export class PantallaQueHiceAyerComponent {

	@Input() nuevo: Tarea = {
		nombre: ''
	}

	constructor(private pageService: PageReunionesService) { }

	get tareas() {
		return this.pageService.tareas
	}

	agregar() {
		if (this.nuevo.nombre.trim().length === 0) { return; }

		this.pageService.agregarTarea(this.nuevo);

		this.nuevo = {
			nombre: ''
		}
	}

}
