import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  private httpClient = inject(HttpClient)
  private baseUrl: string = 'https://peticiones.online/api/products'

  constructor() { }

  //Traer todos los productos 
  async getAllProducts(page: number = 1): Promise<any> {
    console.log(`Obteniendo productos - Página ${page}`);
    const res = await lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}?page=${page}`)
    );

    console.log('Respuesta:', res);
    return res;
  }

  //Traer productos por id
  getProductById(_id: string): Promise<IProduct> {
    return lastValueFrom(this.httpClient.get<IProduct>(this.baseUrl + '/' + _id))
  }

  //Añadir producto
  addProduct(product: IProduct): Promise<IProduct> {
    return lastValueFrom(this.httpClient.post<IProduct>(this.baseUrl, product))
  }

  //Editar producto
  updateProduct(product: IProduct): Promise<IProduct> {
    return lastValueFrom(this.httpClient.put<IProduct>(`${this.baseUrl}/${product._id}`, product))
  }

  //Eliminar producto
  async deleteByid(_id: string): Promise<IProduct> {
    console.log('Eliminando producto con ID:', _id);
    return lastValueFrom(
      this.httpClient.delete<IProduct>(`${this.baseUrl}/${_id}`)
    );
  }

  //insertar serie 
  async insertProduct(product: IProduct): Promise<IProduct> {
    console.log('Enviando a:', this.baseUrl);
    console.log('Producto a insertar:', product);

    const result = await lastValueFrom(
      this.httpClient.post<IProduct>(this.baseUrl, product)
    );

    console.log('Respuesta del servidor:', result);

    // Verifica que se insertó
    const todosLosProductos = await this.getAllProducts(1);
    console.log('Total de productos después de insertar:', todosLosProductos.total);

    return result;
  }


}
