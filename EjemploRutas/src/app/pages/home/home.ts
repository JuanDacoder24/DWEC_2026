import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ServiciosProServices } from '../../services/servicios-pro-services';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  miServicio = inject(ServiciosProServices)
  router = inject(Router)

  getSuscribe(suscribeForm: NgForm) {
    if(suscribeForm.value.email !== ""){
      let email = suscribeForm.value.email
      this.miServicio.registrarEmail(email)
      this.router.navigate(['/servicios'])
      suscribeForm.reset();
    }else{
      alert("El campo debe estar relleno")
    }
  }

}
