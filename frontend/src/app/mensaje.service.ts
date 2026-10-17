import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MensajeDTO {
  id: number;
  texto: string;
}

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/mensaje';

  obtenerMensaje(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl);
  }
}