import { IProducto } from './../../Interfaces/iproducto.interface';
import { ServicioCarrito } from './../../Services/servicio-carrito';
import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla {

  @Input() producto!: IProducto
  ServicioCarrito = inject(ServicioCarrito);
  arrayProductos: IProducto[];
  currency: string;
  cantidad : number;
  

  constructor() {
    this.arrayProductos = [];
    this.currency = '';
    this.cantidad = 0;
  }

  ngOnInit(): void {
    this.arrayProductos = this.ServicioCarrito.getAll();
    this.currency = this.ServicioCarrito.getCurrency();
    
  }

  btnSumar():void { 
    this.cantidad++;
    let productoAñadido ={
      sku: this.producto.sku,
      title: this.producto.title,
      price: Number(this.producto.price),
      cantidad: this.cantidad
    };
    this.ServicioCarrito.addProduct(productoAñadido);
  }

  btnRestar():void { 
    if(this.cantidad > 0){
      this.cantidad--;
    }
    let productoComprado ={
      sku: this.producto.sku,
      title: this.producto.title,
      price: Number(this.producto.price),
      cantidad: this.cantidad
    };
    this.ServicioCarrito.eliminarProducto(productoComprado);  
  }

  



}
