import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {

  arrTareas : any [] = [];

  newTarea: any = {
    id: "",
    nombre : "",
    descripcion : ""
  }

  constructor(){

  }

  guardarDatos(){
    //Con esto hago que me guardes la informaion en el array con los datos de Tarea
    this.arrTareas.push(this.newTarea);
    //Con esto lo reinicio entre comillas para que asi se guarden de manera idependiente
    this.newTarea = {
      id: "",
      nombre : "",
      descripcion : ""
    }

    //Luego por consola pintar el array
    console.log(this.arrTareas);
  }

  eliminarTarea(id: string){
    //Con esto vamos a filtrar manteniendo solo las tareas quer sean diferentes al id escrito
    this.arrTareas = this.arrTareas.filter(tarea => tarea.id !== id);
    //Pintamos por consola
    console.log("Tarea eliminada. Tareas actuales: " , this.arrTareas);
  }


}
