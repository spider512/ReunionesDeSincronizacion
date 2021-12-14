import { Injectable } from '@angular/core';
import { IProyecto } from 'src/app/shared/clases';
import { Tarea } from '../interface/page-ayer.interface';

@Injectable({
	providedIn: 'root'
})
export class PageReunionesService {
	public proyectoSeleccionado?: IProyecto

	private _tareas: Tarea[] = [];

	get tareas(): Tarea[] {
		return [...this._tareas];
	}

	constructor() { }

	agregarTarea(tarea: Tarea) {
		this._tareas.push(tarea);
	}

}
