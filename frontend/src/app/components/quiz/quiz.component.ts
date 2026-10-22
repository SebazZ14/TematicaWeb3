import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { QuizService, PreguntaQuiz, ResultadoQuiz } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit {
  private quizService = inject(QuizService);

  preguntas = signal<PreguntaQuiz[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  indiceActual = signal<number>(0);
  respuestasSeleccionadas = signal<{ [preguntaId: number]: number }>({});
  quizFinalizado = signal<boolean>(false);
  puntajeCalculado = signal<number>(0);

  nombreParticipante = '';
  errorValidacion = signal<string | null>(null);
  guardandoResultado = signal<boolean>(false);
  resultadoGuardado = signal<ResultadoQuiz | null>(null);
  mejoresPuntajes = signal<ResultadoQuiz[]>([]);
  mostrarExplicaciones = signal<boolean>(false);

  validarNombre(): boolean {
    const val = this.nombreParticipante.trim();
    if (!val) {
      this.errorValidacion.set('Por favor, ingresa tu nombre para registrar tu resultado.');
      return false;
    }
    if (val.length < 2 || val.length > 60) {
      this.errorValidacion.set('El nombre debe tener entre 2 y 60 caracteres.');
      return false;
    }
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/;
    if (!regex.test(val)) {
      this.errorValidacion.set('No se permiten caracteres especiales como $, <, >, {, }, scripts ni inyecciones de código. Solo se permiten letras y espacios.');
      return false;
    }
    this.errorValidacion.set(null);
    return true;
  }

  toggleExplicaciones(): void {
    this.mostrarExplicaciones.update((v) => !v);
  }

  ngOnInit(): void {
    this.cargarPreguntas();
    this.cargarMejoresPuntajes();
  }

  cargarPreguntas(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.quizService.getPreguntas().subscribe({
      next: (data) => {
        this.preguntas.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se pudieron recuperar las preguntas del quiz desde PostgreSQL.');
        this.cargando.set(false);
      }
    });
  }

  cargarMejoresPuntajes(): void {
    this.quizService.getMejoresPuntajes().subscribe({
      next: (data) => {
        this.mejoresPuntajes.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  seleccionarOpcion(opcionNumero: number): void {
    const pregunta = this.preguntaActual;
    if (!pregunta) return;

    this.respuestasSeleccionadas.update((map) => ({
      ...map,
      [pregunta.id]: opcionNumero
    }));
  }

  get preguntaActual(): PreguntaQuiz | undefined {
    return this.preguntas()[this.indiceActual()];
  }

  get totalPreguntas(): number {
    return this.preguntas().length;
  }

  get opcionSeleccionadaActual(): number | undefined {
    const pregunta = this.preguntaActual;
    return pregunta ? this.respuestasSeleccionadas()[pregunta.id] : undefined;
  }

  siguientePregunta(): void {
    if (this.indiceActual() < this.totalPreguntas - 1) {
      this.indiceActual.update((idx) => idx + 1);
    } else {
      this.finalizarQuiz();
    }
  }

  anteriorPregunta(): void {
    if (this.indiceActual() > 0) {
      this.indiceActual.update((idx) => idx - 1);
    }
  }

  finalizarQuiz(): void {
    let aciertos = 0;
    const respuestas = this.respuestasSeleccionadas();

    for (const preg of this.preguntas()) {
      if (respuestas[preg.id] === preg.respuestaCorrecta) {
        aciertos++;
      }
    }

    this.puntajeCalculado.set(aciertos);
    this.quizFinalizado.set(true);
  }

  guardarResultadoEnBD(): void {
    if (!this.validarNombre()) {
      return;
    }

    this.guardandoResultado.set(true);
    const payload = {
      nombreParticipante: this.nombreParticipante.trim(),
      puntaje: this.puntajeCalculado(),
      totalPreguntas: this.totalPreguntas
    };

    this.quizService.guardarResultado(payload).subscribe({
      next: (resultado) => {
        this.resultadoGuardado.set(resultado);
        this.guardandoResultado.set(false);
        this.errorValidacion.set(null);
        this.cargarMejoresPuntajes();
      },
      error: (err) => {
        console.error('Error al guardar resultado:', err);
        this.guardandoResultado.set(false);
        const backendError = err.error?.detalles?.nombreParticipante
          || err.error?.mensaje
          || 'Ocurrió un error al registrar el resultado en la base de datos.';
        this.errorValidacion.set(backendError);
      }
    });
  }

  reiniciarQuiz(): void {
    this.indiceActual.set(0);
    this.respuestasSeleccionadas.set({});
    this.quizFinalizado.set(false);
    this.puntajeCalculado.set(0);
    this.resultadoGuardado.set(null);
    this.nombreParticipante = '';
  }
}
