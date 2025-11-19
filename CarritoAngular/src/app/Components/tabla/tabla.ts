import { ServicioCarrito } from './../../Services/servicio-carrito';
import { Component, inject } from '@angular/core';
import { IProducto } from '../../Interfaces/iproducto.interface';

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla {

  ServicioCarrito = inject(ServicioCarrito);

  arrayProductos: IProducto [];
  
  constructor(){
    this.arrayProductos = [];
  }

  ngOnInit(): void{
    this.arrayProductos = this.ServicioCarrito.getAll()
  }

  sumar(producto: IProducto) {
    if (!producto.cantidad) producto.cantidad = 0;
    producto.cantidad++;
    this.actualizarTotal(producto);
  }

  restar(producto: IProducto) {
    if (!producto.cantidad) producto.cantidad = 0;
    if (producto.cantidad > 0) producto.cantidad--;

    this.actualizarTotal(producto);
  }

  actualizarTotal(producto: IProducto) {
    if (!producto.price) return;
    producto.total = producto.cantidad * producto.price;
  }

  

}
