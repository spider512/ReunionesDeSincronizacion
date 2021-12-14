import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IoService } from '../io.service';


@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent  {

  constructor(public io: IoService, public auth: AuthService, public ruta: Router){}


  irAProyectos() {
    this.ruta.navigate(['/seleccionar-proyecto'])
  }
}
