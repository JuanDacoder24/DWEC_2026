import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';
import Swal from 'sweetalert2';
import { CardProducto } from "../../components/card-producto/card-producto";


@Component({
  selector: 'app-product-list',
  imports: [CardProducto],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  productService = inject(ProductServices)
  router = inject(Router)
  arrayProductos : IProduct[]
  pageActual: number = 1;

  @Input() product!: IProduct
  
  @Output() productoEliminado = new EventEmitter<string>()

  constructor(){
    this.arrayProductos = []
  }

  async ngOnInit(): Promise<void>{
    await this.cargarProductos(this.pageActual)
  }

  async cargarProductos(page: number):  Promise<void>{
    console.info('Cargando productos desde la API')
    try{
      const res = await this.productService.getAllProducts()
      this.arrayProductos = res.results.map((u: IProduct) => ({...u}))
      console.info('Usuarios cargados: ', this.arrayProductos)
    }
    catch(err){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }
  }

  eliminarProducto (productId: string){
    this.arrayProductos = this.arrayProductos.filter(u => u._id ! == productId)
  }

  
}
