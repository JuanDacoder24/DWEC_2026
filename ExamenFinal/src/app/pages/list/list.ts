import { Component, inject, OnInit } from '@angular/core';
import { NinjaServices } from '../../services/ninja-services';
import { INinja } from '../../interfaces/ininja';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Card } from '../../components/card/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule, Card],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {

  ninjaService = inject(NinjaServices);
  ninjas: INinja[] = [];
  ninjasFiltered: INinja[] = [];

    // Información de paginación
  currentPage: number = 0; // Spring Boot empieza en 0
  totalPages: number = 0;
  totalElements: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  searchName: string = '';
  selectedGender: string = '';
  minNinjutsu: number = 1;
  aplicarFiltro: boolean = false;

   ngOnInit(): void {
    this.loadNinjas(this.currentPage);
  }

  async loadNinjas(page: number ) {
    try {
      const response = await this.ninjaService.getAllNinjas(page);
      this.ninjas = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.isFirst = response.first;
      this.isLast = response.last;
      this.currentPage = page;
      this.applyFilters();
    } catch (error) {
      console.error('Error cargando héroes:', error);
    }
  }

    // Ir a página específica
  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadNinjas(page);
    }
  }

    // Página anterior
  previousPage() {
    if (!this.isFirst) {
      this.loadNinjas(this.currentPage - 1);
    }
  }

    // Página siguiente
  nextPage() {
    if (!this.isLast) {
      this.loadNinjas(this.currentPage + 1);
    }
  }

    // Generar array de páginas para el paginador
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  applyFilters() {

this.ninjasFiltered = this.ninjas.filter(ninja => {
      // Filtro por nombre
      const nameMatch = this.searchName.toLowerCase();
      const matchesName = (ninja.ninjaName && ninja.ninjaName.toLowerCase().includes(nameMatch)) ||
                          (ninja.fullname && ninja.fullname.toLowerCase().includes(nameMatch)) ||
                          nameMatch === '';
      

      
      // Filtro por género
      const matchesGender = this.selectedGender === '' || ninja.gender === this.selectedGender;
      
      // Filtro por poder mínimo
      const matchesPower = ninja.stats && ninja.stats.strength >= this.minNinjutsu;
      
      return matchesName  && matchesGender && matchesPower;
    });
    }
    
      
  

  resetFilters() {
    this.searchName = '';
    this.selectedGender = '';
    this.minNinjutsu = 1;
    this.applyFilters();
  }

  buscar() {
    this.aplicarFiltro = true;
  }
}