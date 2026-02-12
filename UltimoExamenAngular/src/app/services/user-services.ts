
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  
  private httpClient = inject(HttpClient)
  private baseUrl: string = 'http://localhost:8080/api/login'

  login(user: User): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'login', user))
  }

  
}
