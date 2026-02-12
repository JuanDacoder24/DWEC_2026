import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private httpClient = inject(HttpClient)
  private baseUrl: string = 'http://localhost:8080/api/'

  login(user: IUser): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'login', user))
  }
}