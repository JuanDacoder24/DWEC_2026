import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse, User } from '../interfaces/user';
import { lastValueFrom, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private httpClient = inject(HttpClient)
  // Debería tener esta URL:
private apiUrl = 'http://localhost:3000/api/auth';

// Y el método login así:
async login(email: string, password: string): Promise<LoginResponse> {
  return firstValueFrom(
    this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { 
      email, 
      password 
    })
  );
}
}