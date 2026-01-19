import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HeroServices } from '../../services/hero-services';
import { Router } from '@angular/router';
import { ICharacter } from '../../interfaces/icharacter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-card',
  imports: [],
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.css',
})
export class HeroCard {

  private heroServices = inject(HeroServices)
  private router = inject(Router)

  @Input() hero!: ICharacter
  @Output() heroeEliminado = new EventEmitter<string>()

  constructor(){}

  // Primero confirmar, luego eliminar
  async deleteHero (hero: ICharacter){
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
        console.log('Eliminando producto:', hero.id);
        const response = await this.heroServices.deleteByid(hero.id);
        
        if (response.id || response) {
          // Emitir evento al padre
          this.heroeEliminado.emit(hero.id);
          
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

  editarHeroe(hero: ICharacter){
    this.router.navigate(['dashboard/heroForm', hero.id])
  }

}
