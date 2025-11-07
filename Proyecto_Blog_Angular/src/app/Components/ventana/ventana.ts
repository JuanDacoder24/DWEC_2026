import { Component } from '@angular/core';
import { Blog } from '../blog/blog';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.html',
  styleUrl: './ventana.css',
})
export class Ventana {
  

  newNoticia: boolean = true; 

  constructor() {
  }

  verificarNoticias() {
    this.newNoticia = false; 
  }
}
