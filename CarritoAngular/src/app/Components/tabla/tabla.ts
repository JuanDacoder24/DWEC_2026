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

  @Input() producto!: IProducto;

  ServicioCarrito = inject(ServicioCarrito);

  arrayProductos: IProducto[] = [];
  currency: string = '';
  // Mcreo un mapa de cantidad por sku para no tocar la interfaz
  cuantity: { [sku: string]: number } = {};

  constructor() {}

  ngOnInit(): void {
    this.arrayProductos = this.ServicioCarrito.getAll();
    this.currency = this.ServicioCarrito.getCurrency();
    this.arrayProductos.forEach(p => {
      this.cuantity[p.sku] = this.cuantity[p.sku] ?? 0;
    });
  }

  btnSumar(producto: IProducto): void {
    const sku = producto.sku;
    this.cuantity[sku] = (this.cuantity[sku] ?? 0) + 1;
    this.ServicioCarrito.addProduct({ ...producto, cantidad: this.cuantity[sku] });
  }

  btnRestar(producto: IProducto): void {
    const sku = producto.sku;
    this.cuantity[sku] = Math.max((this.cuantity[sku] ?? 0) - 1, 0);
    this.ServicioCarrito.eliminarProducto({ ...producto, cantidad: this.cuantity[sku] });
  }

}
