import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { BuzonComponent } from './components/buzon/buzon.component';
import { DesarrolladoresComponent } from './components/desarrolladores/desarrolladores.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    InicioComponent,
    ArticulosComponent,
    QuizComponent,
    BuzonComponent,
    DesarrolladoresComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}