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
  guardandoResultado = signal<boolean>(false);
  resultadoGuardado = signal<ResultadoQuiz | null>(null);
  mejoresPuntajes = signal<ResultadoQuiz[]>([]);
  mostrarExplicaciones = signal<boolean>(false);

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
    if (!this.nombreParticipante.trim()) {
      alert('Por favor, ingresa tu nombre para registrar tu resultado.');
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
        this.cargarMejoresPuntajes();
      },
      error: (err) => {
        console.error(err);
        this.guardandoResultado.set(false);
        alert('Ocurrió un error al registrar el resultado en la base de datos.');
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
