import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IoService } from '../shared/io.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public username?: string;

	public password?: string;

	constructor(public auth: AuthService, public ruta: Router, public io: IoService) { }

	ngOnInit(): void {
	}

	async login() {
		if (this.username && this.password) {
			try {
				this.auth.loginInfo = await this.auth.login(this.username, this.password);
				// console.log(this.auth.loginInfo);
				this.ruta.navigate(['/seleccionar-proyecto']);

				// let proyectos = await this.io.proyectos();

				// console.log(proyectos);


			}

			catch (error) {
				console.log(error);
			}


		}

	}
}