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
    this.arrayNoticias = [
      { id: 1, titulo: "Álex Márquez supera en un vibrante duelo a Pedro Acosta y gana la carrera al sprint del GP de Portugal", url: "https://img2.rtve.es/i/?w=1600&i=01762616306874.jpg", cuerpo:"El español Alex Márquez (Ducati Desmosedici GP24) ha logrado su segunda victoria 'sprint' de la temporada al vencer la del Gran Premio de Portugal de MotoGP, que se ha disputado en el circuito de Portimao.Alex Márquez supo esperar su oportunidad para doblegar al líder inicial de una carrera programada a 12 vueltas, el español Pedro Acosta (KTM RC 16), que se tuvo que conformar con la segunda posición, por delante del italiano Marco Bezzecchi (Aprilia RS-GP).Acosta estaba por primera vez en la línea frontal de salida en lo que va de la temporada, mientras que el autor de la 'pole position', el italiano Marco Bezzecchi (Aprilia RS-GP), buscó enfilar en primera posición la curva de final de recta al apagarse el semáforo rojo, un objetivo que logró a pesar de que se levantó la rueda delantera de su moto en los metros iniciales.", fecha:"08/11/2025" },
      { id: 2, titulo: "Piastri estrella muchas de sus opciones al Mundial en la carrera al sprint de Brasil y Norris gana para ser más líder", url: "https://img2.rtve.es/i/?w=1600&i=01762613506136.jpg", cuerpo:"A falta de solo cuatro pruebas, la presión está pudiendo con Oscar Piastri cuando se acercaba a su primer Mundial de Fórmula 1. Si ya había perdido su ventaja, que llegó a ser cercana a 30 puntos respecto a su compañero en McLaren Lando Norris, en la carrera al sprint del GP de Brasil el australiano ha podido enterrar muchas de sus opciones al título.Piastri se salió en la vuelta 7, cuando rodaba en tercera plaza. Su accidente, que provocó también la salida de pista de Colapinto y Hulkenberg, provocó una bandera roja durante varios minutos. La organización decidió realizar una salida lanzada en vez de repetir la salida original, que dejó poco cambio en la parrilla.", fecha:"08/11/2025" },
      
    ];
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
