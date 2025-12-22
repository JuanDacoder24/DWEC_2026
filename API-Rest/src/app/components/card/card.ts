import { IUsuario } from './../../interfaces/iusuario';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

  //Outout para enviar informacion al padre, usando un EventEmitter
  //pasandole como parametro un string, en este caso es el _id del usuario
  @Output() usuarioEliminado = new EventEmitter<string>();


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
            //el emit dispara el evento y envia el _id del usaurio al componente padre
            this.usuarioEliminado.emit(user._id);
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "El usuario ha sido eliminado con exito",
              icon: "success"
            });
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

  onUsuarioEliminado(userId: string) {
    this.usuarioEliminado.emit(userId);
  }

  seeDetails(user: IUsuario) {
    this.router.navigate(['/seeDetails', user._id])
  }

  updateUser(user: IUsuario) {
    this.router.navigate(['/form', user._id])
  }

}
