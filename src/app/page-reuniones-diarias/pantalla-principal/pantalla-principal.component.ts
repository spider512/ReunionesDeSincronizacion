import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
  styleUrls: ['./pantalla-principal.component.css']
})
export class PantallaPrincipalComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  ayer() {
    this.router.navigate([`/ayer`]);
  }

  hoy() {
    this.router.navigate([`/hoy`]);
  }

  dificultades() {
    this.router.navigate([`/dificultades`]);
  }

  reunionDiaria() {
    this.router.navigate([`/reunion-diaria`]);
  }

}
