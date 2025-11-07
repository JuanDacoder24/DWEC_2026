import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuerpoNoticia } from '../../Interface/CuerpoNoticia';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

  arrayNoticias : CuerpoNoticia[] = [];
  
  newNoticia : CuerpoNoticia = {
        id: 0,
        titulo: "",
        url: "",
        cuerpo: "",
        fecha: ""
      }

  constructor(){
  }

  guardarDatos(){
    //Con esto hago que me guarde la informaion en el array con los datos de la noticia
    this.arrayNoticias.push(this.newNoticia);
    //Con esto lo reinicio entre comillas para que asi se guarden de manera idependiente
    this.newNoticia = {
        id: 0,
        titulo: "",
        url: "",
        cuerpo: "",
        fecha: ""
    }

    //Luego por consola pintar el array para verificar
    console.log(this.arrayNoticias);
  }

}
