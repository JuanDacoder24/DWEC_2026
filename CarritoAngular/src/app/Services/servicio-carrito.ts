import { IProducto } from './../Interfaces/iproducto.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioCarrito {

  private arrayProductos: IProducto[];
  private currency: string;
  private cantidad: number;
  private precioTotal: number;
  private productosAñadidos: any[];

  constructor(){
    this.arrayProductos = []
    this.cantidad = 0;
    this.precioTotal = 0;
    this.currency = "€";
    this.productosAñadidos = [];

    fetch('http://localhost:8080/api/carrito')
    .then(response => response.json())
    .then(data => {
      this.currency = data.currency;
      data.products.forEach((producto: IProducto) => {
        // No modificamos la interfaz; el componente mantiene cantidades por sku.
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

  getPrecioTotal(){
    return this.precioTotal;
  }

  getCarrito(){
    return this.productosAñadidos;
  }

  getCantidad(){
    return this.cantidad;
  }

  addProduct(producto: any){
    const i = this.productosAñadidos.findIndex(p => p.sku === producto.sku);
    if (i !== -1) {
      this.productosAñadidos[i].cantidad = producto.cantidad;
    } else {
      this.productosAñadidos.push({ ...producto });
    }
    this.precioTotal = this.productosAñadidos.reduce((acc, p) => acc + (p.price * (p.cantidad ?? 0)), 0);
  }  

  eliminarProducto(producto: any) {
    const i = this.productosAñadidos.findIndex(p => p.sku === producto.sku);
    if (i !== -1) {
      if (producto.cantidad === 0) {
        this.productosAñadidos.splice(i, 1);
      } else {
        this.productosAñadidos[i].cantidad = producto.cantidad;
      }
    }
    this.precioTotal = this.productosAñadidos.reduce((acc, p) => acc + (p.price * (p.cantidad ?? 0)), 0);
  }
  
  
  deleteBySku(sku :string): void{
    let i = this.arrayProductos.findIndex(producto => producto.sku == sku);
    if (i != -1 && i >= 0 && i < this.arrayProductos.length){
      this.arrayProductos.splice(i,1)
    }
  }

}
