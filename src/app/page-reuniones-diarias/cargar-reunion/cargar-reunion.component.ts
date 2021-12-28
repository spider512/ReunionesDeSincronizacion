import { Component, OnInit } from '@angular/core';
import { IProblema, ITarea } from 'src/app/shared/clases';
import { IoService } from 'src/app/shared/io.service';
import { NuevaTareaComponent } from './nueva-tarea/nueva-tarea.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cargar-reunion',
  templateUrl: './cargar-reunion.component.html',
  styleUrls: ['./cargar-reunion.component.css']
})
export class CargarReunionComponent implements OnInit {
  public tareasAyer: ITarea[] = [{ id: 1, d: 'Tarea 1' }, { id: 2, d: 'Tarea 2' }, { id: 3, d: 'Tarea 3' }];
  public tareasHoy: ITarea[] = [];
  public tareasSinAsignar: ITarea[] = [{ id: 4, d: 'Tarea 4' }, { id: 5, d: 'Tarea 5' }, { id: 6, d: 'Tarea 6' }];
  public tareaAyerSeleccionada?: ITarea;

  public problemas: IProblema[] = [];
  public panelOpenState: boolean = false;

  constructor(public dialog: MatDialog, public io: IoService) { }

  ngOnInit(): void {
  }

  grabar() { }

  volver() { }

  async seleccionarTareaAyer(tareaAyerSeleccionada?: ITarea) {
    console.log(tareaAyerSeleccionada);



    if (tareaAyerSeleccionada) {

      if (tareaAyerSeleccionada.id == -1) {

        const nt = this.NuevaTarea();

      }
      else {
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

  NuevaTarea() {

    const dialogRef = this.dialog.open(NuevaTareaComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    });


  }


}
