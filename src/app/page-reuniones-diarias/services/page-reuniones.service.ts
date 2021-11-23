import { Injectable } from '@angular/core';
import { Tarea } from '../interface/page-ayer.interface';

@Injectable({
	providedIn: 'root'
})
export class PageReunionesService {

	private _tareas: Tarea[] = [];

	get tareas(): Tarea[] {
		return [...this._tareas];
	}

	constructor() { }

	agregarTarea(tarea: Tarea) {
		this._tareas.push(tarea);
	}

}
