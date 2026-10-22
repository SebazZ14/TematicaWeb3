import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-desarrolladores',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './desarrolladores.component.html'
})
export class DesarrolladoresComponent {}
