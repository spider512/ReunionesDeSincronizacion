import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IoService } from 'src/app/shared/io.service';
import { IProyecto } from '../../shared/clases'

@Component({
	selector: 'app-editar-proyecto',
	templateUrl: './editar-proyecto.component.html',
	styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
	public proyectoSeleccionado: any;
	public oProyecto: IProyecto = {};
	public estados: any[] = [{ estado: 1, descripcion: "No iniciado" }, { estado: 2, descripcion: "Iniciado" }, { estado: 3, descripcion: "Finalizado" }, { estado: 4, descripcion: "Cancelado" }];


	constructor(public ruta: Router, router: ActivatedRoute, public io: IoService) {

		this.proyectoSeleccionado = router.snapshot.paramMap.get("id");
		if (this.proyectoSeleccionado) {
			this.cargarProyecto(this.proyectoSeleccionado);
		}

	}

	async cargarProyecto(id: number) {

		let proyectos: IProyecto[] = await this.io.proyectos(id);
		this.oProyecto = proyectos[0];
	}

	ngOnInit(): void {
	}

	volver() {
		this.ruta.navigate(['/seleccionar-proyecto']);

	}

	grabar() {
		console.log(JSON.stringify(this.oProyecto));
		this.io.grabarProyecto(this.oProyecto).then(() => {
			this.volver();
		});

	}

}
