import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INinja } from '../interfaces/ininja';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NinjaServices {

  private baseUrl: string = 'http://localhost:8080/api'
  private httpClient = inject(HttpClient)

  constructor(){}

  getAllNinjas(): Promise<INinja>{
    return lastValueFrom(this.httpClient.get<INinja>(this.baseUrl))
  }

  getNinjaById(id: string): Promise<INinja>{
    return lastValueFrom(this.httpClient.get<INinja>(this.baseUrl + '/' + id))
  }

  addNinja(ninja: INinja): Promise<INinja>{
    return lastValueFrom(this.httpClient.post<INinja>(this.baseUrl, ninja))
  }

  updateNinja(ninja: INinja): Promise<INinja>{
    return lastValueFrom(this.httpClient.put<INinja>(`${this.baseUrl}/${ninja.id}`, ninja))
  }
  
}
