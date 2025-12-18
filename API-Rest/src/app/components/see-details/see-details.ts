import { Component, inject, Input } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-see-details',
  imports: [RouterLink],
  templateUrl: './see-details.html',
  styleUrl: './see-details.css',
})
export class SeeDetails {

  serviceUsuario = inject(ServicioUsuario)
  router = inject(ActivatedRoute)

  miUsuario!: IUsuario

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      const id = this.router.snapshot.params['_id']
      this.miUsuario = await this.serviceUsuario.getUserById(id)
      console.log(id)
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oh...",
        text: "Error al mostrar el usuario"
      });
    }
  }

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

  updateUser() {
    
  }

}
