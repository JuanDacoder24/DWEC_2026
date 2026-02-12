import { Component, inject } from '@angular/core';
import { UserServices } from '../../services/user-services';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private userServices = inject(UserServices)
  private router = inject(Router)

  constructor(){}

  ngOnInit(): void{  // ← Corrección: era "ngOninit" (estaba mal escrito)
    if(localStorage.getItem('token')){
      this.router.navigate(['/dashboard'])
    }
  }

  async getUser(login: NgForm) {
    const loginUser: User = login.value as User
    
    try {
      // ← AQUÍ FALTABA LA LLAMADA AL SERVICIO
      const response = await this.userServices.login(loginUser.email, loginUser.password);
      
      // Guardar el token en localStorage
      localStorage.setItem('token', response.token);
      
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Login exitoso",
        timer: 1500,
        showConfirmButton: false
      });
      
      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);
      
    } catch(error: any) {
      console.error('Error en login:', error);
      
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.error?.message || "Error de credenciales",
      });
      
      login.reset();
    }
  }
}