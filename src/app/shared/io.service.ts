import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { IProyecto } from './clases';
import { ITarea } from './clases';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  public loginInfo: any = this.auth.loginInfo;

  constructor(public auth: AuthService, private http: HttpClient) { }

  getEntidad(entidad: string, id?: number, parametros?: any) {
    return new Promise((resolve, errorEvent) => {

      let params: string;
      if (id)
        params = `${this.auth.UrlEntidad}/${entidad}/{"id":${id}}`;
      else
        if (parametros)
          params = `${this.auth.UrlEntidad}/${entidad}/${JSON.stringify(parametros)}`;
        else
          params = `${this.auth.UrlEntidad}/${entidad}`;

      this.http.get(params, { headers: this.auth.headers })
        .subscribe((resultado: any) => {
          let d: any = resultado; //JSON.parse(resultado.toString())
          if (d[0]?.isException) {
            this.mensaje(d[0]?.mensaje);
            errorEvent(d[0]);
            if (d[0].error == 1) {
              this.auth.logout();
            }
          }
          else {
            resolve(d);
          }
        }, (error: { message: string; }) => {

          console.log(1)
          let msg: string = error.message;
          if (msg.substring(0, 2) == '[{') {
            let d = JSON.parse(msg);
            msg = d.mensaje;
            if (d[0].error == 1) {
              this.auth.logout();
            }
          }

          this.mensaje(msg);
          errorEvent({ "mensaje": msg });
          console.error(error);
        });
    });
  }
  mensaje(mensaje: any) {
    throw new Error(mensaje);
  }

  setEntidad(entidad: string, param: any) {
    return new Promise((resolve, errorEvent) => {

      let urlParams = new URLSearchParams();
      urlParams.append('entidad', entidad);
      urlParams.append('value', JSON.stringify(param));
      let params: string = urlParams.toString();

      this.http.post(this.auth.UrlEntidad, params, { headers: this.auth.headers })
        .subscribe((resultado: any) => {
          let d: any = resultado;//JSON.parse(resultado.toString())
          if (d[0]?.isException) {
            this.mensaje(d[0]?.mensaje);
            errorEvent(d[0]);
            if (d[0].error == 1) {
              this.auth.logout();
            }
          }
          else {
            resolve(d);
          }
        }, (error: { message: string; }) => {
          let msg: string = error.message;
          errorEvent({ "mensaje": msg });
          console.error(error);
        });
    })
  }

  //Endpoint proyectos getAll, getId
  proyectos(id?: number) {
    let e: string = 'Proyectos';
    return new Promise<IProyecto[]>((resolve, errorEvent) => { this.getEntidad(e, id).then(resolveE => { resolve(resolveE as IProyecto[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }
  //Endpoint Nuevo proyecto, editar proyecto
  grabarProyecto(p: IProyecto) {
    let e: string = 'Proyectos';
    return new Promise<IProyecto[]>((resolve, errorEvent) => { this.setEntidad(e, p).then(resolveE => { resolve(resolveE as any[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }



  //Endpoint get tarea, get tareas

  tareas(id?: number) {
    let e: string = 'Tareas';
    return new Promise<ITarea[]>((resolve, errorEvent) => { this.getEntidad(e, id).then(resolveE => { resolve(resolveE as ITarea[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }

  //Endpoint editar o grabar tarea.
  grabarTarea(t: ITarea) {
    let e: string = 'Tareas';
    return new Promise<ITarea[]>((resolve, errorEvent) => { this.setEntidad(e, t).then(resolveE => { resolve(resolveE as ITarea[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }

  reunionesDiarias_tareas(p: number) {
    let e: string = 'ReunionesDiarias_tareas';
    return new Promise<ITarea[]>((resolve, errorEvent) => { this.getEntidad(e, undefined, { p: p }).then(resolveE => { resolve(resolveE as ITarea[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }

    reunionesDiarias(id: number) {
    let e: string = 'ReunionesDiarias';
    return new Promise<any[]>((resolve, errorEvent) => { this.getEntidad(e, id).then(resolveE => { resolve(resolveE as any[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }

  grabarReunionesDiarias(r: any) {
    let e: string = 'ReunionesDiarias';
    return new Promise<any[]>((resolve, errorEvent) => { this.setEntidad(e, r).then(resolveE => { resolve(resolveE as any[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }



}
