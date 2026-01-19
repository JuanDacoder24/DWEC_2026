import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ICharacter } from '../interfaces/icharacter';

@Injectable({
  providedIn: 'root',
})
export class HeroServices {

  private httpClient = inject(HttpClient)
  private baseUrl: string = 'http://localhost:8080/characters'

  constructor(){}

  //Traer todos los heroes
  async getAllHeros(page: number = 1): Promise<any>{
    console.log(`Obteniendo heroes - Página ${page}`)
    const res = await lastValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}?page=${page}`)
    )

    console.log('Respuesta:', res);
    return res;
  }

  //Traer heroe por id
  getHeroById(id: string): Promise<ICharacter>{
    return lastValueFrom(this.httpClient.get<ICharacter>(this.baseUrl + '/' + id))
  }

  //Añadir heroe
  addHero(hero: ICharacter): Promise<ICharacter> {
    return lastValueFrom(this.httpClient.post<ICharacter>(this.baseUrl, hero))
  }

  //Editar heroe
  updateHero(hero: ICharacter): Promise<ICharacter> {
    return lastValueFrom(this.httpClient.put<ICharacter>(`${this.baseUrl}/${hero.id}`, hero))
  }

  //Eliminar heroe
  async deleteByid(id: string): Promise<ICharacter> {
    console.log('Eliminando producto con ID:', id);
    return lastValueFrom(
      this.httpClient.delete<ICharacter>(`${this.baseUrl}/${id}`)
    );
  }

  //insertar serie 
  async insertHero(hero: ICharacter): Promise<ICharacter> {
    console.log('Enviando a:', this.baseUrl);
    console.log('Producto a insertar:', hero);

    const result = await lastValueFrom(
      this.httpClient.post<ICharacter>(this.baseUrl, hero)
    );

    console.log('Respuesta del servidor:', result);

    // Verifica que se insertó
    const todosLosProductos = await this.getAllHeros(1);
    console.log('Total de productos después de insertar:', todosLosProductos.total);

    return result;
  }

  

}
