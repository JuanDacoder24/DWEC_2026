import { Injectable } from '@angular/core';
import { IProductos } from '../interfaces/iproductos';

@Injectable({
  providedIn: 'root',
})
export class ServiceProducts {

  private arrayProductos : IProductos []
  private currency : string

  constructor(){
    this.arrayProductos = []
    this.currency = ''

    fetch('http://localhost:8080/api/carrito')
    .then(response => response.json())
    .then(data => {
      this.currency = data.currency;
      data.products.forEach((producto: IProductos) => {
        this.arrayProductos.push(producto);
      });
    });

  }

  getAll(): IProductos[]{
    return this.arrayProductos
  }

  
}
