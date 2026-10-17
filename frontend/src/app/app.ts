import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeService, MensajeDTO } from './mensaje.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private mensajeService = inject(MensajeService);
  
  mensaje = signal<MensajeDTO | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarSaludo();
  }

  cargarSaludo(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.mensajeService.obtenerMensaje().subscribe({
      next: (data) => {
        this.mensaje.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se pudo conectar con el backend (Spring Boot). Â¿EstÃ¡ levantado en el puerto 8080?');
        this.cargando.set(false);
      }
    });
  }
}