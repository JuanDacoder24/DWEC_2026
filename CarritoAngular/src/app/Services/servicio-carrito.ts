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
      data.products.forEach((producto: IProducto) => {
        this.arrayProductos.push(producto);
      });
    });
  }

  getAll(): IProducto[]{
    return this.arrayProductos;
  }
  
  getCurrency(): string{
    return this.currency;
  }

  

  //probar
  deleteBySku(sku :string): void{
    let i = this.arrayProductos.findIndex(producto => producto.sku == sku);
    if (i != -1 && i >= 0 && i < this.arrayProductos.length){
      this.arrayProductos.splice(i,1)
    }
  }

}
