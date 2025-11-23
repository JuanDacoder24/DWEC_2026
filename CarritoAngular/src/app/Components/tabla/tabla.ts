import { IProducto } from './../../Interfaces/iproducto.interface';
import { ServicioCarrito } from './../../Services/servicio-carrito';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-tabla',
  imports: [],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla {

  ServicioCarrito = inject(ServicioCarrito);

  arrayProductos: IProducto[];
  currency: string;
  //ya que no puedo agregar nada a la interfaz, creo un array cantidad
  //para almacenar la cantidad de los productos
  cantidad: number[];

  constructor() {
    this.arrayProductos = [];
    this.currency = '';
    this.cantidad = [];
  }

  ngOnInit(): void {
    this.arrayProductos = this.ServicioCarrito.getAll();
    this.currency = this.ServicioCarrito.getCurrency();
    //aca lo que hago es un mapeo relacionando con el array de productos
    this.cantidad = this.arrayProductos.map(() => 0);
  }

  btnSumar(i: number) {
    this.cantidad[i]++;
  }

  btnRestar(i: number) {
    if (this.cantidad[i] > 0) {
      this.cantidad[i]--;
    }
  }

  getSubtotal(i: number): number {
    return this.arrayProductos[i].price * this.cantidad[i];
  }



}
