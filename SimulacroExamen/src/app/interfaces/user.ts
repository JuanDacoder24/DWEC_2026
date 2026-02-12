// src/app/interfaces/user.ts (o crea auth-response.ts)
export interface User {
  email: string;
  password: string;
  username?: string;
  id?: number;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;  // ← IMPORTANTE: esta es la propiedad que necesitas
}