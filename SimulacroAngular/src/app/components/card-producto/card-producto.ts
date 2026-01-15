import { ProductServices } from './../../services/product-services';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.css',
})
export class CardProducto {

  private productServices = inject(ProductServices)
  private router = inject(Router)

  @Input() product!: IProduct

  @Output() productoEliminado = new EventEmitter<string>();

  constructor(){}

  async deleteProduct(product: IProduct){
    const response = await this.productServices.deleteByid(product._id)
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
            this.productoEliminado.emit(product._id);
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

  seeDetails(product: IProduct){
    this.router.navigate(['/product-list', product._id])
  }
  
}
