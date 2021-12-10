import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const md5: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
  public loginInfo?: any;
  
  constructor(private http: HttpClient) { }
  private server: string = environment.endpoint;
  private UrlAuth: string = this.server + 'Auth';
  public  UrlEntidad: string = this.server + 'Entidad';
  
  public headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //'Content-Type':  'application/json'
  });

  private options = {
    headers: this.headers
  }
  public prefix: string = '';

  login(usuario: string, pwd: string, sistema: string = 'SINC'): any {
    return new Promise((resolve, errorEvent) => {

      let urlParams = new URLSearchParams();
      urlParams.append('usuario', usuario);
      urlParams.append('password', md5(pwd).toUpperCase());
      urlParams.append('modulo', sistema);
      let params: string = `${this.UrlAuth}/${usuario}?${urlParams.toString()}`;
      this.http.get(params, this.options)
        .subscribe(data => {
          let d: any
          if (typeof data === 'object')
            d = data
          else
            d = JSON.parse(data);

          if (d.length > 0)
            d = d[0];
    
          if (d.mensaje)
            errorEvent(d)
          else {
            this.loginInfo = d;
            this.prefix = sistema;

            let newHeaders = new HttpHeaders();
            newHeaders = newHeaders.append('x-sesion', this.loginInfo.sesion);
            newHeaders = newHeaders.append('x-prefix', this.prefix);
            newHeaders = newHeaders.append('Content-Type', 'application/json');
            
            this.headers = newHeaders;
            
            resolve(d);
          }
        }, error => {
          let msg: string = error.message;
          switch (error.name) {
            case 'HttpErrorResponse':
              msg = 'Error de comunicación con el servidor';
              break;
          }
          errorEvent({ "mensaje": msg });
          console.log(error);
        })
    });
  }

  isLogged(): boolean {
    return this.loginInfo != null;
  }






}
