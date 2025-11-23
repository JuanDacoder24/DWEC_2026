import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tabla } from "./Components/tabla/tabla";
import { Carrito } from "./Components/carrito/carrito";

@Component({
  selector: 'app-root',
  imports: [Tabla, Carrito],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CarritoAngular');
}
