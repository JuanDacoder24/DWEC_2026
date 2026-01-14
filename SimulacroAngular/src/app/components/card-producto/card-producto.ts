import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductServices } from '../../services/product-services';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.html',
  styleUrl: './card-producto.css',
})
export class CardProducto {

  @Input() producto!: IProduct

  ProductService = inject(ProductServices)
  router = inject(Router)


  @Input() product!: IProduct
  
  @Output() usuario = new EventEmitter<string>()


  deleteProduct(product: IProduct){
    
  }
  
}
