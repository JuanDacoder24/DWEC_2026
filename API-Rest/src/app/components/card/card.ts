import { IUsuario } from './../../interfaces/iusuario';
import { Component, inject, Input } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  serviceUsuario = inject(ServicioUsuario)
  router = inject(Router)

  @Input() miUsuario!: IUsuario

  deleteUser() {

  }

  seeDetails() {

  }

  updateUser() {

  }

}
