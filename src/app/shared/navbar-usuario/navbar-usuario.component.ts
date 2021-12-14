import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { IoService } from '../io.service';


@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent implements OnInit {

  constructor(public io:IoService, public auth:AuthService) { }

  ngOnInit(): void {
  }

}
