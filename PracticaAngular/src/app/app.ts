import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Lista } from './Components/lista/lista';
import { Formulario } from './Components/formulario/formulario';

@Component({
  selector: 'app-root',
  imports: [Lista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PracticaAngular');
}
