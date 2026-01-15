import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserServices } from '../../services/user-services';
import { Users } from '../../interfaces/users';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private userServices = inject(UserServices)
  private router = inject(Router)

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/dashboard'])
    }
  }
  async getUser(loginForm: NgForm) {
    const loginUser: Users = loginForm.value as Users;
    //tiempo de expiracion del token
    loginUser.expiresInMins = 30;

    //petición de login
    try {
      let response = await this.userServices.login(loginUser);
      console.log(response);
      if (response.accessToken && response.refreshToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);

        this.router.navigate(['/dashboard']);
        loginForm.reset();
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error de credenciales",
      });
      loginForm.reset();
    }
  }
}
