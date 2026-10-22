import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  menuAbierto = signal<boolean>(false);

  constructor(private elementRef: ElementRef) {}

  toggleMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (this.menuAbierto() && !this.elementRef.nativeElement.contains(event.target)) {
      this.cerrarMenu();
    }
  }
}
