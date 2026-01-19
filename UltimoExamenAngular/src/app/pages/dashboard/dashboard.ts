import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../components/footer/footer";
import { NavBar } from "../../components/nav-bar/nav-bar";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Footer, NavBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
