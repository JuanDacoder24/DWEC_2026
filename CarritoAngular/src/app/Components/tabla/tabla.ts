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

  arrayProductos: IProducto [];
  currency: string;
  
  constructor(){
    this.arrayProductos = [];
    this.currency = '';
  }

  ngOnInit(): void{
    this.arrayProductos = this.ServicioCarrito.getAll();
    this.currency = this.ServicioCarrito.getCurrency();
  }

  btnSumar(): void {
    
  }

  btnRestar(): void {

  }  

}
