import { IProducto } from './../Interfaces/iproducto.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioCarrito {

  private arrayProductos: IProducto[];
  private currency: string;

  

  constructor(){
    this.arrayProductos = [
      {
        sku: "0K3QOSOV4V",
        title: "Iphone 13 Pro",
        price: 938.99,
        cantidad: 0,
        total: 0
      },

  ]
  this.currency = "€";
  }

  getAll(): IProducto[]{
    return this.arrayProductos;
  }
  
}
