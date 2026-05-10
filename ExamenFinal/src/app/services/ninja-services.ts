import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INinja } from '../interfaces/ininja';
import { lastValueFrom } from 'rxjs';
import { INinjaResponse } from '../interfaces/ininja-response';

@Injectable({
  providedIn: 'root',
})
export class NinjaServices {

  private baseURL: string = 'http://localhost:8080/api/ninjas';
  http = inject(HttpClient);

  constructor() { }

  async getAllNinjas(page: number = 0): Promise<INinjaResponse> {
    const resp = await lastValueFrom(
      this.http.get<INinjaResponse>(this.baseURL + '?page=' + page)
    );
    return resp;
  }


  getById(id: number): Promise<INinja> {
    return lastValueFrom(this.http.get<INinja>(`${this.baseURL}/${id}`));
  }


  create(ninja: INinja): Promise<INinja> {
    return lastValueFrom(this.http.post<INinja>(this.baseURL, ninja));
  }


  update(ninja: INinja): Promise<INinja> {
    return lastValueFrom(this.http.put<INinja>(this.baseURL, ninja));
  }


  delete(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.baseURL}/${id}`));
  }
}