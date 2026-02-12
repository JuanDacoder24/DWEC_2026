import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private router = inject(Router);

  isToken: boolean;

  constructor(){
    this.isToken = false;
  }

  ngOnInit(): void{
    if(localStorage.getItem('token')){
      this.isToken = true;
    }
  }

  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/landingpage'])
  }

}
