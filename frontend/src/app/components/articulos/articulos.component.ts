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
      titulo: 'Habilidades para la Vida: Comunicación Asertiva y Empatía',
      tipo: 'Guía Oficial / Documento Técnico',
      badgeClass: 'bg-danger bg-opacity-10 text-danger',
      fuente: 'Organización Panamericana de la Salud (OPS/OMS)',
      descripcion: 'Marco normativo y conceptual sobre el desarrollo de habilidades socioemocionales para el diálogo respetuoso y la prevención de conflictos.',
      url: 'https://www.paho.org/es/temas/desarrollo-saludable-adolescentes-jovenes',
      icono: 'bi-file-earmark-pdf-fill text-danger'
    },
    {
      titulo: 'Metodología de la Comunicación No Violenta (CNV)',
      tipo: 'Manual de Convivencia',
      badgeClass: 'bg-primary bg-opacity-10 text-primary',
      fuente: 'Center for Nonviolent Communication (CNVC)',
      descripcion: 'Guía práctica para estructurar observaciones, expresar sentimientos y formular peticiones sin agresividad (Base del Método DEPO).',
      url: 'https://www.cnvc.org',
      icono: 'bi-chat-quote-fill text-primary'
    },
    {
      titulo: 'How to Improve Your Active Listening Skills',
      tipo: 'Artículo Académico',
      badgeClass: 'bg-success bg-opacity-10 text-success',
      fuente: 'Harvard Professional Development',
      descripcion: 'Investigaciones de Harvard sobre cómo silenciar el juicio interno, validar al interlocutor y generar confianza en equipos colaborativos.',
      url: 'https://professional.dce.harvard.edu/blog/how-to-improve-your-active-listening-skills/',
      icono: 'bi-mortarboard-fill text-success'
    },
    {
      titulo: 'Comunicación y Transparencia en Equipos de Software Ágiles',
      tipo: 'Framework de Ingeniería',
      badgeClass: 'bg-info bg-opacity-10 text-info',
      fuente: 'Scrum.org / Agile Alliance',
      descripcion: 'Pautas para revisiones de código asertivas, retrospectivas constructivas y alineación de equipos técnicos de alto desempeño.',
      url: 'https://www.scrum.org/resources/blog/five-values-scrum-openness-respect-focus-commitment-courage',
      icono: 'bi-code-square text-info'
    },
    {
      titulo: 'Cómo hablar de forma que la gente te quiera escuchar',
      tipo: 'Video Conferencia TED',
      badgeClass: 'bg-warning bg-opacity-10 text-dark',
      fuente: 'Julian Treasure (TED Talks)',
      descripcion: 'Conferencia audiovisual con más de 50M de reproducciones sobre los 4 pilares del habla efectiva (Honestidad, Autenticidad, Integridad y Afecto).',
      url: 'https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen',
      icono: 'bi-play-circle-fill text-warning'
    },
    {
      titulo: '10 maneras de tener una mejor conversación',
      tipo: 'Video Conferencia TED',
      badgeClass: 'bg-warning bg-opacity-10 text-dark',
      fuente: 'Celeste Headlee (TED Talks)',
      descripcion: 'Reglas fundamentales para escuchar con atención, no pontificar, admitir lo que no sabemos y comunicarse sin rodeos.',
      url: 'https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation',
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
        nombre: 'Guía de Asertividad - OPS/OMS',
        url: 'https://www.paho.org/es/temas/desarrollo-saludable-adolescentes-jovenes',
        tipo: 'Documento de Consulta'
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
        nombre: 'Harvard Professional Development - Active Listening',
        url: 'https://professional.dce.harvard.edu/blog/how-to-improve-your-active-listening-skills/',
        tipo: 'Publicación Académica'
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
        nombre: 'Charla TED - Julian Treasure: Sonido y Voz',
        url: 'https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen',
        tipo: 'Video Educativo'
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
        nombre: 'Center for Nonviolent Communication (CNVC)',
        url: 'https://www.cnvc.org',
        tipo: 'Guía Metodológica'
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

