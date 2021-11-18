import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username?: string;

  public password?: string;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  public login() {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password);
      console.log(this.auth.loginInfo);
    }
  }

}
