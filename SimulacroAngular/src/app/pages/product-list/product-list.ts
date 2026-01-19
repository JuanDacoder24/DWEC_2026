import { Component, inject, OnInit } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';
import Swal from 'sweetalert2';
import { CardProducto } from "../../components/card-producto/card-producto";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-product-list',
  imports: [CardProducto, CommonModule, FormsModule], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  productService = inject(ProductServices)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  
  arrayProductos: IProduct[] = []    
  productosFiltrados: IProduct[] = []       
  
  pageActual: number = 1
  totalPages: number = 1
  total: number = 0
  perPage: number = 10
  Math = Math
  
  filtros = {
    textoBusqueda: '',
    categoria: '',
    precioMin: 0,
    precioMax: 1000
  }
  
  // Lista de categorías únicas
  categorias: string[] = []

  ordenSeleccionado: string = 'reciente';
  

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      console.log('Query params cambiaron, recargando productos...');
      await this.cargarProductos(this.pageActual);
    });
  }

  async cargarProductos(page: number): Promise<void> {
    console.log(`🔄 Cargando productos - Página ${page}...`)
    try {
      const res = await this.productService.getAllProducts(page)
      console.log('📦 Respuesta de la API:', res)
      
      if (res.results && Array.isArray(res.results)) {
        // Ordena por _id descendente (más nuevos primero)
        this.arrayProductos = res.results
        //mapeo
          .map((u: IProduct) => ({ ...u }))
          //ordenar
          .sort((a: IProduct, b: IProduct) => b._id.localeCompare(a._id));
        
        this.pageActual = res.page || page
        this.totalPages = res.total_pages || 1
        this.total = res.total || 0
        this.perPage = res.per_page || 10
        this.extraerCategorias();
        this.aplicarFiltros();
        
        console.log(`Productos cargados: ${this.arrayProductos.length} de ${this.total} total`)
      }
    }
    catch (err) {
      console.error('Error al cargar productos:', err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }
  }
  extraerCategorias(): void {
    const categoriasSet = new Set<string>();
    this.arrayProductos.forEach(producto => {
      if (producto.category) {
        categoriasSet.add(producto.category);
      }
    });
    this.categorias = Array.from(categoriasSet).sort();
    console.log('Categorías disponibles:', this.categorias);
  }

  aplicarFiltros(): void {
    console.log('Aplicando filtros:', this.filtros);
    
    // Primero filtrar
    this.productosFiltrados = this.arrayProductos.filter(producto => {
      const cumpleTexto = !this.filtros.textoBusqueda || 
        producto.name.toLowerCase().includes(this.filtros.textoBusqueda.toLowerCase()) ||
        producto.description.toLowerCase().includes(this.filtros.textoBusqueda.toLowerCase());
      
      const cumpleCategoria = !this.filtros.categoria || 
        producto.category.toLowerCase() === this.filtros.categoria.toLowerCase();
      
      const cumplePrecio = producto.price >= this.filtros.precioMin && 
        producto.price <= this.filtros.precioMax;
      
      return cumpleTexto && cumpleCategoria && cumplePrecio;
    });
    
    this.ordenarProductos();
    
    console.log(`Productos filtrados: ${this.productosFiltrados.length} de ${this.arrayProductos.length}`);
  }

  ordenarProductos(): void {
    switch(this.ordenSeleccionado) {
      case 'reciente':
        this.productosFiltrados.sort((a, b) => b._id.localeCompare(a._id));
        break;
      
      case 'precio-asc':
        this.productosFiltrados.sort((a, b) => a.price - b.price);
        break;
      
      case 'precio-desc':
        this.productosFiltrados.sort((a, b) => b.price - a.price);
        break;
      
      case 'nombre':
        this.productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
        break;
      
      default:
        this.productosFiltrados.sort((a, b) => b._id.localeCompare(a._id));
    }
    
    console.log(`Productos ordenados por: ${this.ordenSeleccionado}`);
  }

  onOrdenChange(): void {
    this.ordenarProductos();
  }


  limpiarFiltros(): void {
    this.filtros = {
      textoBusqueda: '',
      categoria: '',
      precioMin: 0,
      precioMax: 1000
    };
    this.aplicarFiltros();
    console.log('Filtros limpiados');
  }

  onFiltroChange(): void {
    this.aplicarFiltros();
  }

  async eliminarProducto(productId: string) {
    console.log('Producto eliminado desde el padre, ID:', productId);
    
    this.arrayProductos = this.arrayProductos.filter(p => p._id !== productId);
    this.total--;
    
    this.aplicarFiltros();
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
}