import { Component, OnInit } from '@angular/core';
import { estadosTareas, IProblema, IProyecto, ITarea } from 'src/app/shared/clases';
import { IoService } from 'src/app/shared/io.service';
import { NuevaTareaComponent } from './nueva-tarea/nueva-tarea.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoProblemaComponent } from './nuevo-problema/nuevo-problema.component';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-cargar-reunion',
  templateUrl: './cargar-reunion.component.html',
  styleUrls: ['./cargar-reunion.component.css']
})
export class CargarReunionComponent implements OnInit {
  public tareasAyer: ITarea[] = []// [{ id: 1, d: 'Tarea 1' }, { id: 2, d: 'Tarea 2' }, { id: 3, d: 'Tarea 3' }];
  public tareasHoy: ITarea[] = [];
  public tareasSinAsignar: ITarea[] = []// [{ id: 4, d: 'Tarea 4' }, { id: 5, d: 'Tarea 5' }, { id: 6, d: 'Tarea 6' }];
  public tareaAyerSeleccionada?: ITarea;
  public tareaHoySeleccionada?: ITarea;

  public problemas: IProblema[] = [];
  public panelOpenState: boolean = false;
  public proyectoSeleccionadoId: number;
  public ReunionSeleccionadaId: number;
  public proyectoSeleccionado?: IProyecto;
  public reunion?: any;

  constructor(public dialog: MatDialog, public io: IoService, private route: ActivatedRoute, public router: Router, public auth: AuthService) {
    this.proyectoSeleccionadoId = parseInt(route.snapshot.paramMap.get("proyecto") || "0");
    this.ReunionSeleccionadaId = parseInt(route.snapshot.paramMap.get("id") || "0");

    if (!this.proyectoSeleccionadoId)
      this.router.navigate(["/seleccionar-proyecto"]);

    this.cargarProyecto(this.proyectoSeleccionadoId);
  }

  async cargarProyecto(id: number) {
    this.proyectoSeleccionado = (await this.io.proyectos(id))[0];

    if (this.proyectoSeleccionado.rh && !this.ReunionSeleccionadaId) {
      this.router.navigate([`/cargar-reunion/${this.proyectoSeleccionado.id}/${this.proyectoSeleccionado.rh}`]);
    }

    console.log(`Reunion Selected: ${this.ReunionSeleccionadaId}`);
    if (this.ReunionSeleccionadaId) {
      this.reunion = (await this.io.reunionesDiarias(this.ReunionSeleccionadaId))[0];
      this.tareasAyer = this.reunion.TareasAyer?.filter((t: { u: any; }) => t.u == this.auth.loginInfo.usuario);
      this.tareasHoy = this.reunion.TareasHoy?.filter((t: { u: any; }) => t.u == this.auth.loginInfo.usuario);
      this.problemas = this.reunion.Problemas?.filter((t: { u: any; }) => t.u == this.auth.loginInfo.usuario);

    }

    this.tareasSinAsignar = (await this.io.reunionesDiarias_tareas(id));
    //Eliminar las tareas que ya estan asignadas
    // let tareasTemp: ITarea[] = [];
    // this.tareasSinAsignar.forEach(t => {
    //   if (!this.tareasAyer.find(ta => ta.id == t.id) && !this.tareasHoy.find(th => th.id == t.id))
    //     tareasTemp.push(t);
    // }
    // );
    // this.tareasSinAsignar = tareasTemp;

  }

  ngOnInit(): void {
  }

  async grabar() {
    let reunion: any = { dt: new Date().toISOString().split('T')[0], u: this.auth.loginInfo.usuario, p: this.proyectoSeleccionadoId, TareasHoy: this.tareasHoy, TareasAyer: this.tareasAyer, Problemas: this.problemas };
    let r = await this.io.grabarReunionesDiarias(reunion);
    this.router.navigate(["/seleccionar-proyecto"]);
  }

  volver() {
    this.router.navigate(["/seleccionar-proyecto"]);
  }
  async seleccionarTareaHoy(tareaHoySeleccionada?: ITarea) {
    if (tareaHoySeleccionada) {
      if (tareaHoySeleccionada.id == -1) {
        const nt = this.NuevaTarea(this.tareasHoy);
      }
      else {
        console.log(tareaHoySeleccionada);
        this.tareasHoy.push(tareaHoySeleccionada);
        let tareasTemp: ITarea[] = [];
        this.tareasSinAsignar.forEach(t => {

          if (t !== tareaHoySeleccionada)
            tareasTemp.push(t);
        });
        this.tareasSinAsignar = tareasTemp;
      }
    }
  }

  async seleccionarTareaAyer(tareaAyerSeleccionada?: ITarea) {
    if (tareaAyerSeleccionada) {
      if (tareaAyerSeleccionada.id == -1) {
        const nt = this.NuevaTarea(this.tareasAyer);
      }
      else {
        this.tareasHoy.push(tareaAyerSeleccionada);
        this.tareasAyer.push(tareaAyerSeleccionada);
        let tareasTemp: ITarea[] = [];
        this.tareasSinAsignar.forEach(t => {
          if (t !== tareaAyerSeleccionada)
            tareasTemp.push(t);
        });
        this.tareasSinAsignar = tareasTemp;
      }
    }
  }

  removerHoy(tareaHoySeleccionada?: ITarea) {
    if (tareaHoySeleccionada) {
      this.tareasSinAsignar.push(tareaHoySeleccionada);
      let tareasTemp: ITarea[] = [];
      this.tareasHoy.forEach(t => {
        if (t !== tareaHoySeleccionada)
          tareasTemp.push(t);
      });
      this.tareasHoy = tareasTemp;
    }
  }

  removerAyer(tareaAyerSeleccionada?: ITarea) {
    console.log(tareaAyerSeleccionada);
    if (tareaAyerSeleccionada) {
      this.tareasSinAsignar.push(tareaAyerSeleccionada);
      let tareasTemp: ITarea[] = [];
      this.tareasAyer.forEach(t => {
        if (t !== tareaAyerSeleccionada)
          tareasTemp.push(t);
      });
      this.tareasAyer = tareasTemp;
    }
  }

  removerProblema(problemaSeleccionado?: IProblema) {
    console.log(problemaSeleccionado);
    if (problemaSeleccionado) {
      // this.tareasSinAsignar.push(problemaSeleccionado);
      let problemasTemp: IProblema[] = [];
      this.problemas.forEach(t => {
        if (t !== problemaSeleccionado)
          problemasTemp.push(t);
      });
      this.problemas = problemasTemp;
    }
  }


  agregarProblema() {
    const dialogRef = this.dialog.open(NuevoProblemaComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        let np: IProblema = { d: result, p: this.proyectoSeleccionadoId };
        this.problemas.push(np);
      }
    });
  }

  NuevaTarea(conjunto: ITarea[] = this.tareasSinAsignar) {
    const dialogRef = this.dialog.open(NuevaTareaComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {

        let nt: ITarea = { d: result, e: estadosTareas.ABIERTA, p: this.proyectoSeleccionadoId };

        let nuevaTarea: ITarea = (await this.io.grabarTarea(nt))[0];
        nt.id = nuevaTarea.id;
        conjunto.push(nt);
      }
      this.tareaHoySeleccionada = undefined;
      this.tareaAyerSeleccionada = undefined;
    });
  }

}
