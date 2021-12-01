import { Component, OnInit,NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public username?: string;

	public password?: string;

	constructor(public auth: AuthService, public ruta : Router) { }

	ngOnInit(): void {
	}

	public login() {
		if (this.username && this.password) {
			this.auth.login(this.username, this.password);
			console.log(this.auth.loginInfo);
		}
		this.ruta.navigate(['/inicio'])

	}

}
