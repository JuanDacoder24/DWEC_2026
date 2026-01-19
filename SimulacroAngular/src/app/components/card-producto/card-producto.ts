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

  // Primero confirmar, luego eliminar
  async deleteProduct(product: IProduct) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    // Primero mostrar la confirmación
    const result = await swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    });

    // Si confirma, entonces eliminar
    if (result.isConfirmed) {
      try {
        console.log('Eliminando producto:', product._id);
        const response = await this.productServices.deleteByid(product._id);
        
        if (response._id || response) {
          // Emitir evento al padre
          this.productoEliminado.emit(product._id);
          
          await swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: "El producto ha sido eliminado con éxito",
            icon: "success"
          });
        }
      } catch (error) {
        console.error('Error al eliminar:', error);
        await swalWithBootstrapButtons.fire({
          title: "Error",
          text: "No se pudo eliminar el producto",
          icon: "error"
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "El producto está a salvo",
        icon: "error"
      });
    }
  }

  editarProducto(product: IProduct) {
    // Navega al formulario con el ID del producto
    this.router.navigate(['/dashboard/form', product._id]);
  }
}