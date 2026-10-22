import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { ArticuloService, Articulo } from '../../services/articulo.service';

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

  abrirDetalle(articulo: Articulo): void {
    this.articuloSeleccionado.set(articulo);
  }

  cerrarDetalle(): void {
    this.articuloSeleccionado.set(null);
  }
}
