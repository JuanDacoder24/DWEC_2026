import { Component, inject, Input } from '@angular/core';
import { ServiceProducts } from '../../service/service-products';
import { IProductos } from '../../interfaces/iproductos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  imports: [],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  @Input() producto!: IProductos

  ServiceProducts = inject(ServiceProducts)
  router = inject(Router)
  arrayProductos : IProductos []

  constructor(){
    this.arrayProductos = []
  }

  ngOnInit(): void{
    this.arrayProductos = this.ServiceProducts.getAll()
  }

  deleteProduct(producto: IProductos){
    this.ServiceProducts.deleteByTitle(producto.title)
  }

  seeDetails(product: IProductos){
    this.router.navigate(['/listProducts', product.sku])
  }

}
