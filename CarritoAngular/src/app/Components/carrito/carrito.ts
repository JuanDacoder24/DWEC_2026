import { ServicioCarrito } from './../../Services/servicio-carrito';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {

  ServicioCarrito = inject(ServicioCarrito)
  productosAñadidos : any[]
  producto : any
  currency: string
  precioTotal: number

  constructor(){
    this.productosAñadidos = []
    this.currency = ''
    this.producto = {
      sku: '',
      title: '',
      price: '',
      cantidad: 0
    }

    this.precioTotal = 0
  }

  ngOnInit(){
    this.currency = this.ServicioCarrito.getCurrency()
    this.precioTotal = this.ServicioCarrito.getPrecioTotal()
    this.productosAñadidos = this.ServicioCarrito.getCarrito()
  }

}
