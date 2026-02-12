import { Router, RouterLink } from '@angular/router';
import { UserServices } from './../../services/user-services';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private userServices = inject(UserServices)
  private router = inject(Router)

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  async getUser(loginForm: NgForm) {
    const loginUser: IUser = loginForm.value as IUser

    try {
      let response = await this.userServices.login(loginUser)
      console.log(response); 
      if (response.token) {
        localStorage.setItem("token", response.token)

        this.router.navigate(['/dashboard'])
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