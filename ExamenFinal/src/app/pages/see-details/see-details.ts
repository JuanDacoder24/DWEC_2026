import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NinjaServices } from '../../services/ninja-services';
import { INinja } from '../../interfaces/ininja';

@Component({
  selector: 'app-see-details',
  imports: [CommonModule],
  templateUrl: './see-details.html',
  styleUrl: './see-details.css',
})
export class SeeDetails implements OnInit { 

  ninjaService = inject(NinjaServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  ninja: INinja | null = null
  currentImageIndex: number = 0

  ngOnInit(): void {
    this.cargarNinja();
  }

  async cargarNinja() {
    const id = this.activatedRoute.snapshot.params['id'];

    try {
      this.ninja = await this.ninjaService.getById(id);
      console.log('Ninja cargado:', this.ninja); 
    } catch (error) {
      console.error('Error al cargar el ninja:', error)
      this.router.navigate(['/dashboard/list'])
    }
  }

  get images(): string[] {
    if (!this.ninja) return [];

    const imgs = [this.ninja.image1, this.ninja.image2]
      .filter(img => img && img.trim() !== '');

    console.log('Imágenes:', imgs); 
    return imgs.length > 0 ? imgs : ['https://via.placeholder.com/600x400'];
  }

   // Acciones
  editNinja() {
    this.router.navigate(['/dashboard/form', this.ninja?.id]);
  }

  async deleteNinja() {
    if (!this.ninja) return;
    
    const confirmed = confirm(`¿Estás seguro de eliminar a ${this.ninja.ninjaName}?`);
    
    if (confirmed) {
      try {
        await this.ninjaService.delete(this.ninja.id);
        alert('Ninja eliminado correctamente');
        this.router.navigate(['/dashboard/list']);
      } catch (error) {
        console.error('Error eliminando ninja:', error);
        alert('Error al eliminar el ninja');
      }
    }
  }
  
  goBack() {
    this.router.navigate(['/dashboard/list']);
  }

}
