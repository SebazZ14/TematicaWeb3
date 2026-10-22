import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { FeedbackService, Feedback, CrearFeedback } from '../../services/feedback.service';

@Component({
  selector: 'app-buzon',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
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

  errorNombre = signal<string | null>(null);
  errorMensaje = signal<string | null>(null);

  validarNombre(): boolean {
    const nom = this.nuevoNombre.trim();
    if (nom.length > 0) {
      if (nom.length < 2 || nom.length > 60) {
        this.errorNombre.set('El nombre debe tener entre 2 y 60 caracteres.');
        return false;
      }
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/;
      if (!regex.test(nom)) {
        this.errorNombre.set('El nombre contiene caracteres especiales no válidos (evita $, <, >, {, }, scripts).');
        return false;
      }
    }
    this.errorNombre.set(null);
    return true;
  }

  validarMensaje(): boolean {
    const msg = this.nuevoContenido.trim();
    if (!msg) {
      this.errorMensaje.set('Por favor, escribe el contenido de tu mensaje.');
      return false;
    }
    if (msg.length < 5 || msg.length > 500) {
      this.errorMensaje.set('El mensaje debe tener entre 5 y 500 caracteres.');
      return false;
    }
    const regexInyeccion = /[<>{}\[\]\\^`$]/;
    if (regexInyeccion.test(msg)) {
      this.errorMensaje.set('Por seguridad, el mensaje no debe contener etiquetas HTML, scripts o caracteres de inyección ($ < > { } [ ] \\ ^ `).');
      return false;
    }
    this.errorMensaje.set(null);
    return true;
  }

  enviarMensaje(): void {
    const esNombreValido = this.validarNombre();
    const esMensajeValido = this.validarMensaje();

    if (!esNombreValido || !esMensajeValido) {
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
        this.errorNombre.set(null);
        this.errorMensaje.set(null);
        this.mensajeExito.set('¡Tu mensaje fue sanitizado y registrado correctamente en PostgreSQL!');
        this.cargarMensajes();

        setTimeout(() => this.mensajeExito.set(null), 4000);
      },
      error: (err) => {
        console.error('Error al enviar feedback:', err);
        this.enviando.set(false);
        const backendError = err.error?.detalles?.mensaje
          || err.error?.detalles?.nombre
          || err.error?.mensaje
          || 'Ocurrió un error al enviar el mensaje al servidor.';
        this.errorMensaje.set(backendError);
      }
    });
  }
}
