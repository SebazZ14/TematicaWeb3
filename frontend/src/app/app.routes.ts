import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { BuzonComponent } from './components/buzon/buzon.component';
import { DesarrolladoresComponent } from './components/desarrolladores/desarrolladores.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, title: 'EduConnect | Inicio y Presentación' },
  { path: 'guias', component: ArticulosComponent, title: 'EduConnect | Guías Informativas' },
  { path: 'quiz', component: QuizComponent, title: 'EduConnect | Test Asertivo' },
  { path: 'buzon', component: BuzonComponent, title: 'EduConnect | Buzón de Práctica' },
  { path: 'desarrolladores', component: DesarrolladoresComponent, title: 'EduConnect | Equipo y Ficha Técnica' },
  { path: '**', redirectTo: 'inicio' }
];
