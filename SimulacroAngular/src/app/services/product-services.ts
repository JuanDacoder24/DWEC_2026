import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { Main } from '../interfaces/main';
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
    const res = await fetch(`${this.baseUrl}?page=${page}`)
    return await res.json()
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
  deleteByid(_id: string): Promise<IProduct> {
    return lastValueFrom(this.httpClient.delete<IProduct>(`${this.baseUrl}/${_id}`))
  }

  //insertar serie 
  insertProduct(product: IProduct): Promise<IProduct> {
    return lastValueFrom(this.httpClient.post<IProduct>(this.baseUrl, product))
  }


}
