import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tabla } from "./Components/tabla/tabla";

@Component({
  selector: 'app-root',
  imports: [Tabla],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CarritoAngular');
}
