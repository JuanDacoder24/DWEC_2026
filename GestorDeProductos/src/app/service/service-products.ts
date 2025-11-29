import { Injectable } from '@angular/core';
import { IProductos } from '../interfaces/iproductos';

@Injectable({
  providedIn: 'root',
})
export class ServiceProducts {

  private arrayProductos : IProductos []
  private currency : string
  private id : number

  constructor(){
    this.arrayProductos = []
    this.currency = ''
    this.id = 11

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

  getProductBySku(sku: string): IProductos | undefined{
    return this.arrayProductos.find(p => p.sku == sku)
  }

  //Borrar producto por titulo
  deleteByTitle(title: string): void{
    let i = this.arrayProductos.findIndex(product => product.title == title)
    if(i != -1 && i >+0 && i < this.arrayProductos.length){
      this.arrayProductos.slice(i,1)
    }
  }

  //agregar producto
  addProduct(product: IProductos): void{
    if(!this.arrayProductos.includes(product) && product != null){
      product.id = this.id
      product.sku = crypto.randomUUID()
      this.arrayProductos.push(product)
      this.id ++
    }
  }
  
}
