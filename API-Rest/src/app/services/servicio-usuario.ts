import { IUsuario } from './../interfaces/iusuario';
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuario {

  private baseUrl: string = 'https://peticiones.online/api/users'
  httpClient = inject(HttpClient)

  constructor(){}

  //Traer todos los usuarios
  getAllUsers(): Promise<IUsuario[]>{
    return lastValueFrom (this.httpClient.get<IUsuario[]>(this.baseUrl))
  }

  //Traer usuarios por _id
  getUserById(_id: string): Promise<IUsuario>{
    return lastValueFrom (this.httpClient.get<IUsuario>(this.baseUrl + '/' + _id))
  }

  //Agregar usuario
  addUser(user: IUsuario): Promise<IUsuario>{
    return lastValueFrom (this.httpClient.post<IUsuario>(this.baseUrl, user))
  }

  //Editar usuario
  updateUser(user: IUsuario): Promise<IUsuario>{
    return lastValueFrom (this.httpClient.put<IUsuario>(`${this.baseUrl}/${user._id}`, user))
  }
  
}
