import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserServices } from '../../services/user-services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
private userServices = inject(UserServices);
  private router = inject(Router);

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  async getUser(loginForm: NgForm) {
    const loginUser: User = loginForm.value as User;

    //Hay que hacer la petición de login
    try {
      let response = await this.userServices.login(loginUser);
      console.log(response); 
      if (response.token) {
        localStorage.setItem("token", response.token);

        this.router.navigate(['/heroes']);
        loginForm.reset();
      }

    } catch (error) {
      alert("Credenciales incorrectos");
      loginForm.reset();
    }

  }

}