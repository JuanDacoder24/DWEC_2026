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


  private userServices = inject(UserServices)
  private router = inject(Router)

  constructor(){ }

  ngOnInit(): void {
    if(localStorage.getItem('accessToken')){
      this.router.navigate(['/dashboard'])
    }
  }

  async getUser(loginForm: NgForm) {
    const loginUser: User = loginForm.value as User
    loginUser.expiresInMins = 10
    try{
      let res = await this.userServices.login(loginUser)
      console.log(res)
      if(res.accessToken){
        localStorage.setItem("accessToken", res.accessToken)
        localStorage.setItem("refreshToken", res.refreshToken)
        this.router.navigate(['/dashboard'])
        loginForm.reset()
      }
    } 
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error de credenciales",
      });
      loginForm.reset();
    }
  }
}
