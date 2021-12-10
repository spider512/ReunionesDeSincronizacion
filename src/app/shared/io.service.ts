import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { IProyecto } from './clases';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  public loginInfo: any = this.auth.loginInfo;
  
  constructor(public auth: AuthService, private http: HttpClient) { }

  getEntidad(entidad: string, id?: number) {
    return new Promise((resolve, errorEvent) => {

      let params: string;
      if (id)
        params = `${this.auth.UrlEntidad}/${entidad}/{"id":${id}}`;
      else
        params = `${this.auth.UrlEntidad}/${entidad}`;

      console.log(this.auth.headers);

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
    throw new Error('Method not implemented.');
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



  proyectos(id?: number) {
    let e: string = 'Proyectos';
    return new Promise<IProyecto[]>((resolve, errorEvent) => { this.getEntidad(e, id).then(resolveE => { resolve(resolveE as IProyecto[]); }).catch(errorEventE => { errorEvent(errorEventE); }) });
  }

}
