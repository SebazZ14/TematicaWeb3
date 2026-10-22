import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService, Feedback, CrearFeedback } from '../../services/feedback.service';

@Component({
  selector: 'app-buzon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buzon.component.html'
})
export class BuzonComponent implements OnInit {
  private feedbackService = inject(FeedbackService);

  mensajes = signal<Feedback[]>([]);
  cargando = signal<boolean>(true);
  enviando = signal<boolean>(false);
  mensajeExito = signal<string | null>(null);

  nuevoNombre = '';
  nuevoTipo = 'Sugerencia Constructiva';
  nuevoContenido = '';

  tiposMensaje = [
    'Sugerencia Constructiva',
    'Agradecimiento / Reconocimiento',
    'Caso Práctico / Consulta',
    'Retroalimentación del Proyecto'
  ];

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {
    this.cargando.set(true);
    this.feedbackService.getFeedback().subscribe({
      next: (data) => {
        this.mensajes.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.cargando.set(false);
      }
    });
  }

  enviarMensaje(): void {
    if (!this.nuevoContenido.trim()) {
      alert('Por favor, escribe el contenido de tu mensaje.');
      return;
    }

    this.enviando.set(true);
    this.mensajeExito.set(null);

    const payload: CrearFeedback = {
      nombre: this.nuevoNombre.trim() || 'Estudiante Anónimo',
      tipoMensaje: this.nuevoTipo,
      mensaje: this.nuevoContenido.trim()
    };

    this.feedbackService.enviarFeedback(payload).subscribe({
      next: (creado) => {
        this.enviando.set(false);
        this.nuevoNombre = '';
        this.nuevoContenido = '';
        this.mensajeExito.set('¡Tu mensaje fue registrado correctamente en PostgreSQL!');
        this.cargarMensajes();

        setTimeout(() => this.mensajeExito.set(null), 4000);
      },
      error: (err) => {
        console.error(err);
        this.enviando.set(false);
        alert('Ocurrió un error al enviar el mensaje al servidor.');
      }
    });
  }
}
