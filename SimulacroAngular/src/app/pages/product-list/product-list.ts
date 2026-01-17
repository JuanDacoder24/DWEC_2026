import { Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';
import Swal from 'sweetalert2';
import { CardProducto } from "../../components/card-producto/card-producto";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CardProducto, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  productService = inject(ProductServices)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)  // ✅ AGREGA ESTO
  
  arrayProductos: IProduct[] = []
  pageActual: number = 1
  totalPages: number = 1
  total: number = 0
  perPage: number = 10
  Math = Math

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      await this.cargarProductos(this.pageActual);
    });
  }

  async cargarProductos(page: number): Promise<void> {
    console.log(`Cargando productos - Página ${page}...`)
    try {
      const res = await this.productService.getAllProducts(page)
      console.log('Respuesta de la API:', res)
      
      if (res.results && Array.isArray(res.results)) {
        this.arrayProductos = res.results.map((u: IProduct) => ({ ...u }))
        this.pageActual = res.page || page
        this.totalPages = res.total_pages || 1
        this.total = res.total || 0
        this.perPage = res.per_page || 10
      } else if (Array.isArray(res)) {
        this.arrayProductos = res.map((u: IProduct) => ({ ...u }))
      } else {
        this.arrayProductos = []
      }
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }
  }

  async irAPagina(page: number): Promise<void> {
    if (page >= 1 && page <= this.totalPages && page !== this.pageActual) {
      await this.cargarProductos(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async paginaSiguiente(): Promise<void> {
    if (this.pageActual < this.totalPages) {
      await this.irAPagina(this.pageActual + 1)
    }
  }

  async paginaAnterior(): Promise<void> {
    if (this.pageActual > 1) {
      await this.irAPagina(this.pageActual - 1)
    }
  }

  async primeraPagina(): Promise<void> {
    await this.irAPagina(1)
  }

  async ultimaPagina(): Promise<void> {
    await this.irAPagina(this.totalPages)
  }

  get numeroPaginas(): number[] {
    const paginas: number[] = []
    const maxPaginasVisible = 5
    let inicio = Math.max(1, this.pageActual - Math.floor(maxPaginasVisible / 2))
    let fin = Math.min(this.totalPages, inicio + maxPaginasVisible - 1)
    if (fin - inicio < maxPaginasVisible - 1) {
      inicio = Math.max(1, fin - maxPaginasVisible + 1)
    }
    
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i)
    }
    
    return paginas
  }

  eliminarProducto(productId: string) {
    this.arrayProductos = this.arrayProductos.filter(u => u._id !== productId)
    this.total--  
  }
}