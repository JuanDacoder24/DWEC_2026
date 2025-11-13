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
        sku: "123",
        title: "iphone",
        price: "",
    }
  ]
  this.currency = "€";
  }


  getAll(): IProducto[]{
    return this.arrayProductos;
  }
  
}
