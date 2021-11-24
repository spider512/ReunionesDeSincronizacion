import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { InicioComponent } from './inicio/inicio.component';

import { ReunionDiariaComponent } from './reunion-diaria/reunion-diaria.component';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageReunionesDiariasModule } from './page-reuniones-diarias/page-reuniones-diarias.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InicioComponent,
    ReunionDiariaComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    NoopAnimationsModule,
    PageReunionesDiariasModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
