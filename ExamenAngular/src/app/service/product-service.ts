import { IProducts } from './../interface/iproducts';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private arrayProductos: IProducts[]
  private currency: string
  private id: number

  constructor() {
    this.arrayProductos = []
    this.currency = ''
    this.id = 0

    fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => {
      this.currency = data.currency;
      data.forEach((producto: IProducts) => {
        this.arrayProductos.push(producto);
      });
    });

  }

  getAll(): IProducts[]{
    return this.arrayProductos
  }

  insertProduct(product: IProducts){
    return this.arrayProductos.push(product);
  }

  getProductById(id:string): IProducts | undefined{
    return this.arrayProductos.find(s => s.id === Number(id));
  }

  deleteByTitle(name: string): void{
    let i = this.arrayProductos.findIndex(product => product.name == name)
    if(i != -1 && i >+0 && i < this.arrayProductos.length){
      this.arrayProductos.slice(i,1)
    }
  }

  getLenght():number{
    return this.arrayProductos.length;
  }

  
}
