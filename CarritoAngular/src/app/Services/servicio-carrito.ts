import { IProducto } from './../Interfaces/iproducto.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioCarrito {

  private arrayProductos: IProducto[];
  private currency: string;

  

  constructor(){
    this.arrayProductos = []

    this.currency = "€";

    fetch('http://localhost:8080/api/carrito')
    .then(response => response.json())
    .then(data => {
      this.currency = data.currency;
      data.forEach((item: any) => {
        let producto: IProducto = {
          sku: item.sku,
          title: item.title,
          price: item.price,
        };
        this.arrayProductos.push(producto);
      });
    });
  }

  getAll(): IProducto[]{
    return this.arrayProductos;
  }
  
}
