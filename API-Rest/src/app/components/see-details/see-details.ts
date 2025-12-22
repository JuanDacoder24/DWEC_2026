import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { Router, RouterLink } from '@angular/router';
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
  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  miUsuario!: IUsuario

  constructor() { }

  async ngOnInit(): Promise<void> {
    try {
      const id = this.activatedRouter.snapshot.params['_id']
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
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Estas seguro?",
          text: "No podras revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "El usuario ha sido eliminado con exito",
              icon: "success"
            });
            this.router.navigate(['/home'])
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              icon: "error"
            });
          }
        });
      }
    }

  updateUser() {

  }

  
}
