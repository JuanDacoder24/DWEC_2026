import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  imports: [FormsModule, CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

  arrayNoticias : any[] = [];
  
  newNoticia : any = {
        id: "",
        titulo: "",
        url: "",
        cuerpo: "",
        fecha: ""
      }

  constructor(){
    
  }

}
