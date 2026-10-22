import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PreguntaQuiz {
  id: number;
  enunciado: string;
  opcionA: string;
  opcionB: string;
  opcionC: string;
  opcionD: string;
  respuestaCorrecta: number;
  explicacion: string;
  dimension: string;
}

export interface GuardarResultado {
  nombreParticipante: string;
  puntaje: number;
  totalPreguntas: number;
}

export interface ResultadoQuiz {
  id: number;
  nombreParticipante: string;
  puntaje: number;
  totalPreguntas: number;
  nivelComunicacion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/quiz`;

  getPreguntas(): Observable<PreguntaQuiz[]> {
    return this.http.get<PreguntaQuiz[]>(`${this.apiUrl}/preguntas`);
  }

  guardarResultado(payload: GuardarResultado): Observable<ResultadoQuiz> {
    return this.http.post<ResultadoQuiz>(`${this.apiUrl}/resultado`, payload);
  }

  getMejoresPuntajes(): Observable<ResultadoQuiz[]> {
    return this.http.get<ResultadoQuiz[]>(`${this.apiUrl}/mejores-puntajes`);
  }
}
