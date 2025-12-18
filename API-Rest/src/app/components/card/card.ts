import { IUsuario } from './../../interfaces/iusuario';
import { Component, inject, Input } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  serviceUsuario = inject(ServicioUsuario)
  router = inject(Router)

  @Input() miUsuario!: IUsuario

  async deleteUser(user: IUsuario) {
    const response = await this.serviceUsuario.deleteById(user._id)
    if (response._id) {
      Swal.fire({
        title: "Se ha eliminado correctamente",
        icon: "success",
        draggable: true
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lo sentimos",
        text: "No se pudo eliminar al usuario, intentelo otra vez"
      });
    }
  }

  seeDetails(user: IUsuario) {
    this.router.navigate(['/seeDetails', user._id])
  }

  updateUser(user: IUsuario) {
    this.router.navigate(['/form', user._id])
  }

}
