import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private httpClient = inject(HttpClient)
  private baseUrl: string = 'https://dummyjson.com/auth/'  

  constructor() {}

  login(user: Users): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'login', user))
  }
}
