import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { ArticuloService, Articulo } from '../../services/articulo.service';

export interface RecursoConsulta {
  titulo: string;
  tipo: string;
  badgeClass: string;
  fuente: string;
  descripcion: string;
  url: string;
  icono: string;
}

export interface DetalleMultimedia {
  imagenUrl: string;
  pieDeFoto: string;
  infografiaClave: {
    titulo: string;
    items: { icono: string; titulo: string; detalle: string }[];
  };
  recursoAsociado: {
    nombre: string;
    url: string;
    tipo: string;
  };
}

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './articulos.component.html'
})
export class ArticulosComponent implements OnInit {
  private articuloService = inject(ArticuloService);

  articulos = signal<Articulo[]>([]);
  categoriaSeleccionada = signal<string>('Todas');
  articuloSeleccionado = signal<Articulo | null>(null);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  categorias = ['Todas', 'Asertividad', 'Escucha Activa', 'Lenguaje No Verbal', 'Resolución de Conflictos'];

  // Catálogo oficial de Recursos y Material de Consulta (Convocatoria Sección B)
  recursosConsulta: RecursoConsulta[] = [
    {
      titulo: 'Teoría y Práctica de la Comunicación Asertiva',
      tipo: 'Marco Teórico / Enciclopedia',
      badgeClass: 'bg-primary bg-opacity-10 text-primary',
      fuente: 'Enciclopedia Académica de Psicología y Comunicación',
      descripcion: 'Estudio sobre los estilos de conducta (pasivo, agresivo y asertivo), derechos asertivos y técnicas de autoafirmación respetuosa.',
      url: 'https://es.wikipedia.org/wiki/Asertividad',
      icono: 'bi-book-half text-primary'
    },
    {
      titulo: 'Metodología de la Comunicación No Violenta (CNV)',
      tipo: 'Manual de Convivencia y Diálogo',
      badgeClass: 'bg-success bg-opacity-10 text-success',
      fuente: 'Center for Nonviolent Communication (CNVC Oficial)',
      descripcion: 'Enfoque estructurado para transformar conflictos mediante el mensaje en primera persona y la empatía (Base del Método DEPO).',
      url: 'https://www.cnvc.org/',
      icono: 'bi-chat-heart-fill text-success'
    },
    {
      titulo: 'Fundamentos y Técnicas de la Escucha Activa',
      tipo: 'Artículo Académico de Consulta',
      badgeClass: 'bg-info bg-opacity-10 text-info',
      fuente: 'Compendio de Habilidades Sociales e Interpersonales',
      descripcion: 'Bases teóricas de la atención plena, validación emocional del interlocutor, paráfrasis clarificadora y erradicación de barreras comunicativas.',
      url: 'https://es.wikipedia.org/wiki/Escucha_activa',
      icono: 'bi-ear-fill text-info'
    },
    {
      titulo: 'Comunicación No Verbal: Gestos, Postura y Modulación',
      tipo: 'Guía de Estudio Semiótico',
      badgeClass: 'bg-danger bg-opacity-10 text-danger',
      fuente: 'Estudios de Kinésica y Comunicación Interpersonal',
      descripcion: 'Análisis de la kinésica, proxémica, microexpresiones faciales y la coherencia corporal indispensable en exposiciones y trabajo colaborativo.',
      url: 'https://es.wikipedia.org/wiki/Comunicaci%C3%B3n_no_verbal',
      icono: 'bi-person-check-fill text-danger'
    },
    {
      titulo: 'Cómo hablar de forma que la gente te quiera escuchar',
      tipo: 'Video Conferencia TED',
      badgeClass: 'bg-warning bg-opacity-10 text-dark',
      fuente: 'Julian Treasure (YouTube / TED Talks)',
      descripcion: 'Conferencia audiovisual con más de 50M de reproducciones sobre los 4 pilares vocales del habla asertiva (HAIL: Honestidad, Autenticidad, Integridad y Afecto).',
      url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
      icono: 'bi-play-circle-fill text-warning'
    },
    {
      titulo: '10 maneras de tener una mejor conversación',
      tipo: 'Video Conferencia TED',
      badgeClass: 'bg-warning bg-opacity-10 text-dark',
      fuente: 'Celeste Headlee (YouTube / TED Talks)',
      descripcion: 'Reglas fundamentales prácticas para escuchar con atención plena, admitir la incertidumbre con humildad y comunicarse sin divagar.',
      url: 'https://www.youtube.com/watch?v=R1vskiVDwl4',
      icono: 'bi-youtube text-danger'
    }
  ];

  // Mapeo multimedia por categoría
  private mediaPorCategoria: Record<string, DetalleMultimedia> = {
    'Asertividad': {
      imagenUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      pieDeFoto: 'Interacción asertiva en equipos de trabajo: defendiendo ideas con respeto y firmeza.',
      infografiaClave: {
        titulo: 'Esquema Comparativo de los 3 Estilos',
        items: [
          { icono: 'bi-shield-x text-muted', titulo: 'Pasivo', detalle: 'Evita hablar, reprime opiniones y sacrifica sus derechos por temor.' },
          { icono: 'bi-lightning-fill text-danger', titulo: 'Agresivo', detalle: 'Impone su criterio, interrumpe y descalifica a los demás.' },
          { icono: 'bi-check-circle-fill text-success', titulo: 'Asertivo', detalle: 'Expresa con claridad, mantiene respeto mutuo y busca acuerdos.' }
        ]
      },
      recursoAsociado: {
        nombre: 'Guía de Asertividad y Derechos Asertivos',
        url: 'https://es.wikipedia.org/wiki/Asertividad',
        tipo: 'Material de Consulta'
      }
    },
    'Escucha Activa': {
      imagenUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      pieDeFoto: 'Escucha empática en desarrollo colaborativo: entender los requerimientos antes de debatir.',
      infografiaClave: {
        titulo: 'Técnicas Clave de la Escucha Activa',
        items: [
          { icono: 'bi-volume-mute-fill text-primary', titulo: 'Silencio Consciente', detalle: 'No preparar la respuesta mental mientras el otro habla.' },
          { icono: 'bi-arrow-repeat text-success', titulo: 'Parafraseo', detalle: 'Confirmar: "Si te entendí bien, lo que necesitas es..."' },
          { icono: 'bi-eye-fill text-info', titulo: 'Atención Plena', detalle: 'Contacto visual equilibrado y cero distracciones con pantallas.' }
        ]
      },
      recursoAsociado: {
        nombre: 'Principios y Técnicas de la Escucha Activa',
        url: 'https://es.wikipedia.org/wiki/Escucha_activa',
        tipo: 'Material de Consulta'
      }
    },
    'Lenguaje No Verbal': {
      imagenUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80',
      pieDeFoto: 'Coherencia no verbal: el tono, la mirada y los gestos fortalecen la credibilidad.',
      infografiaClave: {
        titulo: 'Regla 7-38-55 de Albert Mehrabian',
        items: [
          { icono: 'bi-chat-left-text text-secondary', titulo: '7% Palabras', detalle: 'El contenido literal del mensaje verbal.' },
          { icono: 'bi-soundwave text-warning', titulo: '38% Voz y Tono', detalle: 'Modulación, ritmo, volumen y pausas estratégicas.' },
          { icono: 'bi-person-arms-up text-primary', titulo: '55% Postura Corporal', detalle: 'Contacto visual, expresiones faciales y gestos.' }
        ]
      },
      recursoAsociado: {
        nombre: 'Estudios de Comunicación No Verbal y Kinésica',
        url: 'https://es.wikipedia.org/wiki/Comunicaci%C3%B3n_no_verbal',
        tipo: 'Material de Consulta'
      }
    },
    'Resolución de Conflictos': {
      imagenUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
      pieDeFoto: 'Acuerdos de equipo: abordando el problema de manera objetiva sin ataques personales.',
      infografiaClave: {
        titulo: 'Fórmula del Método DEPO (Mensaje Yo)',
        items: [
          { icono: 'bi-card-text text-primary', titulo: 'D - Describir', detalle: 'Exponer el hecho objetivo sin juzgar ni acusar.' },
          { icono: 'bi-heart-half text-danger', titulo: 'E - Expresar', detalle: 'Manifestar el impacto o sentir en primera persona.' },
          { icono: 'bi-lightbulb-fill text-warning', titulo: 'P - Proponer', detalle: 'Sugerir una solución concreta y constructiva.' },
          { icono: 'bi-hand-thumbs-up-fill text-success', titulo: 'O - Obtener', detalle: 'Resaltar el beneficio mutuo de trabajar en armonía.' }
        ]
      },
      recursoAsociado: {
        nombre: 'Métodos y Modelos de Resolución de Conflictos',
        url: 'https://es.wikipedia.org/wiki/Resoluci%C3%B3n_de_conflictos',
        tipo: 'Material de Consulta'
      }
    }
  };

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se pudo cargar el material educativo desde el servidor.');
        this.cargando.set(false);
      }
    });
  }

  filtrarPorCategoria(cat: string): void {
    this.categoriaSeleccionada.set(cat);
  }

  get articulosFiltrados(): Articulo[] {
    const cat = this.categoriaSeleccionada();
    if (cat === 'Todas') {
      return this.articulos();
    }
    return this.articulos().filter((a) => a.categoria.toLowerCase() === cat.toLowerCase());
  }

  getMultimedia(categoria: string): DetalleMultimedia {
    return this.mediaPorCategoria[categoria] || {
      imagenUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      pieDeFoto: 'Comunicación Asertiva y Trabajo en Equipo.',
      infografiaClave: {
        titulo: 'Conceptos Esenciales',
        items: [
          { icono: 'bi-check2-circle text-primary', titulo: 'Claridad', detalle: 'Mensajes directos y sencillos.' },
          { icono: 'bi-check2-circle text-success', titulo: 'Respeto', detalle: 'Cuidado mutuo y empatía.' }
        ]
      },
      recursoAsociado: {
        nombre: 'Portal de Recursos de Comunicación',
        url: 'https://www.paho.org',
        tipo: 'Material de Consulta'
      }
    };
  }

  abrirDetalle(articulo: Articulo): void {
    this.articuloSeleccionado.set(articulo);
  }

  cerrarDetalle(): void {
    this.articuloSeleccionado.set(null);
  }
}

