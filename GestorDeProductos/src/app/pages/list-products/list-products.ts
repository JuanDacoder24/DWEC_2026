import { Component, inject, Input } from '@angular/core';
import { ServiceProducts } from '../../service/service-products';
import { IProductos } from '../../interfaces/iproductos';

@Component({
  selector: 'app-list-products',
  imports: [],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  @Input() producto!: IProductos

  ServiceProducts = inject(ServiceProducts)
  arrayProductos : IProductos []

  constructor(){
    this.arrayProductos = []
  }

  ngOnInit(): void{
    this.arrayProductos = this.ServiceProducts.getAll()
  }

}
