import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Feedback {
  id: number;
  nombre: string;
  tipoMensaje: string;
  mensaje: string;
  fecha: string;
}

export interface CrearFeedback {
  nombre: string;
  tipoMensaje: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/feedback`;

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  enviarFeedback(payload: CrearFeedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, payload);
  }
}
