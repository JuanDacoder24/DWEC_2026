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
    // Inicializar cantidades para cada producto (0 por defecto)
    this.arrayProductos.forEach(p => {
      this.cuantity[p.sku] = this.cuantity[p.sku] ?? 0;
    });
  }

  btnSumar(sku: string): void {
    this.cuantity[sku] = (this.cuantity[sku] ?? 0) + 1;
    const producto = this.arrayProductos.find(p => p.sku === sku);
    if (!producto) return;
    const productoComprado = {
      sku: producto.sku,
      title: producto.title,
      price: Number(producto.price),
      cantidad: this.cuantity[sku]
    };
    this.ServicioCarrito.addProduct(productoComprado);
  }

  btnRestar(sku: string): void { 
    this.cuantity[sku] = Math.max((this.cuantity[sku] ?? 0) - 1, 0);
    const producto = this.arrayProductos.find(p => p.sku === sku);
    if (!producto) return;
    const productoComprado = {
      sku: producto.sku,
      title: producto.title,
      price: Number(producto.price),
      cantidad: this.cuantity[sku]
    };
    this.ServicioCarrito.eliminarProducto(productoComprado);
  }

}
