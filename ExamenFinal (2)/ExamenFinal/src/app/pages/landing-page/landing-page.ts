import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  
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
  this.router.navigate(['/landingPage'])
  }

}
