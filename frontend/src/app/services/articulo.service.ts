import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articulo {
  id: number;
  titulo: string;
  categoria: string;
  resumen: string;
  contenido: string;
  icono: string;
  tiempoLectura: number;
  autor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/articulos';

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticuloPorId(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }
}
