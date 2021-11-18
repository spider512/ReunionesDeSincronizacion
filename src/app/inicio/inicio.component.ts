import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  reunionDiaria() {
    this.router.navigate([`/reunion-diaria`]);
  }

}
