import { Component, inject, Input } from '@angular/core';
import { IProducts } from '../../interface/iproducts';
import { ProductService } from '../../service/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {


  @Input() producto!: IProducts

  ProductService = inject(ProductService)
  router = inject(Router)
  arrayProductos : IProducts[]

  constructor(){
    this.arrayProductos = []
  }

  ngOnInit(): void{
    this.arrayProductos = this.ProductService.getAll()
  }

  deleteProduct(producto: IProducts){
    this.ProductService.deleteByTitle(producto.name)
  }

  seeDetails(product: IProducts){
    this.router.navigate(['/product-list', product.id])
  }

}
