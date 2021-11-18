import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public loginInfo?:any;
  constructor() { }


login (usuario:string,password:string):any{

  this.loginInfo= [{
    "uiSesion": 'aaaaaa11112323343532',
    "usuario": 1,
    "nombre": 'Juan',
    "apellido": 'Perez',
    "login": 'jperez',
    "email": 'jperez@microsoft.com',
    "celular": '124398439',
    "roles":  [{'rol':'FORMS_ADM'},{'rol':'FORMS_INT'}],
    "av": 1,
    "perfiles": []
 }]
 return this.loginInfo;
}


isLogged():boolean{
  return this.loginInfo!=null; 
}

}
