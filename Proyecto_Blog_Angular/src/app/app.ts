import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Blog } from './Components/blog/blog';

@Component({
  selector: 'app-root',
  imports: [Blog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto_Blog_Angular');
}
